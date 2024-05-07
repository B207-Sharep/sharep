package com.sharep.be.modules.member;

import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import lombok.Builder;

@Builder
public record MemberResponse(
        Long accountId,
        String nickname,
        List<RoleType> roles,
        String userImageUrl
) {

    public static MemberResponse from(Member member) {
        return MemberResponse.builder()
                .accountId(member.getAccount().getId())
                .nickname(member.getAccount().getNickname())
                .roles(
                        member.getRoles()
                                .stream()
                                .map(role -> role.getRole())
                                .toList()
                )
                .userImageUrl(member.getAccount().getImageUrl())
                .build();
    }
}
