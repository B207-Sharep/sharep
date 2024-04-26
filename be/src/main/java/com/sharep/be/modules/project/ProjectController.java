package com.sharep.be.modules.project;

import com.sharep.be.modules.project.dto.ProjectDto.ProjectRequestDto;
import com.sharep.be.modules.project.dto.ProjectDto.ProjectResponseDto;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Void> createProject(
            @RequestBody @Valid ProjectRequestDto projectRequestDto,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {
        projectService.saveProject(projectRequestDto,
                jwtAuthentication.id);

        return ResponseEntity
                .status(HttpStatus.CREATED).build();
    }

}
