package com.sharep.be.modules.job.controller.response;

import com.sharep.be.modules.job.domain.Job;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

public record JobContributionResponse() {

    public static SortedMap<String, Integer> from(List<Job> jobs){

        SortedMap<String, Integer> response = new TreeMap<>();

        jobs.forEach(job -> {
                    String date = String.valueOf(job.getCreatedAt().toLocalDate());
                    Integer now = response.getOrDefault(date, 0);
                    response.put(date, now + 1);
                }
        );

        return response;
    }

}
