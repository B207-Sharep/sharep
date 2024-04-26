package com.sharep.be.modules.job;

import com.sharep.be.modules.job.dto.JobDto.JobCreateRequestDto;
import com.sharep.be.modules.security.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping("")
    public ResponseEntity<Void> createJob(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @RequestPart JobCreateRequestDto jobCreateRequestDto,
            @RequestPart MultipartFile image){
        //TODO: 이승민

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //TODO: 이승민
    @GetMapping("")
    public void readJob(){}




}
