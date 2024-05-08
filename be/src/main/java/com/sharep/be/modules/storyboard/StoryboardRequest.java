package com.sharep.be.modules.storyboard;

import com.sharep.be.modules.issue.Issue;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record StoryboardRequest() {

    @Builder
    public record IssueConnect(@NotNull Long featureIssueId, @NotNull Long screenIssueId) {

        public Storyboard toEntityWith(Issue featureIssue, Issue screenIssue) {
            return Storyboard.builder()
                    .featureIssue(featureIssue)
                    .screenIssue(screenIssue)
                    .build();
        }

    }
}
