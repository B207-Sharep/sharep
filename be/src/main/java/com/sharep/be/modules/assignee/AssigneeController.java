package com.sharep.be.modules.assignee;

import com.sharep.be.modules.assignee.response.AssigneeIdResponse;
import com.sharep.be.modules.issue.Issue;
import jakarta.validation.constraints.Min;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PatchMapping("/projects/{projectId}/issues/{issueId}/accounts/{accountId}/assignees")
    public ResponseEntity<AssigneeIdResponse> updateState(
            @PathVariable @Min(1) Long projectId,
            @PathVariable @Min(1) Long issueId,
            @PathVariable @Min(1) Long accountId,
            @RequestBody Map<String, State> request
    ) {

        if(!request.containsKey("state")){
            throw new RuntimeException("상태값을 입력하지 않았습니다.");
        }

        Long assigneeId = assigneeService.update(accountId, projectId, issueId, request.get("state"));

        return ResponseEntity.ok(
                new AssigneeIdResponse(assigneeId)
        );
    }

    // 이슈 담당자 생성
    // TODO 권한 확인 필요
    @PostMapping("/projects/{projectId}/issues/{issueId}/accounts/{accountId}/assignees")
    public ResponseEntity<AssigneeIdResponse> createAssignee(
            @PathVariable @Min(1) Long projectId,
            @PathVariable @Min(1) Long issueId,
            @PathVariable @Min(1) Long accountId
    ){

        Long assigneeId = assigneeService.create(projectId, issueId, accountId);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AssigneeIdResponse(assigneeId)
        );
    }


    // 이슈 담당자 삭제
    // TODO 권한확인 필요
    @DeleteMapping("/projects/{projectId}/issues/{issueId}/accounts/{accountId}/assignees")
    public ResponseEntity<AssigneeIdResponse> deleteAssignee(
            @PathVariable @Min(1) Long projectId,
            @PathVariable @Min(1) Long issueId,
            @PathVariable @Min(1) Long accountId
    ){

        Long assigneeId = assigneeService.delete(projectId, issueId, accountId);

        return ResponseEntity.ok(
                new AssigneeIdResponse(assigneeId)
        );
    }

    // 팀 페이지 - 팀원별 진행 이슈 조회
    @GetMapping("/projects/{projectId}/issues")
    public ResponseEntity<List<Issue>> readProjectNowIssue(
            @PathVariable @Min(1) Long projectId
    ){

        List<Issue> result = assigneeService.readProjectNowIssue(projectId);

        System.out.println(1);
        System.out.println(result.size());
        if (!result.isEmpty()){
            System.out.println(result.get(0).getIssueName());
        }
        return ResponseEntity.ok(result);
    }


}
