package com.sharep.be.modules.project.dto;

import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.account.dto.AccountDto.AccountResponse;
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


    public record MemberResponse (
            Long id,
            AccountResponse account,
            String summary,
            List<RoleType> roles
    ){

    }

    public static MemberResponse toDto(Member member){
        return new MemberResponse(member.getId(), AccountDto.toDto(member.getAccount()),
                member.getSummary(), member.getRoles().stream().map(Role::getRole).collect(
                Collectors.toList()));
    }
}
