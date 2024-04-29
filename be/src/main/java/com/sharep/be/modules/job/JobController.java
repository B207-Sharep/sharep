package com.sharep.be.modules.job;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.job.dto.JobCreateRequest;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
//@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping(value = "/projects/{projectId}/jobs", consumes = {MediaType.APPLICATION_JSON_VALUE,  MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> createJob(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @Valid @RequestPart(value = "request") JobCreateRequest jobCreateRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){

        jobService.create(authentication.id, projectId, jobCreateRequest, image);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //FIXME: 이승민 전체, 팀원별, 직무별, 이슈별
    @GetMapping("")
    public ResponseEntity<List<Issue>> readJob(){
        List<Issue> issues = new ArrayList<>();
        issues.add(new Issue().builder()
                        .issueName("fdsfs")
                        .description("Fsdfsd")
                .build());

        issues.add(new Issue().builder()
                .issueName("fdsfs")
                .description("Fsdfsd")
                .build());
        issues.add(new Issue().builder()
                .issueName("fdsfs")
                .description("Fsdfsd")
                .build());
        issues.add(new Issue().builder()
                .issueName("fdsfs")
                .description("Fsdfsd")
                .build());

        return ResponseEntity.ok(issues);
    }




}
