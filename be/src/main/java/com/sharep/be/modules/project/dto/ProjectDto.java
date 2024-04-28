package com.sharep.be.modules.project.dto;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.project.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDto {

    public record ProjectRequestDto(
            @NotBlank @Size(min = 1, max = 100) String title,
            @NotBlank @Size(min = 1, max = 100) String bio
    ) {

    }

    public record ProjectResponseDto(
            Long id,
            String title,
            String bio,
            String createdAt

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
                project.getBio(), project.getCreatedAt().toString());
    }
}
