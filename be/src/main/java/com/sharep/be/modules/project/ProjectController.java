package com.sharep.be.modules.project;

import com.sharep.be.modules.project.dto.MemberDto.MemberResponse;
import com.sharep.be.modules.project.dto.ProjectDto;
import com.sharep.be.modules.project.dto.ProjectDto.ProjectResponseDto;
import com.sharep.be.modules.project.dto.TokenDto;
import com.sharep.be.modules.project.service.ProjectService;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects")
@Slf4j
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Void> createProject(
            @RequestBody @Valid ProjectDto.ProjectCreate projectCreate,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {
        projectService.saveProject(projectCreate, jwtAuthentication.id);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDto>> readProject(
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {
        return ResponseEntity.ok(projectService.readProject(jwtAuthentication.id));
    }

    /*
    멤버 추가는 추후 구현
     */

//    @PostMapping("/{projectId}/members")
//    public ResponseEntity<Void> addMember(@RequestBody MemberRequestDto memberRequestDto,
//            @AuthenticationPrincipal JwtAuthentication jwtAuthentication,
//            @PathVariable Long projectId) {
//        log.info("member 추가 controller jwt id : {}, projectId : {}, member  : {}",
//                jwtAuthentication.id, projectId, memberRequestDto);
//        projectService.addMember(projectId, jwtAuthentication.id, memberRequestDto);
//        return ResponseEntity.status(HttpStatus.CREATED).build();
//    }

    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<MemberResponse>> readMember(
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication,
            @PathVariable Long projectId) {
        log.info("member 조회 controller jwt id : {}, projectId : {}", jwtAuthentication.id,
                projectId);
        return ResponseEntity.ok(projectService.readMember(projectId));
    }

    @PostMapping("/{projectId}/token")
    public ResponseEntity<TokenDto> createToken(
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication,
            @PathVariable Long projectId) {

        String token = projectService.createToken(projectId, jwtAuthentication.id);
        return ResponseEntity.ok(new TokenDto(projectId, token));
    }




}
