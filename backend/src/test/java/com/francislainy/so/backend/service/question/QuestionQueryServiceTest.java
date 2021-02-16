package com.francislainy.so.backend.service.question;

import com.francislainy.so.backend.exceptions.WrongUserException;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.repository.question.QuestionRepository;
import com.francislainy.so.backend.repository.user.UserRepository;
import com.francislainy.so.backend.service.impl.question.QuestionQueryServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;

@RunWith(SpringRunner.class)
public class QuestionQueryServiceTest {

    @Mock
    QuestionRepository questionRepository;

    @Mock
    UserRepository userRepository;

    @MockBean
    private QuestionQueryService questionQueryService;

    @InjectMocks
    private QuestionQueryServiceImpl questionQueryServiceImpl;

    @Mock
    private QuestionQueryServiceImpl questionQueryServiceImplMock;

    @Test
    public void testQuestionItemFoundOnDb() {
        UUID questionId = UUID.fromString("05c903f7-7a55-470d-8449-cf7587f5a3fb");
        UUID userId = UUID.fromString("02c903f7-7a55-470d-8449-cf7587f5a3fb");

        Mockito.when(questionRepository.findById(questionId))
                .thenReturn(Optional.of(QuestionEntity.builder()
                        .id(questionId)
                        .userEntity(
                                UserEntity.builder()
                                        .id(userId)
                                        .build())
                        .build()));

        QuestionQueryDto questionQueryDto = questionQueryServiceImpl.getMyQuestionItem(userId, questionId);
        assertEquals(questionId, questionQueryDto.getId());
    }

    @Test
    public void testNoQuestionItemFoundOnDb() {
        UUID questionId = UUID.fromString("05c903f7-7a55-470d-8449-cf7587f5a3fb");
        UUID userId = UUID.fromString("02c903f7-7a55-470d-8449-cf7587f5a3fb");

        assertNull(questionQueryServiceImpl.getMyQuestionItem(userId, questionId));
    }

    @Test(expected = WrongUserException.class)
    public void testQuestionUserDoesNotMatchError() {
        UUID questionId = UUID.fromString("05c903f7-7a55-470d-8449-cf7587f5a3fb");
        UUID userId = UUID.fromString("02c903f7-7a55-470d-8449-cf7587f5a3fb");

        Mockito.when(questionRepository.findById(questionId))
                .thenReturn(Optional.of(QuestionEntity.builder()
                        .id(questionId)
                        .userEntity(
                                UserEntity.builder()
                                        .id(UUID.fromString("00000000-0000-0000-0000-000000000000"))
                                        .build())
                        .build()));

        questionQueryServiceImpl.getMyQuestionItem(userId, questionId);
    }

}
