package com.francislainy.so.backend.service.impl.question;

import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.repository.question.QuestionRepository;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class QuestionQueryServiceImpl implements QuestionQueryService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public QuestionQueryDto getQuestionItem(UUID userId, UUID id) {

        if (questionRepository.findById(id).isPresent()) {
            QuestionEntity question = questionRepository.findById(id).get();

            return new QuestionQueryDto(question.getUserEntity().getId(), question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated());

        } else {
            return null;
        }

    }

    @Override
    public QuestionQueryDto getMyQuestionItem(UUID userId, UUID id) { // todo: I think we may not need this controller - 23/01/2020
        if (questionRepository.findById(id).get().getUserEntity().getId().equals(userId)) {

            if (questionRepository.findById(id).isPresent()) {
                QuestionEntity question = questionRepository.findById(id).get();

                return new QuestionQueryDto(question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated());

            } else {
                return null;
            }
        } else {
            return null; // todo: return 403 if not valid user - 23/01/2020
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

            questionList.add(new QuestionQueryDto(question.getId(), question.getTitle(), question.getDescription(), question.getCreationDate(), question.getLastUpdated()));

        });

        return questionList;
    }

}
