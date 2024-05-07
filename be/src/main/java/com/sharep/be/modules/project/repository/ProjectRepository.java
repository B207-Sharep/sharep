package com.sharep.be.modules.project.repository;

import com.sharep.be.modules.project.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, ProjectRepositoryCustom{
    @EntityGraph(attributePaths = "leader")
    Optional<Project> findWithLeaderById(Long projectId);

    @EntityGraph(attributePaths = {"leader", "members"})
    Optional<Project> findWithLeaderAndMembersById(Long projectId);


}
