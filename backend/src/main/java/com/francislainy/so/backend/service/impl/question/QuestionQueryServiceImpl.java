package com.francislainy.so.backend.service.impl.question;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.exceptions.WrongUserException;
import com.francislainy.so.backend.repository.answer.AnswerRepository;
import com.francislainy.so.backend.repository.question.QuestionRepository;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuestionQueryServiceImpl implements QuestionQueryService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public QuestionQueryDto getQuestionItem(UUID userId, UUID id) {

        if (questionRepository.findById(id).isPresent()) {
            QuestionEntity question = questionRepository.findById(id).get();

            List<AnswerQueryDto> answerList = new ArrayList<>();
            answerRepository.findAnswerEntityByQuestionEntityId(question.getId()).forEach(answerEntity -> {

                answerList.add(new AnswerQueryDto(answerEntity.getId(), answerEntity.getCreationDate(), answerEntity.getContent()));
            });

            return new QuestionQueryDto(question.getUserEntity().getId(), question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated(), answerList);

        } else {
            return null;
        }

    }


    @Override
    public QuestionQueryDto getMyQuestionItem(UUID userId, UUID id) { // todo: I think we may not need this controller - 23/01/2020
        Optional<QuestionEntity> questionEntityOptional = questionRepository.findById(id);
        if (questionRepository.findById(id).isPresent()) {
            QuestionEntity question = questionEntityOptional.get();

            if (!userId.equals(question.getUserEntity().getId())) {
                throw new WrongUserException();
            }

            return new QuestionQueryDto(question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated());
        } else {
            return null; //404
        }
    }


    @Override
    public List<QuestionQueryDto> getMyQuestionList(UUID userId) {

        List<QuestionQueryDto> questionList = new ArrayList<>();

        questionRepository.findAll().forEach(question -> {

            if (question.getUserEntity().getId().equals(userId)) {

                questionList.add(new QuestionQueryDto(question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated()));

            }

        });

        return questionList;
    }


    @Override
    public List<QuestionQueryDto> getQuestionList(UUID userId) {
        List<QuestionQueryDto> questionList = new ArrayList<>();

        questionRepository.findAll().forEach(question -> {

            List<AnswerQueryDto> answerList = new ArrayList<>();

            answerRepository.findAnswerEntityByQuestionEntityId(question.getId()).forEach(answerEntity -> {

                answerList.add(new AnswerQueryDto(answerEntity.getId(), answerEntity.getCreationDate(), answerEntity.getContent()));
            });


            questionList.add(new QuestionQueryDto(question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated(), answerList));

        });

        return questionList;
    }

}
