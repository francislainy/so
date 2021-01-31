package com.francislainy.so.backend.dto.question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuestionCreateDto {

    private UUID id;
    private String title;
    private Long creationDate;
    private String description;
//    private Integer totalDownVotes;
//    private Integer totalUpVotes;
//    private Integer totalVotes;
    private UUID userId;

    public QuestionCreateDto(String title, Long creationDate) {
        this.title = title;
        this.creationDate = creationDate;
    }

    public QuestionCreateDto(UUID id, String title, Long creationDate) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
    }

    public QuestionCreateDto(String title, Long creationDate, String description) {
        this.title = title;
        this.creationDate = creationDate;
        this.description = description;
    }

//    public QuestionCreateDto(UUID id, String title, Integer totalDownVotes, Integer totalUpVotes, Integer totalVotes) {
//        this.id = id;
//        this.title = title;
//        this.totalDownVotes = totalDownVotes;
//        this.totalUpVotes = totalUpVotes;
//        this.totalVotes = totalVotes;
//    }

    public QuestionCreateDto(UUID id, String title, Long creationDate, String description) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.description = description;
    }

    public QuestionCreateDto(String title, Long creationDate, String description, UUID userId) {
        this.title = title;
        this.creationDate = creationDate;
        this.description = description;
        this.userId = userId;
    }

}
