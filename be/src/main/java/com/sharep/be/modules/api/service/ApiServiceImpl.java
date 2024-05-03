package com.sharep.be.modules.api.service;

import com.sharep.be.modules.api.Api;
import com.sharep.be.modules.api.ApiRequest.ApiUpdate;
import com.sharep.be.modules.api.repository.ApiRepository;
import com.sharep.be.modules.exception.ApiNotFoundException;
import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {

    private final ApiRepository apiRepository;
    private final IssueRepository issueRepository;

    @Override
    public void updateApi(Long apiId, ApiUpdate apiUpdate) {
        Api api = apiRepository.findById(apiId).orElseThrow(ApiNotFoundException::new);
        apiRepository.save(api.from(apiUpdate));
    }

    @Override
    public void deleteApi(Long apiId) {
        Issue issue = issueRepository.findById(apiId).orElseThrow(IssueNotFoundException::new);
        Api api = issue.getApi();

        issueRepository.save(issue.deleteApi());
        apiRepository.delete(api);
    }
}
