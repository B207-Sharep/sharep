package com.sharep.be.modules.project;

import static com.sharep.be.modules.project.dto.ProjectDto.*;

import com.sharep.be.modules.account.Account;
import com.sharep.be.modules.account.AccountRepository;
import com.sharep.be.modules.project.dto.ProjectDto.ProjectRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final AccountRepository accountRepository;


    public void saveProject(@Valid ProjectRequestDto projectRequestDto, Long accountId){
        Account account = accountRepository.findById(accountId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 사용자입니다."));

        projectRepository.save(convertSave(projectRequestDto, account));
    }


}
