package com.sharep.be.modules.account;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharep.be.infra.MockMvcTest;
import com.sharep.be.modules.account.dto.AccountDto.AccountRequestDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@MockMvcTest
class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    public void beforeEach(){
        accountRepository.deleteAll();
    }

    @Test
    @DisplayName("회원 가입 처리 - 입력값 정상")
    public void signUpWithRightTest() throws Exception {
        AccountRequestDto accountRequestDto = new AccountRequestDto();
        String email = "hello@google.com";
        accountRequestDto.setNickname("nickname");
        accountRequestDto.setEmail(email);
        accountRequestDto.setPassword("1q2w3e4r");

        mockMvc.perform(post("/account/sign-up").
                contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequestDto)))
                .andExpect(status().isOk());

        assertTrue(accountRepository.existsByEmail(email));
    }

    @Test
    @DisplayName("회원 가입 처리 - 입력값 오류")
    public void signUpWithWrongTest() throws Exception {
        AccountRequestDto accountRequestDto = new AccountRequestDto();
        String email = "hello@google.com";
        accountRequestDto.setNickname("");
        accountRequestDto.setEmail(email);
        accountRequestDto.setPassword("1q2w3e4r");

        mockMvc.perform(post("/account/sign-up").
                        contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequestDto)))
                .andExpect(status().is5xxServerError());

        assertFalse(accountRepository.existsByEmail(email));
    }


}