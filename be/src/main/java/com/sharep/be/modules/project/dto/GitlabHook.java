package com.sharep.be.modules.project.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
public class GitlabHook {
    private String objectKind;
    private String eventName;
    private String before;
    private String after;
    private String ref;
    private boolean refProtected;
    private String checkoutSha;
    private String message;
    private Long userId;
    private String userName;
    private String userUsername;
    private String userEmail;
    private String userAvatar;
    private Long projectId;
    private Project project;
    private List<Commit> commits;
    private Integer totalCommitsCount;
    private Repository repository;

    // Getters and Setters
    @Getter
    @Setter
    public static class Commit {
        private String id;
        private String message;
        private String title;
        private String timestamp;
        private String url;
        private Author author;
        private List<String> added;
        private List<String> modified;
        private List<String> removed;

        // Getters and Setters
    }

    @Getter
    @Setter
    @ToString
    public static class Author {
        private String name;
        private String email;

        // Getters and Setters
    }

    @Getter
    @Setter
    public static class Project {
        private Long id;
        private String name;
        private String description;
        private String webUrl;
        private String avatarUrl;
        private String gitSshUrl;
        private String gitHttpUrl;
        private String namespace;
        private Integer visibilityLevel;
        private String pathWithNamespace;
        private String defaultBranch;
        private String ciConfigPath;
        private String homepage;
        private String url;
        private String sshUrl;
        private String httpUrl;

        // Getters and Setters
    }

    @Getter
    @Setter
    public static class Repository {
        private String name;
        private String url;
        private String description;
        private String homepage;
        private String gitHttpUrl;
        private String gitSshUrl;
        private Integer visibilityLevel;
    }
}
