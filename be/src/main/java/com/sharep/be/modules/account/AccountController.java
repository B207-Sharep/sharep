package com.sharep.be.modules.account;

import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.account.validator.AccountValidator;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/accounts")
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
            @RequestBody @Valid AccountDto.AccountCreateDto accountCreateDto) {
        accountService.signUp(accountCreateDto);
        return ResponseEntity
                .status(HttpStatus.CREATED).build();
    }

    @GetMapping("/email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity
                .ok(accountRepository.existsByEmail(email));
    }

//    @GetMapping("/nickname")
//    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
//        return ResponseEntity
//                .ok(accountRepository.existsByNickname(nickname));
//    }

    @PatchMapping(value = "/image", consumes = {MediaType.APPLICATION_JSON_VALUE,  MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> updateImage(@AuthenticationPrincipal JwtAuthentication authentication,
            @RequestPart(value = "image", required = false) MultipartFile image ){
        accountService.updateImage(authentication.id, image);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
