package com.sharep.be.modules.job;

import static com.sharep.be.modules.job.QJob.job;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.role1;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.member.Role.RoleType;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class JobRepositoryCustomImpl implements JobRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Job> findAllByProjectId(Long projectId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(member)
                .on(member.project.id.eq(projectId))
                .fetch();
    }

    @Override
    public List<Job> findAllByMemberId(Long accountId, Long projectId) {
        return queryFactory.select(job)
                .from(job)
                .innerJoin(job.member, member)
                .where(member.account.id.eq(accountId)
                        .and(member.project.id.eq(projectId)))
                .fetch();
    }

    @Override
    public List<Job> findAllByRoleType(RoleType roleType) {

        return queryFactory.selectFrom(job)
                .innerJoin(job.member, member)
                .innerJoin(member.roles, role1)
                .where(role1.role.eq(roleType))
                .fetch();
    }

}
