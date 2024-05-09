package com.sharep.be.modules.job.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJob is a Querydsl query type for Job
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJob extends EntityPathBase<Job> {

    private static final long serialVersionUID = 358435110L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QJob job = new QJob("job");

    public final StringPath commitId = createString("commitId");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final com.sharep.be.modules.issue.QIssue issue;

    public final com.sharep.be.modules.member.QMember member;

    public final StringPath name = createString("name");

    public QJob(String variable) {
        this(Job.class, forVariable(variable), INITS);
    }

    public QJob(Path<? extends Job> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QJob(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QJob(PathMetadata metadata, PathInits inits) {
        this(Job.class, metadata, inits);
    }

    public QJob(Class<? extends Job> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.issue = inits.isInitialized("issue") ? new com.sharep.be.modules.issue.QIssue(forProperty("issue"), inits.get("issue")) : null;
        this.member = inits.isInitialized("member") ? new com.sharep.be.modules.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

