package com.sharep.be.modules.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharep.be.infra.MockMvcTest;
import com.sharep.be.modules.account.dto.AccountDto.AccountCreateDto;
import com.sharep.be.modules.account.repository.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        AccountCreateDto accountCreateDto = new AccountCreateDto();
        String email = "hello@google.com";
        accountCreateDto.setNickname("nickname");
        accountCreateDto.setEmail(email);
        accountCreateDto.setPassword("1q2w3e4r");

        mockMvc.perform(post("/accounts/sign-up").
                contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountCreateDto)))
                .andExpect(status().isCreated());

        assertTrue(accountRepository.existsByEmail(email));
    }

    @Test
    @DisplayName("회원 가입 처리 - 입력값 오류")
    public void signUpWithWrongTest() throws Exception {
        AccountCreateDto accountCreateDto = new AccountCreateDto();
        String email = "hello@google.com";
        accountCreateDto.setNickname("");
        accountCreateDto.setEmail(email);
        accountCreateDto.setPassword("1q2w3e4r");

        mockMvc.perform(post("/accounts/sign-up").
                        contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountCreateDto)))
                .andExpect(status().is5xxServerError());

        assertFalse(accountRepository.existsByEmail(email));
    }


}