package com.sharep.be.modules.project.service;

import static com.sharep.be.modules.project.dto.ProjectDto.ProjectResponseDto;
import static com.sharep.be.modules.project.dto.ProjectDto.convertSave;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.repository.AccountRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.member.Role.RoleType;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.member.repository.RoleRepository;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.dto.MemberDto;
import com.sharep.be.modules.project.dto.MemberDto.MemberResponse;
import com.sharep.be.modules.project.dto.ProjectDto;
import com.sharep.be.modules.project.dto.ProjectDto.ProjectCreate.MemberCreate;
import com.sharep.be.modules.project.repository.ProjectRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;


    public void saveProject(@Valid ProjectDto.ProjectCreate projectCreate, Long accountId){
        Account account = accountRepository.findById(accountId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Project project = projectRepository.save(convertSave(projectCreate, account));

        List<MemberCreate> members = projectCreate.members();
        createMembers(project, members);

//        Member member = createMember(project, account);
        // roles 추가
//        createRoles(member, projectCreate.roles());

    }

    private void createMembers(Project project, List<MemberCreate> members) {
        for(MemberCreate memberCreate : members){
            Account account = accountRepository.findById(memberCreate.id())
                    .orElseThrow(() -> new UsernameNotFoundException("no member"));

            Member member = createMember(project, account);

            createRoles(member, memberCreate.roles());

        }
    }

    public String createToken(Long projectId, Long accountId) {
        checkLeader(projectId, accountId);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        return project.createToken();
    }

    @Transactional(readOnly = true)
    public void isLeader(Project project, Account account){
        // 접근자 프로젝트 리더인지 확인
        if(!project.ifLeader(account))throw new RuntimeException("권한이 없습니다."); // TODO exception
    }

    public void addMembers(Long projectId, Long leaderId, List<MemberCreate> memberCreate) {
        Project project = projectRepository.findWithLeaderById(projectId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 프로젝트입니다."));


        Account leader = accountRepository.findById(leaderId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));
        isLeader(project, leader);
        // TODO 프로젝트 member에 account, role 중복 확인

        for(MemberCreate member : memberCreate){
            addMember(project, member);
        }

    }

    public void addMember(Project project, MemberCreate member) {
        Account joinAccount = accountRepository.findById(member.id()).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));

        List<Account> accounts = project.getMembers().stream().map(Member::getAccount).toList();
        for(Account findAccount : accounts){
            System.out.println(findAccount.getId() + " " + member.id());
            if(findAccount.equals(joinAccount))throw new RuntimeException("이미 멤버인 사용자입니다.");
        }

        // member 생성
        Member createMember = createMember(project, joinAccount);
        // roles 추가
        createRoles(createMember, member.roles());
    }

    private void createRoles(Member member, List<RoleType> roles) {
        for(RoleType roleType : roles){
            Role role = Role.builder()
                    .member(member)
                    .role(roleType)
                    .build();
            roleRepository.save(role);
        }
    }

    private Member createMember(Project project, Account account) {
        Member member = Member.builder()
                .project(project)
                .account(account)
                .build();
        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public void checkLeader(Long projectId, Long accountId) {
        Project project = projectRepository.findWithLeaderById(projectId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        Account leader = accountRepository.findById(accountId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));
        isLeader(project, leader);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponseDto> readProject(Long accountId){
        return projectRepository.findAllByAccountId(accountId)
                .stream().map(ProjectDto::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MemberResponse> readMember(Long projectId) {
        Project project = projectRepository.findWithLeaderById(projectId)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 프로젝트이니다."));

        Account leader = project.getLeader();
        List<MemberResponse> members = memberRepository.findAllByProjectId(projectId).stream()
                .map(MemberDto::toDto).collect(Collectors.toList());

        // 리더를 찾아 첫 번째 위치로 이동
        Optional<MemberResponse> leaderMember = members.stream()
                .filter(member -> member.account().id().equals(leader.getId()))
                .findFirst();

        // 리더가 리스트에 있다면, 해당 멤버를 제거하고 리스트 맨 앞에 추가
        leaderMember.ifPresent(member -> {
            members.remove(member);
            members.add(0, member);
        });

        return members;
    }
}
