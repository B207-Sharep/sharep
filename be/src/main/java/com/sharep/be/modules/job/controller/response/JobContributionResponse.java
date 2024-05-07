package com.sharep.be.modules.job.controller.response;

import com.sharep.be.modules.job.domain.Job;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

public record JobContributionResponse() {

    public static SortedMap<String, Integer> from(List<Job> jobs){

        SortedMap<String, Integer> response = new TreeMap<>();

        LocalDate todayLocalDate = LocalDateTime.now().toLocalDate();

        for(int i = 0; i < 30; i++){
            String todayString = todayLocalDate.minusDays(i).toString();

            response.put(todayString, 0);
        }

        jobs.forEach(job -> {
                    String date = job.getCreatedAt().toLocalDate().toString();

                    if(!response.containsKey(date)) return;

                    Integer now = response.get(date);
                    response.put(date, now + 1);
                }
        );

        return response;
    }

}
