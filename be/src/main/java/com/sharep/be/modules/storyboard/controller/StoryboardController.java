package com.sharep.be.modules.storyboard.controller;

import com.sharep.be.modules.storyboard.StoryboardRequest.IssueConnect;
import com.sharep.be.modules.storyboard.StoryboardResponse.IssueConnected;
import com.sharep.be.modules.storyboard.service.StoryboardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/projects/{projectId}/issues")
public class StoryboardController {

    private final StoryboardService storyboardService;

    @PostMapping("/connect")
    private ResponseEntity<IssueConnected> connectIssue(@PathVariable Long projectId,
            @RequestBody @Valid IssueConnect issueConnect) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(IssueConnected.from(storyboardService.connectIssue(issueConnect)));
    }

    @DeleteMapping("/disconnect/{connectionId}")
    private ResponseEntity<Void> disconnectIssue(@PathVariable Long projectId,
            @PathVariable Long connectionId) {

        storyboardService.disconnectIssue(connectionId);
        return ResponseEntity.noContent().build();
    }
}
