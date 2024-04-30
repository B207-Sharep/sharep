package com.sharep.be.modules.project;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long>, ProjectRepositoryCustom{
    @EntityGraph(attributePaths = "leader")
    Optional<Project> findWithLeaderById(Long projectId);

    @EntityGraph(attributePaths = {"leader", "members"})
    Optional<Project> findWithLeaderAndMembersById(Long projectId);


}