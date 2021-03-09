package com.francislainy.so.backend.dto.question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuestionFavouriteCreateDto {

    private UUID questionId;
    private boolean favourite;

}
