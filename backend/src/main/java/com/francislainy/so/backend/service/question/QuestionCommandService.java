package com.francislainy.so.backend.service.question;

import com.francislainy.so.backend.dto.question.QuestionCreateDto;
import com.francislainy.so.backend.dto.question.QuestionFavouriteCreateDto;
import com.francislainy.so.backend.dto.question.QuestionUpdateDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface QuestionCommandService {

    QuestionCreateDto createQuestion(UUID userId, QuestionCreateDto questionCreateDto);

    QuestionUpdateDto updateQuestion(UUID userId, UUID questionId, QuestionUpdateDto questionUpdateDto);

    void deleteQuestion(UUID userId, UUID id);

    QuestionFavouriteCreateDto favouriteQuestion(UUID userId, QuestionFavouriteCreateDto questionFavouriteCreateDto);

    QuestionCreateDto voteQuestion(UUID questionId, Integer voteType);

}
