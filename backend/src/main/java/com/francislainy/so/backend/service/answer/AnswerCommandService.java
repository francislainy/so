package com.francislainy.so.backend.service.answer;

import com.francislainy.so.backend.dto.answer.AnswerCreateDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface AnswerCommandService {

    AnswerCreateDto createAnswer(UUID userId, UUID questionId, AnswerCreateDto answerCreateDto);

    void deleteAnswer(UUID userId, UUID id);
}
