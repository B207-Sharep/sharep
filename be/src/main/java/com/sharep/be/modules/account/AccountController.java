package com.sharep.be.modules.account;

import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.account.validator.AccountValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import static com.sharep.be.modules.account.dto.AccountDto.*;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final AccountValidator accountValidator;

    @InitBinder("accountRequestDto")
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(accountValidator);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(
            @RequestBody @Valid AccountRequestDto accountRequestDto) {
        accountService.signUp(accountRequestDto);
        return ResponseEntity
                .status(HttpStatus.CREATED).build();
    }


}
