package com.sharep.be.modules.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharep.be.infra.MockMvcTest;
import com.sharep.be.modules.account.AccountRepository;
import com.sharep.be.modules.account.AccountService;
import com.sharep.be.modules.account.WithMockAccount;
import com.sharep.be.modules.account.dto.AccountDto.AccountCreateDto;
import com.sharep.be.modules.auth.dto.AuthDto.AuthRequestDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@MockMvcTest
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountService accountService;

    @AfterEach
    public void afterEach(){
        accountRepository.deleteAll();
    }

    public void makeAccount(){
        AccountCreateDto account = new AccountCreateDto();
        String email = "hello@google.com";
        account.setEmail(email);
        account.setPassword("1q2w3e4r");
        account.setNickname("poobao");

        accountService.signUp(account);

    }

    @Test
    @DisplayName("로그인 처리 - 입력값 정상")
    public void loginWithRightTest() throws Exception {
        makeAccount();
        AuthRequestDto auth = new AuthRequestDto();
        auth.setEmail("hello@google.com");
        auth.setPassword("1q2w3e4r");

        mockMvc.perform(post("/auth/login").
                        contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(auth)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("인가 테스트")
    @WithMockAccount(email = "hello@google.com")
    public void authenticationCheck() throws Exception {

        mockMvc.perform(get("/auth/check").
                        contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }


}