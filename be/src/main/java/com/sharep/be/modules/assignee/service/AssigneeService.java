package com.sharep.be.modules.assignee.service;

import static io.jsonwebtoken.lang.Assert.notNull;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.assignee.repository.projection.MemberAndIssueProjection;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;


import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.service.NotificationRepository;
import com.sharep.be.modules.notification.service.NotificationService;
import java.util.List;
import java.util.Set;
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
    private final NotificationRepository notificationRepository;

    public Long update(Long accountId, Long projectId, Long issueId, State state) {

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 구성원이 존재하지 않습니다."));

        Assignee assignee = assigneeRepository.findByMemberIdAndIssueId(member.getId(), issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 담당자가 존재하지 않습니다."));

        // 이미 진행 중인 이슈가 있는지 확인하는 로직
        if (state == State.NOW && assigneeRepository.existsByMemberIdAndState(member.getId(),
                State.NOW)) {
            throw new RuntimeException("이미 진행중인 이슈가 있습니다.");
        }

        assignee.updateState(state);

        // 작업 완료 시 다른 담당자들에게 알림 보내는 로직
        if (state == State.DONE) {
            List<Assignee> assigneesByIssue = assigneeRepository.findAccountIdsByIssueId(issueId);

            for (Assignee anotherAssignee : assigneesByIssue) {

                Member anotherMember = anotherAssignee.getMember();
                Account anotherAccount = anotherMember.getAccount();
                Issue anotherIssue = anotherAssignee.getIssue();

                if (accountId.equals(anotherAccount.getId())) {
                    continue;
                }

                notNull(anotherAccount);
                notNull(anotherMember);
                notNull(anotherAssignee);
                notNull(anotherIssue);

                Notification notification = Notification.builder()
                        .assignee(anotherAssignee)
                        .isRead(false)
                        .member(anotherMember)
                        .build();

                notificationRepository.save(notification);

                notificationService.notify(
                        anotherAccount.getId(),
                        NotificationMessage.from(notification, anotherAccount, anotherMember,
                                anotherAssignee, anotherIssue)
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

        if (assigneeRepository.existsByMemberIdAndIssueId(member.getId(), issue.getId())) {
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

    public Set<MemberAndIssueProjection> readProjectNowIssue(Long projectId) {
        return assigneeRepository.findAllProjectNowIssueByProjectId(projectId);
    }

    public MemberAndIssueProjection readProjectNowOwnIssue(Long projectId, Long accountId) {
        Set<MemberAndIssueProjection> result = assigneeRepository.findAllProjectNowIssueByProjectIdAndAccountId(
                projectId,
                accountId);

        if (result.size() != 1) {
            throw new RuntimeException("해당하는 구성원이 존재하지 않습니다.");
        }

        return result.iterator().next();
    }
}
