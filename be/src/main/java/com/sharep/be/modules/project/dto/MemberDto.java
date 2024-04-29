package com.sharep.be.modules.project.dto;

import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.account.dto.AccountDto.AccountResponseDto;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.Role;
import java.util.stream.Collectors;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static com.sharep.be.modules.member.Role.RoleType;

public class MemberDto {
    @Data
    @NoArgsConstructor
    public static class MemberRequestDto{
        private Long id;

        private List<RoleType> roles;

    }

    @Data
    @NoArgsConstructor
    public static class MemberResponseDto{
        private Long id;
        private AccountResponseDto accountResponseDto;

        private List<RoleType> roles;
    }

    public static MemberResponseDto toDto(Member member){
        MemberResponseDto memberResponseDto = new MemberResponseDto();
        memberResponseDto.setId(member.getId());
        memberResponseDto.setAccountResponseDto(AccountDto.toDto(member.getAccount()));
        memberResponseDto.setRoles(member.getRoles().stream().map(Role::getRole).collect(
                Collectors.toList()));
        return memberResponseDto;
    }
}
