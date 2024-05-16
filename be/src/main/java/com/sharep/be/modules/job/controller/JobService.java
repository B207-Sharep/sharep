package com.sharep.be.modules.job.controller;

import com.sharep.be.modules.job.controller.request.JobCreateRequest;
import com.sharep.be.modules.job.controller.request.JobReadRequest;
import com.sharep.be.modules.job.controller.response.JobGrassResponse;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.project.dto.GitlabHook;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface JobService {

    Long create(Long accountId, Long projectId, Long issueId, JobCreateRequest jobCreateRequest,
            MultipartFile image);

    List<Job> read(Long projectId, JobReadRequest jobReadRequest);

    JobGrassResponse readGrass(Long accountId);

    void commitCreated(GitlabHook gitlabHook, Long projectId);

    List<Job> readContribution(Long projectId, Long accountId);
}
