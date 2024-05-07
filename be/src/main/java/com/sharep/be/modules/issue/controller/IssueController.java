package com.sharep.be.modules.issue.controller;

import com.sharep.be.modules.issue.IssueRequest.IssueCreate;
import com.sharep.be.modules.issue.IssueRequest.IssueUpdate;
import com.sharep.be.modules.issue.IssueResponse;
import com.sharep.be.modules.issue.IssueResponse.FeatureIssueResponse;
import com.sharep.be.modules.issue.IssueResponse.IssueCreated;
import com.sharep.be.modules.issue.IssueResponse.KanbanIssueResponse;
import com.sharep.be.modules.issue.IssueResponse.ScreenIssueResponse;
import com.sharep.be.modules.issue.IssueResponse.SimpleIssueResponse;
import com.sharep.be.modules.issue.service.IssueService;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects/{projectId}/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @GetMapping("/kanban")
    public ResponseEntity<List<KanbanIssueResponse>> getKanbanIssues(@PathVariable Long projectId,
            @RequestParam Optional<Long> accountId,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {

        return ResponseEntity.ok(
                issueService.getKanbanIssues(projectId, accountId.orElse(jwtAuthentication.id))
                        .stream().map(KanbanIssueResponse::from).toList());
    }

    @GetMapping("/feature")
    public ResponseEntity<List<FeatureIssueResponse>> getFeatureIssues(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                issueService.getFeatureIssues(projectId).stream().map(FeatureIssueResponse::from)
                        .toList());
    }

    /* NOTE:
        ScreenIssueResponse 데이터 변경될 수 있음
     */

    @GetMapping("/screen")
    public ResponseEntity<?> getScreenIssues(@PathVariable Long projectId) {

        return ResponseEntity.ok(
                issueService.getScreenIssues(projectId).stream().map(ScreenIssueResponse::from)
                        .toList());
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<IssueResponse> getIssue(@PathVariable Long issueId,
            @PathVariable Long projectId) {

        return ResponseEntity.ok(IssueResponse.from(issueService.getIssue(issueId)));
    }

    @GetMapping
    public ResponseEntity<List<SimpleIssueResponse>> getIssues(@PathVariable Long projectId) {

        return ResponseEntity.ok(
                issueService.getIssues(projectId).stream().map(SimpleIssueResponse::from).toList());
    }

    @PostMapping
    private ResponseEntity<IssueCreated> createIssue(@PathVariable Long projectId,
            @RequestBody @Valid IssueCreate issueCreate,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {

        return ResponseEntity.status(HttpStatus.CREATED).body(IssueCreated.from(
                issueService.createIssue(projectId, jwtAuthentication.id, issueCreate)));
    }


    @PutMapping("/{issueId}")
    private ResponseEntity<Void> updateIssue(@PathVariable Long projectId,
            @PathVariable Long issueId, @RequestBody IssueUpdate issueUpdate,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {
        issueService.updateIssue(issueId, jwtAuthentication.id, projectId, issueUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{issueId}")
    private ResponseEntity<Void> deleteIssue(@PathVariable Long projectId,
            @PathVariable Long issueId,
            @AuthenticationPrincipal JwtAuthentication jwtAuthentication) {

        issueService.deleteIssue(issueId, jwtAuthentication.id, projectId);
        return ResponseEntity.ok().build();
    }

}
