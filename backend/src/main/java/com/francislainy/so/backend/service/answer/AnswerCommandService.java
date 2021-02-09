package com.francislainy.so.backend.service.answer;

import com.francislainy.so.backend.dto.answer.AnswerCreateDto;
import com.francislainy.so.backend.dto.answer.AnswerUpdateDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface AnswerCommandService {

    AnswerCreateDto createAnswer(UUID userId, UUID questionId, AnswerCreateDto answerCreateDto);

    void deleteAnswer(UUID userId, UUID id);

    AnswerUpdateDto updateAnswer(UUID userId, UUID questionId, UUID answerId, AnswerUpdateDto answerUpdateDto);
}
