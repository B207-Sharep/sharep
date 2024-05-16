package com.sharep.be.modules.assignee.controller;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.domain.State;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.notification.controller.NotificationService;
import com.sharep.be.modules.notification.domain.Notification;
import com.sharep.be.modules.notification.domain.NotificationMessage;
import com.sharep.be.modules.notification.service.NotificationRepository;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.repository.ProjectRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface AssigneeService {

    Long update(Long accountId, Long projectId, Long issueId, State state);

    Long create(Long projectId, Long issueId, Long accountId);

    Long delete(Long projectId, Long issueId, Long accountId);

    List<Assignee> readProjectNowIssue(Long projectId);

    List<Member> readProjectMemberNowIssue(Long projectId);

    List<Assignee> readProjectNowOwnIssue(Long projectId, Long accountId);

    List<Member> readProjectMemberNowOwnIssue(Long projectId, Long accountId);
}
