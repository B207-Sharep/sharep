package com.sharep.be.modules.account.dto;

import com.sharep.be.modules.account.Account;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

public class AccountDto {
    @Data
    public static class AccountRequestDto{
        @NotBlank
        @Length(min = 1, max = 8)
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9_-]{1,8}$")
        private String nickname;

        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Length(min = 8, max = 20)
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class AccountResponseDto{
        private Long id;
    }

    public static Account toEntity(AccountRequestDto accountRequestDto){
        return Account.builder()
                .nickname(accountRequestDto.getNickname())
                .password(accountRequestDto.getPassword())
                .email(accountRequestDto.getEmail())
                .build();
    }

    public static AccountResponseDto toDto(Account account){
        return new AccountResponseDto(account.getId());
    }
}
