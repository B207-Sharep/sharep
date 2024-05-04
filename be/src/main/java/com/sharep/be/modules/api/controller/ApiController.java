package com.sharep.be.modules.api.controller;

import com.sharep.be.modules.api.ApiRequest.ApiCreate;
import com.sharep.be.modules.api.ApiRequest.ApiUpdate;
import com.sharep.be.modules.api.ApiResponse.ApiCreated;
import com.sharep.be.modules.api.service.ApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects/{projectId}/apis")
@RequiredArgsConstructor
@Slf4j
public class ApiController {

    private final ApiService apiService;

    /*
        TODO: API를 실수로 삭제했을 때 재생성할 수 있게 PostMapping 추가
            API가 이미 존재하면 안됨
     */
    @PostMapping
    public ResponseEntity<ApiCreated> createApi(@PathVariable Long projectId,
            @RequestBody @Valid ApiCreate apiCreate) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiCreated.from(apiService.createApi(apiCreate)));
    }

    @PutMapping("/{apiId}")
    public ResponseEntity<Void> updateApi(@PathVariable Long projectId, @PathVariable Long apiId,
            @RequestBody @Valid ApiUpdate apiUpdate) {

        apiService.updateApi(apiId, apiUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{apiId}")
    public ResponseEntity<Void> deleteApi(@PathVariable Long projectId, @PathVariable Long apiId) {

        apiService.deleteApi(apiId);
        return ResponseEntity.ok().build();
    }


}
