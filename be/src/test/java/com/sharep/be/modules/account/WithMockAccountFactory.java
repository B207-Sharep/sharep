package com.sharep.be.modules.account;

import com.sharep.be.modules.account.dto.AccountDto.AccountCreateDto;
import com.sharep.be.modules.account.dto.AccountDto.AccountResponseDto;
import com.sharep.be.modules.security.JwtAuthentication;
import com.sharep.be.modules.security.JwtAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithSecurityContextFactory;
@RequiredArgsConstructor
public class WithMockAccountFactory implements
        WithSecurityContextFactory<WithMockAccount> {
    private final AccountService accountService;

    @Override
    public SecurityContext createSecurityContext(WithMockAccount withMockAccount) {
        // sign up
        AccountCreateDto account = new AccountCreateDto();
        String email = withMockAccount.email();
        account.setEmail(email);
        account.setPassword("1q2w3e4r");
        account.setNickname("poobao");

        AccountResponseDto accountResponseDto = accountService.signUp(account);
        UserDetails userDetails = accountService.loadUserByUsername(email);

        // log in
        JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(
                new JwtAuthentication(accountResponseDto.getId(), email), null, userDetails.getAuthorities());

        System.out.println(jwtAuthenticationToken);
        // make test context
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(jwtAuthenticationToken);

        return context;
    }
}
