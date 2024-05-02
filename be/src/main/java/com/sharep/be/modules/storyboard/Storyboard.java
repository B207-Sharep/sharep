package com.sharep.be.modules.storyboard;

import com.sharep.be.modules.issue.Issue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Storyboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "screen_issue_id")
    private Issue screenIssue;

    @ManyToOne
    @JoinColumn(name = "feature_issue_id")
    private Issue featureIssue;
}
