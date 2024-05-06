package com.sharep.be.modules.member;

import com.sharep.be.modules.gpt.GptService;
import com.sharep.be.modules.job.Job;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final GptService gptService;

    @Scheduled(cron = "${schedule.crone}") // application.yml crone tab
    public void summaryDailyJob(){
        log.info("==== daily scheduler on ====");
        // 모든 member 조회
        List<Member> members = memberRepository.findAllWithIssueAndJob();
        // 어제 한일 요약
        for(Member member : members){
            summary(member);
        }
    }

    @Transactional // 멤버 별 트랜잭션 분리, 특정 멤버 예외 시 전체 멤버 rollback 막기
    public void summary(Member member) {
        StringBuffer sendGPT = new StringBuffer();

        // 어제 작업 없을 경우
        if(member.getJobs().size() == 0){
            member.updateSummary(null);
            return;
        }

        // 어제 작업 있을 경우
        for(Job job : member.getJobs()){
            sendGPT.append(job.getName());
            sendGPT.append("\n");
        }

        // send GPT
        String summary = gptService.queryGPT(sendGPT.toString());

        // save Summary
        member.updateSummary(summary);
    }
}
