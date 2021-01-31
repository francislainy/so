package com.francislainy.so.backend.service.question;

import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface QuestionQueryService {

    QuestionQueryDto getQuestionItem(UUID userId, UUID id);

    QuestionQueryDto getMyQuestionItem(UUID userId, UUID id);

    List<QuestionQueryDto> getQuestionList(UUID userId);

    List<QuestionQueryDto> getMyQuestionList(UUID userId);
}
