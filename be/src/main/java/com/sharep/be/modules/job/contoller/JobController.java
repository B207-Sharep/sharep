package com.sharep.be.modules.job.contoller;

import com.sharep.be.modules.job.contoller.port.JobService;
import com.sharep.be.modules.job.domain.JobCreate;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE,  MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> createJob(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @Valid @RequestPart(value = "request") JobCreate jobCreate,
            @RequestPart(value = "image", required = false) MultipartFile image
    ){
        //TODO: 이승민

//        jobService.create(authentication.id, jobCreate, image);
        jobService.create(1L, jobCreate, image);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //TODO: 이승민 전체, 팀원별, 직무별, 이슈별
    @GetMapping("")
    public void readJob(){}




}
