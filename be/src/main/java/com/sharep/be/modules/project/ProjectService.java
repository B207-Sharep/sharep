package com.sharep.be.modules.project;

import static com.sharep.be.modules.project.dto.ProjectDto.*;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.AccountRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.member.Role.RoleType;
import com.sharep.be.modules.member.RoleRepository;
import com.sharep.be.modules.project.dto.MemberDto.MemberRequestDto;
import com.sharep.be.modules.project.dto.ProjectDto.ProjectRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;


    public void saveProject(@Valid ProjectRequestDto projectRequestDto, Long accountId){
        Account account = accountRepository.findById(accountId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));

        projectRepository.save(convertSave(projectRequestDto, account));
    }

    public String createToken(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        return project.createToken();
    }

    public void ifLeader(Project project, Account account){
        // 접근자 프로젝트 리더인지 확인
        if(!project.ifLeader(account))throw new RuntimeException("권한이 없습니다."); // TODO exception
    }

    public void addMember(Long projectId, Long leaderId, MemberRequestDto memberRequestDto) {
        Project project = projectRepository.findWithLeaderById(projectId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        Account leader = accountRepository.findById(leaderId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));
        ifLeader(project, leader);
        // TODO 프로젝트 member에 account, role 중복 확인

        Account account = accountRepository.findById(memberRequestDto.getId()).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // member 생성
        Member member = createMember(project, account);
        // roles 추가
        createRoles(member, memberRequestDto.getRoles());

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

    public void checkLeader(Long projectId, Long accountId) {
        Project project = projectRepository.findWithLeaderById(projectId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        Account leader = accountRepository.findById(accountId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));
        ifLeader(project, leader);
    }
}
