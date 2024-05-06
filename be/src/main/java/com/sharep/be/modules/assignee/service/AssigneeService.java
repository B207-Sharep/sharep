package com.sharep.be.modules.assignee.service;

import static io.jsonwebtoken.lang.Assert.notNull;

import com.querydsl.core.Tuple;
import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;


import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.service.NotificationService;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AssigneeService {

    private final NotificationService notificationService;

    private final AssigneeRepository assigneeRepository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    public Long update(Long accountId, Long projectId, Long issueId, State state) {

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(member.getId(), issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        assignee.updateState(state);

        if(state == State.DONE){
            List<Tuple> assigneesByIssue = assigneeRepository.findAccountIdsByIssueId(issueId);

            for(Tuple assigneeByIssue : assigneesByIssue){
                Account anotherAccount = assigneeByIssue.get(0, Account.class);
                Member anotherMember = assigneeByIssue.get(1, Member.class);
                Assignee anotherAssignee = assigneeByIssue.get(2, Assignee.class);
                Issue anotherIssue = assigneeByIssue.get(3, Issue.class);

                notNull(anotherAccount);
                notNull(anotherMember);
                notNull(anotherAssignee);
                notNull(anotherIssue);

                if(Objects.equals(accountId, anotherAccount.getId())) continue;

                notificationService.notify(
                        anotherAccount.getId(),
                        NotificationMessage.from(anotherAccount, anotherMember, anotherAssignee, anotherIssue)
                );
            }
        }

        return assignee.getId();
    }

    public Long create(Long projectId, Long issueId, Long accountId) {

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
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

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(member.getId(), issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        assigneeRepository.delete(assignee);

        return assignee.getId();
    }

    public List<Tuple> readProjectNowIssue(Long projectId) {
        return assigneeRepository.findAllProjectNowIssueByProjectId(projectId);
    }

    public List<Tuple> readProjectNowOwnIssue(Long projectId, Long accountId) {
        return assigneeRepository.findAllProjectNowIssueByProjectIdAndAccountId(projectId, accountId);
    }
}
