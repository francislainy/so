package com.francislainy.so.backend.dto.question;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class QuestionQueryDto {

    private UUID userId;
    private UUID id;
    private String title;
    private String description;
    private Long creationDate;
    private Long lastUpdated;

    private List<AnswerQueryDto> answers;


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

    public QuestionQueryDto(UUID id, String title, String description, Long creationDate, Long lastUpdated, List answers) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
        this.answers = answers;
    }
}
