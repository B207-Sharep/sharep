package com.sharep.be.modules.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 963788140L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final com.sharep.be.modules.account.QAccount account;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<com.sharep.be.modules.job.domain.Job, com.sharep.be.modules.job.domain.QJob> jobs = this.<com.sharep.be.modules.job.domain.Job, com.sharep.be.modules.job.domain.QJob>createList("jobs", com.sharep.be.modules.job.domain.Job.class, com.sharep.be.modules.job.domain.QJob.class, PathInits.DIRECT2);

    public final com.sharep.be.modules.project.QProject project;

    public final SetPath<Role, QRole> roles = this.<Role, QRole>createSet("roles", Role.class, QRole.class, PathInits.DIRECT2);

    public final StringPath summary = createString("summary");

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.account = inits.isInitialized("account") ? new com.sharep.be.modules.account.QAccount(forProperty("account")) : null;
        this.project = inits.isInitialized("project") ? new com.sharep.be.modules.project.QProject(forProperty("project"), inits.get("project")) : null;
    }

}

