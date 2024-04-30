package com.sharep.be.modules.assignee;

import com.sharep.be.modules.security.JwtAuthentication;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AssigneeController {

    private final AssigneeService assigneeService;


    @PatchMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> updateState(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId,
            @RequestBody Map<String, State> request
    ) {

        assigneeService.update(authentication.id, projectId, issueId, request.get("state"));

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> create(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId
    ){

        assigneeService.create(authentication.id, projectId, issueId);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @DeleteMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId
    ){

        assigneeService.delete(authentication.id, projectId, issueId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
