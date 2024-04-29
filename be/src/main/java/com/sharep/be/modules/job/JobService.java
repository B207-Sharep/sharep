package com.sharep.be.modules.job;

import com.sharep.be.modules.common.service.port.S3Repository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.IssueRepository;
import com.sharep.be.modules.job.dto.JobCreateRequest;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class JobService{

    private final JobRepository jobRepository;
    private final S3Repository s3Repository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    public void create(Long accountId, Long projectId, JobCreateRequest jobCreateRequest, MultipartFile image) {

        String imageUrl = s3Repository.saveFile(image);

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));

        Issue issue = issueRepository.findById(jobCreateRequest.getIssueId())
                .orElseThrow(() -> new RuntimeException("해당하는 이슈를 찾을 수 없습니다."));

        Job job = Job.from(jobCreateRequest, member, issue, imageUrl);

        jobRepository.save(job);
    }
}
