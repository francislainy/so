package com.francislainy.so.backend.service.question;

import com.francislainy.so.backend.dto.question.QuestionCreateDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface QuestionCommandService {

    QuestionCreateDto createQuestion(UUID userId, QuestionCreateDto questionCreateDto);

    QuestionCreateDto voteQuestion(UUID questionId, Integer voteType);

    void deleteQuestion(UUID userId, UUID id);

}
