package com.sharep.be.modules.storyboard;

import lombok.Builder;

@Builder
public record StoryboardResponse(Long id) {

    public static StoryboardResponse from(Storyboard storyboard) {
        return StoryboardResponse.builder()
                .id(storyboard.getId())
                .build();
    }


    @Builder
    public record IssueConnected(Long id) {

        public static IssueConnected from(Storyboard storyboard) {
            return IssueConnected.builder()
                    .id(storyboard.getId())
                    .build();
        }
    }
}
