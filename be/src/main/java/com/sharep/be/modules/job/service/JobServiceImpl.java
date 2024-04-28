package com.sharep.be.modules.job.service;

import com.sharep.be.modules.common.service.port.S3Repository;
import com.sharep.be.modules.job.contoller.port.JobService;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.job.domain.JobCreate;
import com.sharep.be.modules.job.service.port.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final S3Repository s3Repository;

    @Override
    public void create(Long memberId, JobCreate jobCreate, MultipartFile image) {
        // TODO findByMemberId, findByIssueId

        String imageUrl = s3Repository.saveFile(image);
        Job job = Job.from(jobCreate, imageUrl);
        jobRepository.save(job);
    }
}
