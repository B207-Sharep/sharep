package com.sharep.be.modules.api.controller;

import com.sharep.be.modules.api.ApiRequest.ApiUpdate;
import com.sharep.be.modules.api.service.ApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project/{projectId}/apis")
@RequiredArgsConstructor
@Slf4j
public class ApiController {

    private final ApiService apiService;

    /*
        TODO:
         (API 조회는 Issue 조회할 때 같이 제공)
         (API 생성은 요청을 보내지 않아도 생성)
         API 수정 구현
         API 삭제 구현
     */

    @PutMapping("/{apiId}")
    public ResponseEntity<Void> updateApi(@PathVariable Long projectId, @PathVariable Long apiId,
            @RequestBody @Valid ApiUpdate apiUpdate) {
        log.info("ApiController: Api 수정 - projectId: {}, apiId: {}, apiUpdate: {}", projectId,
                apiId, apiUpdate);

        apiService.updateApi(apiId, apiUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{apiId}")
    public ResponseEntity<Void> deleteApi(@PathVariable Long projectId, @PathVariable Long apiId) {
        log.info("ApiController: Api 삭제 - projectId: {}, apiId: {}", projectId, apiId);

        apiService.deleteApi(apiId);
        return ResponseEntity.ok().build();
    }


}
