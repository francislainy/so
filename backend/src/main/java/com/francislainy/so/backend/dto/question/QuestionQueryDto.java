package com.francislainy.so.backend.dto.question;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class QuestionQueryDto {

    private UUID userId;
    private UUID id;
    private String title;
    private String description;
    private Long creationDate;
    private Long lastUpdated;
    private Integer totalDownVotes;
    private Integer totalUpVotes;
    private Integer totalVotes;

    public QuestionQueryDto(UUID id, String title, String description, Long creationDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
    }

    public QuestionQueryDto(UUID id, String title, String description, Long creationDate, Long lastUpdated) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
    }

    public QuestionQueryDto(UUID userId, UUID id, String title, String description, Long creationDate, Long lastUpdated) {

        this.userId = userId;
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
    }
}
