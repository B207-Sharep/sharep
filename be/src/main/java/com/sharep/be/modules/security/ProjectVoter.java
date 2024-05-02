package com.sharep.be.modules.security;

import static com.google.common.base.Preconditions.checkArgument;

import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.util.matcher.RequestMatcher;


public class ProjectVoter implements AccessDecisionVoter<FilterInvocation> {
    private final RequestMatcher requiresAuthorizationRequestMatcher;
    private final Function<String, Long> idExtractor;
    private final ProjectRepository projectRepository;

    public ProjectVoter(RequestMatcher requiresAuthorizationRequestMatcher,
            Function<String, Long> idExtractor, ProjectRepository projectRepository) {
        checkArgument(requiresAuthorizationRequestMatcher != null, "requiresAuthorizationRequestMatcher must be provided.");
        checkArgument(idExtractor != null, "idExtractor must be provided.");

        this.requiresAuthorizationRequestMatcher = requiresAuthorizationRequestMatcher;
        this.idExtractor = idExtractor;
        this.projectRepository = projectRepository;
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        return false;
    }

    @Override
    public int vote(Authentication authentication, FilterInvocation filter,
            Collection<ConfigAttribute> attributes) {
        HttpServletRequest request = filter.getRequest();

        if(!requiresAuthorization(request)){
            return ACCESS_GRANTED;
        }

        if (!JwtAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            return ACCESS_ABSTAIN;
        }

        JwtAuthentication jwtAuth = (JwtAuthentication) authentication.getPrincipal();
        Long projectId = obtainTargetId(request);

        List<Project> projects = projectRepository.findAllByAccountId(jwtAuth.id);

        if(!projects.stream().map(Project::getId).anyMatch(p -> p.equals(projectId)))return ACCESS_DENIED;

        return ACCESS_GRANTED;
    }

    private Long obtainTargetId(HttpServletRequest request) {
        return idExtractor.apply(request.getRequestURI());
    }

    private boolean requiresAuthorization(HttpServletRequest request) {
        System.out.println(request);
        return requiresAuthorizationRequestMatcher.matches(request);
    }


    @Override
    public boolean supports(Class clazz) {
        return false;
    }
}
