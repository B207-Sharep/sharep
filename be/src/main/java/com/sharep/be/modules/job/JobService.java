package com.sharep.be.modules.job;

import com.sharep.be.modules.common.service.port.S3Repository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.job.repository.JobRepository;
import com.sharep.be.modules.job.request.JobCreateRequest;
import com.sharep.be.modules.job.request.JobReadRequest;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.MemberRepository;
import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class JobService{

    private final JobRepository jobRepository;
    private final S3Repository s3Repository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    public Long create(Long accountId, Long projectId, Long issueId, JobCreateRequest jobCreateRequest, MultipartFile image) {

        String imageUrl = image == null ? "" : s3Repository.saveFile(image);

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 이슈를 찾을 수 없습니다."));

        Job job = Job.from(jobCreateRequest, member, issue, imageUrl);

        jobRepository.save(job);

        return job.getId();
    }

    public List<Job> read(Long projectId, JobReadRequest jobReadRequest) {
        Long accountId = jobReadRequest.accountId();
        RoleType roleType = jobReadRequest.roleType();
        Long issueId = jobReadRequest.issueId();

        if(jobReadRequest.accountId() != null && jobReadRequest.accountId() > 0){
            // 팀원별

           return jobRepository.findAllByAccountIdAndProjectId(accountId, projectId);

        } else if(jobReadRequest.roleType() != null){
            // 직무별

            return  jobRepository.findAllByProjectIdAndRoleType(projectId, roleType);
        } else if(jobReadRequest.issueId() != null && jobReadRequest.issueId() > 0){
            // 이슈별

            return jobRepository.findAllByProjectIdAndIssueId(projectId, issueId);
        } else {
            //팀별

            return jobRepository.findAllByProjectId(projectId);
        }
    }
}