package com.sharep.be.modules.project.dto;

import com.sharep.be.modules.account.Account;
<<<<<<< HEAD
import com.sharep.be.modules.account.dto.AccountDto;
=======
>>>>>>> 619be59549b22b744b2c8f8482e00a796f149c34
import com.sharep.be.modules.account.dto.AccountDto.AccountResponseDto;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.project.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;
<<<<<<< HEAD
import java.util.Objects;
=======
>>>>>>> 619be59549b22b744b2c8f8482e00a796f149c34
import java.util.stream.Collectors;

import static com.sharep.be.modules.member.Role.*;

public class ProjectDto {

    public record ProjectRequestDto(
            @NotBlank @Size(min = 1, max = 100) String title,
            @NotBlank @Size(min = 1, max = 100) String bio,

            List<RoleType> roles
    ) {

    }

    public record ProjectResponseDto(
            Long id,
            String title,
            String bio,
            List<AccountResponseDto> accounts,
            LocalDateTime createdAt
    ) {

    }

    public static Project convertSave(ProjectRequestDto projectRequestDto,
            Account account) {
        return Project.builder()
                .leader(account)
                .title(projectRequestDto.title())
                .bio(projectRequestDto.bio())
                .build();
    }

    public static ProjectResponseDto toDto(Project project) {
        return new ProjectResponseDto(project.getId(), project.getTitle(),
<<<<<<< HEAD
                project.getBio(), project.getMembers().stream().map(Member::getAccount)
                .filter(Objects::nonNull)
                .map(AccountDto::toDto).toList(), project.getCreatedAt());

=======
                project.getBio(), project.getMembers().stream()
                .map(Member::getAccount)
                .filter(account -> account != null)
                .map(Account::getImageUrl)
                .collect(Collectors.toList()), project.getCreatedAt().toString());
>>>>>>> 619be59549b22b744b2c8f8482e00a796f149c34
    }
}
