package com.francislainy.so.backend.controller.answer;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.service.answer.AnswerQueryService;
import com.francislainy.so.backend.service.question.QuestionQueryService;
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
public class AnswerQueryController {

    @Autowired
    private AnswerQueryService answerQueryService;

    @GetMapping(value = "/{questionId}/answers", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getAllAnswers(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable UUID questionId, HttpServletResponse response) {

        Map result = new HashMap();
        result.put("answers", answerQueryService.getAnswerList(userId, questionId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping(value = "/my/{questionId}/answers", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity getAllMyAnswers(@RequestHeader(required = false, value = "authorization") UUID userId, HttpServletResponse response) {

        if (userId == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            Map result = new HashMap();
            result.put("answers", answerQueryService.getMyAnswerList(userId));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }


    @GetMapping(value = "/{questionId}/answers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AnswerQueryDto> getAnswerItem(@RequestHeader(required = false, value = "authorization") UUID userId, @PathVariable(value = "id") UUID id) {

        return new ResponseEntity<>(answerQueryService.getAnswerItem(userId, id), HttpStatus.OK);

    }


}
