package com.sharep.be.modules.security;

import static com.google.common.base.Preconditions.checkArgument;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

@Slf4j
public class IssueBasedVoter implements AuthorizationManager<RequestAuthorizationContext> {
    private final AuthorizationManager<RequestAuthorizationContext> projectVoterManager;

    private final IssueRepository issueRepository;
    private final Function<String, Long> projectIdExtractor;
    private final Function<String, Long> issueIdExtractor;

    public IssueBasedVoter(IssueRepository issueRepository,
            Function<String, Long> projectIdExtractor,
            Function<String, Long> issueIdExtractor, AuthorizationManager authorizationManager) {
        checkArgument(projectIdExtractor != null, "idExtractor must be provided.");
        checkArgument(issueIdExtractor != null, "idExtractor must be provided.");

        this.projectIdExtractor = projectIdExtractor;
        this.issueIdExtractor = issueIdExtractor;
        this.issueRepository = issueRepository;
        this.projectVoterManager = authorizationManager;
    }

    @Override
    public void verify(Supplier<Authentication> authentication,
            RequestAuthorizationContext object) {
        AuthorizationManager.super.verify(authentication, object);
    }

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication,
            RequestAuthorizationContext context) {
        projectVoterManager.check(authentication, context);

        log.info("======== security issue based voter in ========");

        Long projectId = obtainProjectTargetId(context.getRequest());
        Long issueId = obtainIssueTargetId(context.getRequest());

        if (needCheck(issueId)) {
            List<Issue> issues = issueRepository.findAllByProjectId(projectId);

            if (issues.stream().map(Issue::getId).anyMatch(p -> p.equals(issueId))) {
                log.info("======== granted voter out ========");
                return new AuthorizationDecision(true);
            }
            log.info("======== not granted voter out ========");
            return new AuthorizationDecision(false);
        } else {
            return new AuthorizationDecision(true);
        }

    }

    private boolean needCheck(Long issueId) {
        return !issueId.equals(-1L);
    }

    private Long obtainProjectTargetId(HttpServletRequest request) {
        return projectIdExtractor.apply(request.getRequestURI());
    }

    private Long obtainIssueTargetId(HttpServletRequest request) {
        return issueIdExtractor.apply(request.getRequestURI());
    }


}