package com.sharep.be.modules.assignee;

import static io.jsonwebtoken.lang.Assert.*;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.dto.AccountDto;
import com.sharep.be.modules.assignee.response.AssigneeIdResponse;
import com.sharep.be.modules.assignee.response.AssigneeProjectNowIssueResponse;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.security.JwtAuthentication;
import io.jsonwebtoken.lang.Assert;
import jakarta.validation.constraints.Min;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    public ResponseEntity<List<AssigneeProjectNowIssueResponse>> readProjectNowIssue(
            @PathVariable @Min(1) Long projectId
    ){

        return ResponseEntity.ok(
                assigneeService.readProjectNowIssue(projectId)
                        .stream()
                        .map(tuple -> {
                            Account account = tuple.get(2, Account.class);
                            Issue issue = tuple.get(0, Issue.class);

                            notNull(account);
                            notNull(issue);

                            return new AssigneeProjectNowIssueResponse(AccountDto.toDto(account), issue.toResponse());
                        })
                        .toList()
        );
    }


    // 본인 진행 이슈 조회
    @GetMapping("/projects/{projectId}/own/issues")
    public ResponseEntity<List<AssigneeProjectNowIssueResponse>> readProjectNowOwnIssue(
            @AuthenticationPrincipal JwtAuthentication authentication,
            @PathVariable @Min(1) Long projectId
    ){

        return ResponseEntity.ok(
                assigneeService.readProjectNowOwnIssue(projectId, authentication.id)
                        .stream()
                        .map(tuple -> {
                            Account account = tuple.get(2, Account.class);
                            Issue issue = tuple.get(0, Issue.class);

                            notNull(account);
                            notNull(issue);

                            return new AssigneeProjectNowIssueResponse(AccountDto.toDto(account), issue.toResponse());
                        })
                        .toList()
        );
    }

}
