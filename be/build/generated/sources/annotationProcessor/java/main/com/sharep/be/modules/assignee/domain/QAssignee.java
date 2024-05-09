package com.sharep.be.modules.assignee.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAssignee is a Querydsl query type for Assignee
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAssignee extends EntityPathBase<Assignee> {

    private static final long serialVersionUID = -428665316L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAssignee assignee = new QAssignee("assignee");

    public final DateTimePath<java.time.LocalDateTime> finishedAt = createDateTime("finishedAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.sharep.be.modules.issue.QIssue issue;

    public final com.sharep.be.modules.member.QMember member;

    public final DateTimePath<java.time.LocalDateTime> startedAt = createDateTime("startedAt", java.time.LocalDateTime.class);

    public final EnumPath<State> state = createEnum("state", State.class);

    public QAssignee(String variable) {
        this(Assignee.class, forVariable(variable), INITS);
    }

    public QAssignee(Path<? extends Assignee> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAssignee(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAssignee(PathMetadata metadata, PathInits inits) {
        this(Assignee.class, metadata, inits);
    }

    public QAssignee(Class<? extends Assignee> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.issue = inits.isInitialized("issue") ? new com.sharep.be.modules.issue.QIssue(forProperty("issue"), inits.get("issue")) : null;
        this.member = inits.isInitialized("member") ? new com.sharep.be.modules.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

