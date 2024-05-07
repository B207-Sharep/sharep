package com.sharep.be.modules.assignee;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.sharep.be.infra.MockMvcTest;
import com.sharep.be.modules.account.repository.AccountRepository;
import com.sharep.be.modules.account.WithMockAccount;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@MockMvcTest
class AssigneeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AccountRepository accountRepository;

    @BeforeEach
    public void beforeEach(){
        accountRepository.deleteAll();
    }

    // ProjectVoter Denied
//    @Test
//    @WithMockAccount(email = "hello@google.com")
//    public void test1() throws Exception {
//        mockMvc.perform(
//                post("/projects/1/issues/1/assignees"))
//                .andDo(print())
//                .andExpect(status().isCreated());
//    }


    @Test
    @DisplayName("인가 테스트")
    @WithMockAccount(email = "hello@google.com")
    public void authenticationCheck() throws Exception {
        mockMvc.perform(get("/auth/check").
                        contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }




}