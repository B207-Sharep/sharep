package com.sharep.be.modules.account;

import com.sharep.be.modules.account.dto.AccountDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.sharep.be.modules.account.dto.AccountDto.*;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountResponseDto signUp(AccountRequestDto accountDto) {
        accountDto.setPassword(passwordEncoder.encode(accountDto.getPassword())); // Password Encode
        Account account = AccountDto.toEntity(accountDto);
        return toDto(accountRepository.save(account));
    }
}
