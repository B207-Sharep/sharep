package com.sharep.be.modules.member.repository;

import static com.sharep.be.modules.account.QAccount.*;
import static com.sharep.be.modules.job.domain.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.*;
import static com.sharep.be.modules.project.QProject.*;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import com.sharep.be.modules.job.domain.QJob;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.QMember;
import com.sharep.be.modules.member.QRole;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.QProject;
import java.time.LocalDateTime;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllByProjectId(Long projectId) {
        return queryFactory.select(member)
                .from(member)
                .innerJoin(member.project, project).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .leftJoin(member.roles, role1).fetchJoin()
                .where(member.project.id.eq(projectId))
                .fetch();
    }

    @Override
    public List<Member> findAllWithIssueAndJob() {
        LocalDateTime startOfYesterday = LocalDateTime.now().minusDays(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime startOfToday = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        return queryFactory.selectFrom(member)
                .join(member.jobs, job)
                .where(job.createdAt.between(startOfYesterday, startOfToday))
                .fetch();
    }
}
