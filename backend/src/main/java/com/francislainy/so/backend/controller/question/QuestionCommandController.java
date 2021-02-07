package com.francislainy.so.backend.controller.question;

import com.francislainy.so.backend.dto.question.QuestionCreateDto;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.dto.question.QuestionUpdateDto;
import com.francislainy.so.backend.service.question.QuestionCommandService;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RequestMapping(method = RequestMethod.POST, value = "/api/so/questions")
@RestController
public class QuestionCommandController {

    @Autowired
    private QuestionCommandService questionCommandService;

    @Autowired
    private QuestionQueryService questionQueryService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<QuestionCreateDto> createQuestion(@RequestHeader(required = false, value = "authorization") UUID userId, @RequestBody QuestionCreateDto questionCreateDto) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(questionCommandService.createQuestion(userId, questionCreateDto), HttpStatus.CREATED);
        }
    }


    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<QuestionCreateDto> deleteQuestion(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            QuestionQueryDto questionQueryDto = questionQueryService.getQuestionItem(userId, id);

            if (questionQueryDto == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                questionCommandService.deleteQuestion(userId, id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<QuestionUpdateDto> updateQuestion(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id,
                                                            @RequestBody QuestionUpdateDto questionUpdateDto) {
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(questionCommandService.updateQuestion(userId, id, questionUpdateDto), HttpStatus.OK);
        }
    }


    @PostMapping(value = "/{id}/vote/{voteType}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<QuestionCreateDto> upvoteQuestion(@PathVariable(value = "id") UUID id, @PathVariable(value = "voteType") Integer voteType) {

        return new ResponseEntity<>(questionCommandService.voteQuestion(id, voteType), HttpStatus.OK);
    }

}
