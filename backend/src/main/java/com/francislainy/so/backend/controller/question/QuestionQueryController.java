package com.francislainy.so.backend.controller.question;

import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.exceptions.WrongUserException;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RequestMapping("/api/so/questions")
@RestController
@Slf4j
public class QuestionQueryController {

    @Autowired
    private QuestionQueryService questionQueryService;

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    @ExceptionHandler(WrongUserException.class)
    @ResponseBody
    public void handleWrongUserException(Exception ex) {
        log.info("Forbidden exception throw: " + ex);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getAllQuestions(@RequestHeader(required = false, value = "authorization") UUID userId, HttpServletResponse response) {

        Map result = new HashMap();
        result.put("questions", questionQueryService.getQuestionList(userId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping(value = "/my", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getAllMyQuestions(@RequestHeader(required = false, value = "authorization") UUID userId, HttpServletResponse response) {

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            Map result = new HashMap();
            result.put("questions", questionQueryService.getMyQuestionList(userId));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<QuestionQueryDto> getQuestionItem(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id) {

        return new ResponseEntity<>(questionQueryService.getQuestionItem(userId, id), HttpStatus.OK);

    }


    @GetMapping(value = "/{id}/my", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<QuestionQueryDto> getMyQuestionItem(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return new ResponseEntity<>(questionQueryService.getMyQuestionItem(userId, id), HttpStatus.OK);
        }

    }
}
