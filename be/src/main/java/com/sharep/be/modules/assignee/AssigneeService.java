package com.sharep.be.modules.assignee;

import com.sharep.be.modules.assignee.repository.AssigneeRepository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AssigneeService {

    private final AssigneeRepository assigneeRepository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    public Long update(Long accountId, Long projectId, Long issueId, State state) {

        Member member = memberRepository.findMemberIdByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(member.getId(), issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        assignee.updateState(state);

        return assignee.getId();
    }

    public Long create(Long projectId, Long issueId, Long accountId) {

        Member member = memberRepository.findMemberByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 이슈가 존재하지 않습니다."));

        if(assigneeRepository.existsByMemberIdAndIssueId(member.getId(), issue.getId())){
            throw new RuntimeException("이미 해당하는 이슈의 해당 구성원이 존재합니다.");
        }

        Assignee assignee = Assignee.builder()
                .member(member)
                .issue(issue)
                .state(State.YET)
                .build();

        assigneeRepository.save(assignee);

        return assignee.getId();
    }

    public Long delete(Long projectId, Long issueId, Long accountId) {

        Member member = memberRepository.findMemberIdByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(member.getId(), issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        assigneeRepository.delete(assignee);

        return assignee.getId();
    }

    public List<Issue> readProjectNowIssue(Long projectId) {

        return assigneeRepository.findAllProjectNowIssueByProjectId(projectId);

    }
}
