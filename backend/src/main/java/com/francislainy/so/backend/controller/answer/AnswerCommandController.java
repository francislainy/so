package com.francislainy.so.backend.controller.answer;

import com.francislainy.so.backend.dto.answer.AnswerCreateDto;
import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.dto.answer.AnswerUpdateDto;
import com.francislainy.so.backend.dto.question.QuestionCreateDto;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.service.answer.AnswerCommandService;
import com.francislainy.so.backend.service.answer.AnswerQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RequestMapping(method = RequestMethod.POST, value = "/api/so/questions")
@RestController
public class AnswerCommandController {

    @Autowired
    private AnswerCommandService answerCommandService;

    @Autowired
    private AnswerQueryService answerQueryService;

    @PostMapping(value = "/{questionId}/answers", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerCreateDto> createAnswer(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "questionId") UUID questionId, @RequestBody AnswerCreateDto answerCreateDto) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(answerCommandService.createAnswer(userId, questionId, answerCreateDto), HttpStatus.CREATED);
        }
    }


    @DeleteMapping(value = "/{questionId}/answers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AnswerCreateDto> deleteAnswer(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            AnswerQueryDto answerQueryDto = answerQueryService.getAnswerItem(userId, id);

            if (answerQueryDto == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                answerCommandService.deleteAnswer(userId, id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
    }


    @PutMapping(value = "/{questionId}/answers/{answerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AnswerUpdateDto> updateAnswer(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "questionId") UUID questionId, @PathVariable(value = "answerId") UUID answerId, @RequestBody AnswerUpdateDto answerUpdateDto) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            AnswerQueryDto answerQueryDto = answerQueryService.getAnswerItem(userId, answerId);

            if (answerQueryDto == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(answerCommandService.updateAnswer(userId, questionId, answerId, answerUpdateDto),HttpStatus.OK);
            }
        }
    }
}
