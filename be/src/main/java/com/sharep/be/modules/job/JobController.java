package com.sharep.be.modules.job;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.job.dto.JobCreateRequest;
import com.sharep.be.modules.job.dto.JobReadRequest;
import com.sharep.be.modules.member.Role;
import com.sharep.be.modules.member.Role.RoleType;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
//@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // 작업 생성
    @PostMapping(value = "/projects/{projectId}/issues/{issueId}/jobs", consumes = {MediaType.APPLICATION_JSON_VALUE,  MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> create(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId,
            @Valid @RequestPart(value = "request") JobCreateRequest jobCreateRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){

        jobService.create(authentication.id, projectId, issueId, jobCreateRequest, image);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 작업 조회(전체별, 팀원별, 직무별, 이슈별)
    @GetMapping(value = "/projects/{projectId}/jobs")
    public ResponseEntity<List<Job>> read( @AuthenticationPrincipal JwtAuthentication authentication,

            @PathVariable Long projectId,
            JobReadRequest jobReadRequest

    ){

        List<Job> response = jobService.read(projectId, jobReadRequest);

        return ResponseEntity.ok(response);
    }



}
