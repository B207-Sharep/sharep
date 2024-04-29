package com.sharep.be.modules.assignee;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AssigneeService {

    private final AssigneeRepository assigneeRepository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    @Transactional
    public void update(Long accountId, Long projectId, Long issueId, State state) {

        Long memberId = memberRepository.findMemberIdByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(memberId, issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        assignee.updateState(state);
    }

    @Transactional
    public void create(Long accountId, Long projectId, Long issueId) {

        Member member = memberRepository.findMemberByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 이슈가 존재하지 않습니다."));

        Assignee assignee = Assignee.builder()
                .member(member)
                .issue(issue)
                .state(State.YET)
                .build();

        assigneeRepository.save(assignee);
    }

    @Transactional
    public void delete(Long accountId, Long projectId, Long issueId) {

        Long memberId = memberRepository.findMemberIdByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        if(!assigneeRepository.deleteByMemberIdAndIssueId(memberId, issueId)){
            throw new RuntimeException("해당하는 담당자가 존재하지 않습니다.");
        }
    }

}
