package com.sharep.be.modules.assignee;

import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.security.JwtAuthentication;
import jakarta.validation.constraints.Min;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AssigneeController {

    private final AssigneeService assigneeService;


    // 이슈 상태 변경
    @PatchMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> updateState(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId,
            @RequestBody Map<String, State> request
    ) {

        assigneeService.update(authentication.id, projectId, issueId, request.get("state"));

        return ResponseEntity.noContent().build();
    }

    // 이슈 담당자 생성
    @PostMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> createAssignee(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId
    ){

        assigneeService.create(authentication.id, projectId, issueId);

        return ResponseEntity.noContent().build();
    }


    // 이슈 담당자 삭제
    @DeleteMapping("/projects/{projectId}/issues/{issueId}/assignees")
    public ResponseEntity<Void> deleteAssignee(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable Long projectId,
            @PathVariable Long issueId
    ){

        assigneeService.delete(authentication.id, projectId, issueId);

        return ResponseEntity.noContent().build();
    }

    // 팀 페이지 - 팀원별 진행 이슈 조회
    @GetMapping("/projects/{projectsId}/issues")
    public ResponseEntity<?> readProjectNowIssue(
            @PathVariable @Min(1) Long projectsId
    ){

        List<Issue> result = assigneeService.readProjectNowIssue(projectsId);

        return ResponseEntity.ok(result);
    }


}
