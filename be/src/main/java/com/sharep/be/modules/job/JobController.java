package com.sharep.be.modules.job;

import com.sharep.be.modules.job.request.JobCreateRequest;
import com.sharep.be.modules.job.request.JobReadRequest;
import com.sharep.be.modules.job.response.JobContributionResponse;
import com.sharep.be.modules.job.response.JobGrassResponse;
import com.sharep.be.modules.job.response.JobIdResponse;
import com.sharep.be.modules.job.response.JobReadResponse;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<JobIdResponse> create(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable @Min(1) Long projectId,
            @PathVariable @Min(1) Long issueId,
            @Valid @RequestPart(value = "request") JobCreateRequest jobCreateRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){

        Long jobId = jobService.create(authentication.id, projectId, issueId, jobCreateRequest, image);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new JobIdResponse(jobId)
        );
    }

    // 작업 조회(전체별, 팀원별, 직무별, 이슈별)
    @GetMapping(value = "/projects/{projectId}/jobs")
    public ResponseEntity<List<JobReadResponse>> read(
            @PathVariable @Min(1) Long projectId,
            JobReadRequest jobReadRequest

    ){

        return ResponseEntity.ok(
                jobService.read(projectId, jobReadRequest)
                        .stream()
                        .map(JobReadResponse::from)
                        .toList()
        );
    }

    @GetMapping("/jobs")
    public ResponseEntity<JobGrassResponse> grassRead(
            @AuthenticationPrincipal JwtAuthentication authentication){
        return ResponseEntity.ok(jobService.readGrass(authentication.id));
    }


}
