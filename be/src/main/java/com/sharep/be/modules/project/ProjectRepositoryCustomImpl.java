package com.sharep.be.modules.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.account.QAccount;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.QMember;
import com.sharep.be.modules.member.QRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.sharep.be.modules.account.QAccount.*;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

@Repository
@RequiredArgsConstructor
public class ProjectRepositoryCustomImpl implements ProjectRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public List<Project> findAllByAccountId(Long accountId) {
        List<Long> ids = queryFactory.select(project.id)
                .from(project)
                .leftJoin(project.members, member)
                .innerJoin(member.account, account)
                .where(member.account.id.eq(accountId))
                .distinct()
                .fetch();

        return queryFactory.select(project)
                .from(project)
                .leftJoin(project.members, member).fetchJoin()
                .innerJoin(member.account, account).fetchJoin()
                .where(project.id.in(ids))
                .fetch();
    }


}
