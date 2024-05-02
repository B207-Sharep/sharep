package com.sharep.be.modules.security;

import static com.google.common.base.Preconditions.checkArgument;

import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
import com.sharep.be.modules.project.ProjectService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.util.matcher.RequestMatcher;


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
        JwtAuthentication jwtAuthentication = (JwtAuthentication) authentication.get();

        System.out.println("=============voter ========");

        Long projectId = obtainTargetId(context.getRequest());

        List<Project> projects = projectRepository.findAllByAccountId(jwtAuthentication.id);

        if(projects.stream().map(Project::getId).anyMatch(p -> p.equals(projectId))){
            return new AuthorizationDecision(true);
        }
        return new AuthorizationDecision(false);
    }

    private Long obtainTargetId(HttpServletRequest request) {
        return idExtractor.apply(request.getRequestURI());
    }

}
