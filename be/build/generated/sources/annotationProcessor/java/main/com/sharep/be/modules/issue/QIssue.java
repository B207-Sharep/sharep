package com.sharep.be.modules.issue;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIssue is a Querydsl query type for Issue
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIssue extends EntityPathBase<Issue> {

    private static final long serialVersionUID = -2034494526L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QIssue issue = new QIssue("issue");

    public final com.sharep.be.modules.api.QApi api;

    public final SetPath<com.sharep.be.modules.assignee.domain.Assignee, com.sharep.be.modules.assignee.domain.QAssignee> assignees = this.<com.sharep.be.modules.assignee.domain.Assignee, com.sharep.be.modules.assignee.domain.QAssignee>createSet("assignees", com.sharep.be.modules.assignee.domain.Assignee.class, com.sharep.be.modules.assignee.domain.QAssignee.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final StringPath epic = createString("epic");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath issueName = createString("issueName");

    public final SetPath<com.sharep.be.modules.job.domain.Job, com.sharep.be.modules.job.domain.QJob> jobs = this.<com.sharep.be.modules.job.domain.Job, com.sharep.be.modules.job.domain.QJob>createSet("jobs", com.sharep.be.modules.job.domain.Job.class, com.sharep.be.modules.job.domain.QJob.class, PathInits.DIRECT2);

    public final EnumPath<com.sharep.be.modules.issue.type.PriorityType> priority = createEnum("priority", com.sharep.be.modules.issue.type.PriorityType.class);

    public final com.sharep.be.modules.project.QProject project;

    public final SetPath<com.sharep.be.modules.storyboard.Storyboard, com.sharep.be.modules.storyboard.QStoryboard> storyboards = this.<com.sharep.be.modules.storyboard.Storyboard, com.sharep.be.modules.storyboard.QStoryboard>createSet("storyboards", com.sharep.be.modules.storyboard.Storyboard.class, com.sharep.be.modules.storyboard.QStoryboard.class, PathInits.DIRECT2);

    public final EnumPath<com.sharep.be.modules.issue.type.IssueType> type = createEnum("type", com.sharep.be.modules.issue.type.IssueType.class);

    public QIssue(String variable) {
        this(Issue.class, forVariable(variable), INITS);
    }

    public QIssue(Path<? extends Issue> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QIssue(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QIssue(PathMetadata metadata, PathInits inits) {
        this(Issue.class, metadata, inits);
    }

    public QIssue(Class<? extends Issue> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.api = inits.isInitialized("api") ? new com.sharep.be.modules.api.QApi(forProperty("api"), inits.get("api")) : null;
        this.project = inits.isInitialized("project") ? new com.sharep.be.modules.project.QProject(forProperty("project"), inits.get("project")) : null;
    }

}

