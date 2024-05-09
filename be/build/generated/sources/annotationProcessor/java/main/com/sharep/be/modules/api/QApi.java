package com.sharep.be.modules.api;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QApi is a Querydsl query type for Api
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QApi extends EntityPathBase<Api> {

    private static final long serialVersionUID = -294374524L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QApi api = new QApi("api");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.sharep.be.modules.issue.QIssue issue;

    public final EnumPath<com.sharep.be.modules.api.type.MethodType> method = createEnum("method", com.sharep.be.modules.api.type.MethodType.class);

    public final StringPath request = createString("request");

    public final StringPath response = createString("response");

    public final StringPath url = createString("url");

    public QApi(String variable) {
        this(Api.class, forVariable(variable), INITS);
    }

    public QApi(Path<? extends Api> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QApi(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QApi(PathMetadata metadata, PathInits inits) {
        this(Api.class, metadata, inits);
    }

    public QApi(Class<? extends Api> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.issue = inits.isInitialized("issue") ? new com.sharep.be.modules.issue.QIssue(forProperty("issue"), inits.get("issue")) : null;
    }

}

