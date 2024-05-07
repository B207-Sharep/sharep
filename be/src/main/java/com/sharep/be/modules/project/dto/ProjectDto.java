package com.sharep.be.modules.project.dto;

import static com.sharep.be.modules.member.Role.RoleType;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.account.dto.AccountDto.AccountResponse;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.project.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ProjectDto {

    public record ProjectCreate(
            @NotBlank @Size(min = 1, max = 100) String title,
            @NotBlank @Size(min = 1, max = 100) String bio,
            List<MemberCreate> members
    ) {
        public record MemberCreate(
                Long id,
                List<RoleType> roles
        ){

        }
    }

    public record ProjectResponseDto(
            Long id,
            String title,
            String bio,
            List<AccountResponse> accounts,
            LocalDateTime createdAt
    ) {

    }

    public static Project convertSave(ProjectCreate projectCreate,
            Account account) {
        return Project.builder()
                .leader(account)
                .title(projectCreate.title())
                .bio(projectCreate.bio())
                .build();
    }

    public static ProjectResponseDto toDto(Project project) {
        return new ProjectResponseDto(project.getId(), project.getTitle(),
                project.getBio(), project.getMembers().stream()
                .map(Member::getAccount)
                .filter(account -> account != null)
                .map(AccountDto::toDto)
                .collect(Collectors.toList()), project.getCreatedAt());

    }
}
