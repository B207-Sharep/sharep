package com.sharep.be.modules.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.member.Member;
import com.sharep.be.modules.member.QMember;
import com.sharep.be.modules.member.QRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.project.QProject.project;

@Repository
@RequiredArgsConstructor
public class ProjectRepositoryCustomImpl implements ProjectRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public List<Project> findAllByAccountId(Long accountId) {
        return queryFactory.selectFrom(project)
                .from(project)
                .join(project.members, member)
                .where(member.account.id.eq(accountId))
                .fetch();
    }


}
