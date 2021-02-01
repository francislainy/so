package com.francislainy.so.backend.dto.answer;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnswerQueryDto {

    private UUID id;
    private Long creationDate;
    private String content;
    private UUID userId;

    @SerializedName("question")
    @JsonProperty("question")
    private QuestionEntity questionEntity;

    @SerializedName("user")
    @JsonProperty("user")
    private UserEntity userEntity;

    public AnswerQueryDto(UUID id, Long creationDate, String content, QuestionEntity questionEntity, UserEntity userEntity) {
        this.id = id;
        this.creationDate = creationDate;
        this.content = content;
        this.questionEntity = questionEntity;
        this.userEntity = userEntity;
    }

    public AnswerQueryDto(Long creationDate, String content) {
        this.creationDate = creationDate;
        this.content = content;
    }

    public AnswerQueryDto(UUID id, Long creationDate, String content) {
        this.id = id;
        this.creationDate = creationDate;
        this.content = content;
    }

    public AnswerQueryDto(String content) {
        this.content = content;
    }

}
