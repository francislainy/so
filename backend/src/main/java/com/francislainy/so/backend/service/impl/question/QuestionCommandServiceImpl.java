package com.francislainy.so.backend.service.impl.question;

import com.francislainy.so.backend.dto.question.QuestionCreateDto;
import com.francislainy.so.backend.dto.question.QuestionUpdateDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.repository.question.QuestionRepository;
import com.francislainy.so.backend.repository.user.UserRepository;
import com.francislainy.so.backend.service.question.QuestionCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
public class QuestionCommandServiceImpl implements QuestionCommandService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public QuestionCreateDto createQuestion(UUID userId, QuestionCreateDto questionCreateDto) {

        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setTitle(questionCreateDto.getTitle());
        questionEntity.setDescription(questionCreateDto.getDescription());

        ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Europe/Dublin"));
        Timestamp timestamp = Timestamp.valueOf(zdt.toLocalDateTime());
        questionEntity.setCreationDate(timestamp.getTime());

        if (userRepository.findById(userId).isPresent()) {
            UserEntity userEntity = userRepository.findById(userId).get();
            questionEntity.setUserEntity(userEntity);
        }

        questionRepository.save(questionEntity);

        return new QuestionCreateDto(questionEntity.getId(), questionEntity.getTitle(), questionEntity.getCreationDate(), questionEntity.getDescription());

    }


    @Override
    public QuestionUpdateDto updateQuestion(UUID userId, UUID questionId, QuestionUpdateDto questionUpdateDto) {

        if (questionRepository.findById(questionId).isPresent()) {

            QuestionEntity existingQuestion = questionRepository.findById(questionId).get();

            existingQuestion.setTitle(questionUpdateDto.getTitle() + "gnf");
            existingQuestion.setDescription(questionUpdateDto.getDescription());
            ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Europe/Dublin"));
            Timestamp timestamp = Timestamp.valueOf(zdt.toLocalDateTime());
            existingQuestion.setLastUpdated(timestamp.getTime());

            QuestionEntity updatedQuestion = questionRepository.save(existingQuestion);
            return new QuestionUpdateDto(updatedQuestion.getId(), updatedQuestion.getTitle() + "f", updatedQuestion.getDescription(), updatedQuestion.getCreationDate(), updatedQuestion.getLastUpdated());

        } else {
            return null;
        }

    }


    @Override
    public QuestionCreateDto voteQuestion(UUID questionId, Integer voteType) {

        if (questionRepository.findById(questionId).isPresent()) {
            QuestionEntity questionEntity = questionRepository.findById(questionId).get();

            switch (voteType) {
                case 0:
                    questionEntity.setTotalDownVotes(questionEntity.getTotalDownVotes());
                    questionEntity.setTotalUpVotes(questionEntity.getTotalUpVotes());
                    break;
                case 1:
                    questionEntity.setTotalDownVotes(questionEntity.getTotalDownVotes() + 1);
                    questionEntity.setTotalUpVotes(questionEntity.getTotalUpVotes());
                    break;
                case 2:
                    questionEntity.setTotalDownVotes(questionEntity.getTotalDownVotes());
                    questionEntity.setTotalUpVotes(questionEntity.getTotalUpVotes() + 1);
                    break;
            }

            questionEntity.setTotalVotes(questionEntity.getTotalUpVotes() - questionEntity.getTotalDownVotes());

            return new QuestionCreateDto(questionEntity.getId(), questionEntity.getTitle(), questionEntity.getCreationDate(), questionEntity.getDescription(), questionEntity.getUserEntity().getId());

        } else {
            return null;
        }
    }


    @Override
    public void deleteQuestion(UUID userId, UUID id) {

        if (questionRepository.findById(id).get().getUserEntity().getId().equals(userId)) {

            if (questionRepository.findById(id).isPresent()) {

                QuestionEntity questionEntity = questionRepository.findById(id).get();

                questionRepository.delete(questionEntity);

            }
        }

    }

}
