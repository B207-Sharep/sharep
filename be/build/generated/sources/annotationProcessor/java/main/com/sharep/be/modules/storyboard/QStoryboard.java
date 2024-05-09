package com.sharep.be.modules.storyboard;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStoryboard is a Querydsl query type for Storyboard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStoryboard extends EntityPathBase<Storyboard> {

    private static final long serialVersionUID = -251083508L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStoryboard storyboard = new QStoryboard("storyboard");

    public final com.sharep.be.modules.issue.QIssue featureIssue;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.sharep.be.modules.issue.QIssue screenIssue;

    public QStoryboard(String variable) {
        this(Storyboard.class, forVariable(variable), INITS);
    }

    public QStoryboard(Path<? extends Storyboard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStoryboard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStoryboard(PathMetadata metadata, PathInits inits) {
        this(Storyboard.class, metadata, inits);
    }

    public QStoryboard(Class<? extends Storyboard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.featureIssue = inits.isInitialized("featureIssue") ? new com.sharep.be.modules.issue.QIssue(forProperty("featureIssue"), inits.get("featureIssue")) : null;
        this.screenIssue = inits.isInitialized("screenIssue") ? new com.sharep.be.modules.issue.QIssue(forProperty("screenIssue"), inits.get("screenIssue")) : null;
    }

}

