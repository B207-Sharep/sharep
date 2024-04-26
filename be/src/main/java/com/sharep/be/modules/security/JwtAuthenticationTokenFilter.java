package com.sharep.be.modules.security;

import com.sharep.be.infra.config.JwtUtil;
import com.sharep.be.modules.auth.RoleType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.*;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationTokenFilter extends GenericFilterBean {

    private static final Pattern BEARER = Pattern.compile("^Bearer$", Pattern.CASE_INSENSITIVE);
    private final JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        if (SecurityContextHolder.getContext().getAuthentication() == null) {

            String authorizationToken = obtainAuthorizationToken(req); // Bearer check & get token

            if (authorizationToken != null && jwtUtil.validateToken(authorizationToken)) {
                try {
                    Long accountId = jwtUtil.getAccountId(authorizationToken);
                    String email = jwtUtil.getEmail(authorizationToken);
                    List<GrantedAuthority> authorities = obtainAuthorities(
                            jwtUtil.getRoles(authorizationToken));
                    JwtAuthenticationToken authentication = new JwtAuthenticationToken(
                            new JwtAuthentication(accountId, email), null, authorities);
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(req));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (Exception e) {
                    log.warn("Jwt Process failed : {}", e.getMessage());
                }

            }
        }
        filterChain.doFilter(req, res);
    }

    private List<GrantedAuthority> obtainAuthorities(List<String> roles) {
        if (roles == null || roles.size() == 0 ){
            return Collections.emptyList();
        }
        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    private String obtainAuthorizationToken(HttpServletRequest req) {
        String token = req.getHeader(jwtUtil.getHeader());
        if (token != null) {
            try {
                token = URLDecoder.decode(token, "UTF-8");
                String[] tokens = token.split(" ");
                if (tokens.length == 2) {
                    String scheme = tokens[0];
                    String credentails = tokens[1];
                    return BEARER.matcher(scheme).matches() ? credentails : null;
                }
            } catch (Exception e) {
                log.error("Jwt ObtainAuthorization Process error");
            }
        }

        return null;
    }
}
