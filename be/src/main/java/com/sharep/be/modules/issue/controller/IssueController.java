package com.sharep.be.modules.issue.controller;

import com.sharep.be.modules.issue.IssueCreate;
import com.sharep.be.modules.issue.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueUpdate;
import com.sharep.be.modules.issue.service.IssueService;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{projectId}")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @GetMapping("/issues")
    public ResponseEntity<List<IssueResponse>> getIssues(@PathVariable Long projectId) {
        return ResponseEntity.ok(issueService.getIssues(projectId));
    }

    @GetMapping("/issues/private")
    public ResponseEntity<List<IssueResponse>> getPrivateIssues(@PathVariable Long projectId,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {

        return ResponseEntity.ok(issueService.getPrivateIssues(projectId, jwtAuthentication.id));
    }

    @GetMapping("/issues/{issueId}")
    public ResponseEntity<IssueResponse> getIssue(@PathVariable Long issueId,
            @PathVariable Long projectId) {
        return ResponseEntity.ok(issueService.getIssue(issueId));
    }

    @PostMapping("/issues")
    private ResponseEntity<IssueCreated> createIssue(@PathVariable Long projectId,
            @RequestBody @Valid IssueCreate issueCreate) {
        IssueCreated created = issueService.createIssue(projectId, issueCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


    @PutMapping("/issues")
    private ResponseEntity<Void> updateIssue(@PathVariable Long projectId,
            @RequestBody IssueUpdate issueUpdate) {
        issueService.updateIssue(issueUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/issues/{issueId}")
    private ResponseEntity<Void> deleteIssue(@PathVariable Long projectId,
            @PathVariable Long issueId) {
        issueService.deleteIssue(issueId);
        return ResponseEntity.ok().build();
    }

}
