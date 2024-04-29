package com.sharep.be.modules.member;

import static com.sharep.be.modules.account.QAccount.*;
import static com.sharep.be.modules.member.QMember.member;
import static com.sharep.be.modules.member.QRole.*;
import static com.sharep.be.modules.project.QProject.project;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sharep.be.modules.account.QAccount;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllByProjectIdAndAccountId(Long projectId, Long accountId) {
        return queryFactory.selectFrom(member)
                .from(member)
                .join(project.leader, account)
                .join(project.members, member)
                .join(member.roles, role1)
                .where(project.id.eq(projectId)
                        .and(member.account.id.eq(accountId)))
                .fetch();
    }
}
