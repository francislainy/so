package com.francislainy.so.backend.service.impl.answer;

import com.francislainy.so.backend.dto.answer.AnswerCreateDto;
import com.francislainy.so.backend.entity.answer.AnswerEntity;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.repository.answer.AnswerRepository;
import com.francislainy.so.backend.repository.question.QuestionRepository;
import com.francislainy.so.backend.repository.user.UserRepository;
import com.francislainy.so.backend.service.answer.AnswerCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
public class AnswerCommandServiceImpl implements AnswerCommandService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public AnswerCreateDto createAnswer(UUID userId, UUID questionId, AnswerCreateDto answerCreateDto) {

        AnswerEntity answerEntity = new AnswerEntity();

        answerEntity.setContent(answerCreateDto.getContent());
        ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Europe/Dublin"));
        Timestamp timestamp = Timestamp.valueOf(zdt.toLocalDateTime());
        answerEntity.setCreationDate(timestamp.getTime());

        if (userRepository.findById(userId).isPresent()) {
            UserEntity userEntity = userRepository.findById(userId).get();
            answerEntity.setUserEntity(userEntity);
        }

        QuestionEntity questionEntity;
        QuestionEntity newQuestionEntity = null;
        if (questionRepository.findById(questionId).isPresent()) {
            questionEntity = questionRepository.findById(questionId).get();
            answerEntity.setQuestionEntity(questionEntity);

            newQuestionEntity = new QuestionEntity(questionEntity.getId());
        }

        answerRepository.save(answerEntity);

        return new AnswerCreateDto(answerEntity.getId(), answerEntity.getCreationDate(), answerEntity.getContent(), newQuestionEntity);
    }


    @Override
    public void deleteAnswer(UUID userId, UUID id) {

        if (answerRepository.findById(id).get().getUserEntity().getId().equals(userId)) {

            if (answerRepository.findById(id).isPresent()) {

                AnswerEntity answerEntity = answerRepository.findById(id).get();

                answerRepository.delete(answerEntity);

            }
        }
    }

}
