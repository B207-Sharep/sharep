package com.sharep.be.modules.security;

import static com.google.common.base.Preconditions.checkArgument;

import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
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
public class ProjectBasedVoter implements AuthorizationManager<RequestAuthorizationContext> {
    private final ProjectRepository projectRepository;
    private final Function<String, Long> idExtractor;

    public ProjectBasedVoter(ProjectRepository projectRepository,
            Function<String, Long> idExtractor) {
        checkArgument(idExtractor != null, "idExtractor must be provided.");

        this.idExtractor = idExtractor;
        this.projectRepository = projectRepository;
    }

    @Override
    public void verify(Supplier<Authentication> authentication,
            RequestAuthorizationContext object) {
        AuthorizationManager.super.verify(authentication, object);
    }

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication,
            RequestAuthorizationContext context) {
        log.info("======== security project based voter in ========");
        JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication.get();
        JwtAuthentication principal = (JwtAuthentication) jwtAuthenticationToken.getPrincipal();


        Long projectId = obtainTargetId(context.getRequest());

        List<Project> projects = projectRepository.findAllByAccountId(principal.id);

        if(projects.stream().map(Project::getId).anyMatch(p -> p.equals(projectId))){
            log.info("======== granted voter out ========");
            return new AuthorizationDecision(true);
        }
        log.info("======== not granted voter out ========");
        return new AuthorizationDecision(false);
    }

    private Long obtainTargetId(HttpServletRequest request) {
        return idExtractor.apply(request.getRequestURI());
    }

}
