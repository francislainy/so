package com.francislainy.so.backend.dto.question;

import com.francislainy.so.backend.entity.answer.AnswerEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuestionUpdateDto {

    private UUID userId;
    private UUID id;
    private String title;
    private String description;
    private Long creationDate;
    private Long lastUpdated;

    private List<AnswerEntity> answers;

    public QuestionUpdateDto(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public QuestionUpdateDto(UUID id, String title, String description, Long creationDate, Long lastUpdated) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
    }
}
