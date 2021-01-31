package com.francislainy.so.backend.service.impl.answer;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.entity.answer.AnswerEntity;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.repository.answer.AnswerRepository;
import com.francislainy.so.backend.service.answer.AnswerQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AnswerQueryServiceImpl implements AnswerQueryService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public AnswerQueryDto getAnswerItem(UUID userId, UUID id) {

        if (answerRepository.findById(id).isPresent()) {
            AnswerEntity answerEntity = answerRepository.findById(id).get();

            QuestionEntity questionEntity = new QuestionEntity();
            questionEntity.setId(answerEntity.getQuestionEntity().getId());
            UserEntity userEntity = new UserEntity(userId);

            return new AnswerQueryDto(answerEntity.getId(), answerEntity.getCreationDate(), answerEntity.getContent(), questionEntity, userEntity);
        } else {
            return null;
        }

    }


    @Override
    public List<AnswerQueryDto> getAnswerList(UUID userId, UUID questionId) {

        List<AnswerQueryDto> answerList = new ArrayList<>();

        answerRepository.findAnswerEntityByQuestionEntityId(questionId).forEach(answer -> {
            QuestionEntity questionEntity = new QuestionEntity();
            questionEntity.setId(answer.getQuestionEntity().getId());
            UserEntity userEntity = new UserEntity(answer.getUserEntity().getId());

            answerList.add(new AnswerQueryDto(answer.getId(), answer.getCreationDate(), answer.getContent(), questionEntity, userEntity));
        });

        return answerList;
    }


    @Override
    public List<AnswerQueryDto> getMyAnswerList(UUID userId) {

        List<AnswerQueryDto> answerList = new ArrayList<>();

        answerRepository.findAll().forEach(answer -> {

            UUID userIdAnswer = answer.getUserEntity().getId();

            if (userIdAnswer.equals(userId)) {
                QuestionEntity questionEntity = new QuestionEntity();
                questionEntity.setId(answer.getQuestionEntity().getId());
                UserEntity userEntity = new UserEntity(answer.getUserEntity().getId());

                answerList.add(new AnswerQueryDto(answer.getId(), answer.getCreationDate(), answer.getContent(), questionEntity, userEntity));
            }

        });

        return answerList;
    }

}
