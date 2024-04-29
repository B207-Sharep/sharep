package com.sharep.be.modules.issue;

import static com.sharep.be.modules.issue.IssueDto.IssueRequestDto;
import static com.sharep.be.modules.issue.IssueDto.IssueResponseDto;
import static com.sharep.be.modules.issue.IssueDto.toDto;
import static com.sharep.be.modules.issue.IssueDto.toEntity;

import com.sharep.be.modules.exception.IssueNotFoundException;
import com.sharep.be.modules.exception.ProjectNotFoundException;
import com.sharep.be.modules.project.Project;
import com.sharep.be.modules.project.ProjectRepository;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;

    @Override
    public void createIssue(IssueRequestDto issueRequestDto) {
        Project project = projectRepository.findById(issueRequestDto.getProjectId())
                .orElseThrow(ProjectNotFoundException::new);

        Issue issue = toEntity(issueRequestDto, project);
        issueRepository.save(issue);
    }

    @Override
    public List<IssueResponseDto> getIssues(Long projectId) {
        return issueRepository.findIssuesByProjectId(projectId).orElse(Collections.emptyList())
                .stream().map(IssueDto::toDto).toList();
    }

    @Override
    public IssueResponseDto getIssue(Long id) {
        return toDto(issueRepository.findById(id)
                .orElseThrow(IssueNotFoundException::new));
    }

    @Override
    public IssueResponseDto updateIssue(IssueRequestDto issueRequestDto) {
        return null;
    }

    @Override
    public IssueResponseDto deleteIssue(IssueRequestDto issueRequestDto) {
        return null;
    }
}
