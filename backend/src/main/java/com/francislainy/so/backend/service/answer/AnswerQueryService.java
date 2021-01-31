package com.francislainy.so.backend.service.answer;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface AnswerQueryService {

    AnswerQueryDto getAnswerItem(UUID userId, UUID id);

    List<AnswerQueryDto> getAnswerList(UUID userId, UUID questionId);

    List<AnswerQueryDto> getMyAnswerList(UUID userId);
}
