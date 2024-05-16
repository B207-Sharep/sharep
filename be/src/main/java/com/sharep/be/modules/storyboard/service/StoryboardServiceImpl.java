package com.sharep.be.modules.storyboard.service;

import static org.springframework.util.Assert.isNull;
import static org.springframework.util.Assert.isTrue;

import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.exception.StoryboardNotFoundException;
import com.sharep.be.modules.issue.Issue;
import com.sharep.be.modules.issue.repository.IssueRepository;
import com.sharep.be.modules.issue.type.IssueType;
import com.sharep.be.modules.storyboard.Storyboard;
import com.sharep.be.modules.storyboard.StoryboardRequest.IssueConnect;
import com.sharep.be.modules.storyboard.repository.StoryboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StoryboardServiceImpl implements StoryboardService {

    private final StoryboardRepository storyboardRepository;
    private final IssueRepository issueRepository;

    @Override
    public Storyboard connectIssue(IssueConnect issueConnect) {
        Issue featureIssue = issueRepository.findById(issueConnect.featureIssueId())
                .orElseThrow(IssueNotFoundException::new);

        Issue screenIssue = issueRepository.findById(issueConnect.screenIssueId())
                .orElseThrow(IssueNotFoundException::new);

        isTrue(featureIssue.getType().equals(IssueType.FEATURE), "이슈 타입이 맞지 않습니다.");
        isTrue(screenIssue.getType().equals(IssueType.SCREEN), "이슈 타입이 맞지 않습니다.");

        isNull(storyboardRepository.findByFeatureIssueIdAndScreenIssueId(
                issueConnect.featureIssueId(), issueConnect.screenIssueId()), "이미 연결된 이슈입니다.");

        Storyboard storyboard = storyboardRepository.save(
                issueConnect.toEntityWith(featureIssue, screenIssue));

        featureIssue.getFeatureStoryboards().add(storyboard);
        screenIssue.getFeatureStoryboards().add(storyboard);

        return storyboard;
    }

    @Override
    public void disconnectIssue(Long connectionId) {
        Storyboard storyboard = storyboardRepository.findById(connectionId)
                .orElseThrow(StoryboardNotFoundException::new);

        storyboardRepository.deleteById(storyboard.getId());
    }
}
