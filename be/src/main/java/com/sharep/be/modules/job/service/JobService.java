package com.sharep.be.modules.job.service;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.repository.AccountRepository;
import com.sharep.be.modules.assignee.domain.Assignee;
import com.sharep.be.modules.assignee.service.AssigneeRepository;
import com.sharep.be.modules.common.service.port.S3Repository;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.job.domain.Job;
import com.sharep.be.modules.job.domain.JobGrass;
import com.sharep.be.modules.job.controller.request.JobCreateRequest;
import com.sharep.be.modules.job.controller.request.JobReadRequest;
import com.sharep.be.modules.job.controller.response.JobGrassResponse;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.repository.MemberRepository;
import com.sharep.be.modules.member.Role.RoleType;
import com.sharep.be.modules.project.dto.GitlabHook;
import com.sharep.be.modules.project.dto.GitlabHook.Commit;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobRepository jobRepository;
    private final S3Repository s3Repository;
    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;
    private final AccountRepository accountRepository;
    private final AssigneeRepository assigneeRepository;

    public Long create(Long accountId, Long projectId, Long issueId,
            JobCreateRequest jobCreateRequest, MultipartFile image) {

        String imageUrl = image == null ? "" : s3Repository.saveFile(image);

        Member member = memberRepository.findByAccountIdAndProjectId(accountId, projectId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("해당하는 이슈를 찾을 수 없습니다."));

//        Job job = Job.from(jobCreateRequest, member, issue, imageUrl);
        Job job = jobCreateRequest.toEntity(member, issue, imageUrl);

        jobRepository.save(job);

        return job.getId();
    }

    public List<Job> read(Long projectId, JobReadRequest jobReadRequest) {
        Long accountId = jobReadRequest.accountId();
        RoleType roleType = jobReadRequest.roleType();
        Long issueId = jobReadRequest.issueId();

        if (jobReadRequest.accountId() != null && jobReadRequest.accountId() > 0) {
            // 팀원별

            return jobRepository.findAllByAccountIdAndProjectId(accountId, projectId);

        } else if (jobReadRequest.roleType() != null) {
            // 직무별

            return jobRepository.findAllByProjectIdAndRoleType(projectId, roleType);
        } else if (jobReadRequest.issueId() != null && jobReadRequest.issueId() > 0) {
            // 이슈별

            return jobRepository.findAllByProjectIdAndIssueId(projectId, issueId);
        } else {
            //팀별

            return jobRepository.findAllByProjectId(projectId);
        }
    }

    @Transactional(readOnly = true)
    public JobGrassResponse readGrass(Long accountId) {
        if (accountId == null) {
            throw new IllegalArgumentException("accountId null"); // TODO
        }

        List<Job> jobs = jobRepository.findAllByAccountId(accountId);
        Integer jobCount = jobs.size();

        Map<LocalDate, Integer> jobCountsMap = new HashMap<>();
        jobs.forEach(job -> jobCountsMap.put(job.getCreatedAt().toLocalDate(),
                jobCountsMap.getOrDefault(job.getCreatedAt().toLocalDate(), 0) + 1));

        JobGrass[] grasses = new JobGrass[365];
        LocalDate currentDate = LocalDate.now();

        for (int i = 364; i >= 0; i--) {
            grasses[i] = new JobGrass(jobCountsMap.getOrDefault(currentDate, 0));
            currentDate = currentDate.minusDays(1);
        }
        return new JobGrassResponse(jobCount, grasses);
    }

    public void commitCreated(GitlabHook gitlabHook, Long projectId) {
        for (Commit commit : gitlabHook.getCommits()) {
            // 이미 저장한 커밋 continue
            if (jobRepository.findByCommitId(commit.getId()).isPresent()) {
                log.info("commit continue");
                continue;
            }
            // member find
            Account account = null;
            try {
                account = accountRepository.findByEmail(commit.getAuthor().getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("no user"));
            } catch (UsernameNotFoundException e) {
                // 프로젝트에 등록안한 이메일 continue
                log.error(e.getMessage());
                continue;
            }

            Member member = memberRepository.findByAccountIdAndProjectId(account.getId(), projectId)
                    .orElseThrow(() -> new UsernameNotFoundException("no member"));

            // member가 진행중인 issue find
            Assignee assignee = assigneeRepository.findByAccountIdAndProjectId(account.getId(),
                            projectId)
                    .orElseThrow(() -> new IllegalArgumentException("no assignee"));
            jobRepository.save(Job.from(member, assignee.getIssue(), commit));
        }
    }

    public List<Job> readContribution(Long projectId, Long accountId) {
        return jobRepository.findContributionByProjectIdAndAccountId(projectId, accountId);
    }
}
