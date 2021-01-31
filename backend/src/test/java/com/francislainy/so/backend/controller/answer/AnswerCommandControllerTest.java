package com.francislainy.so.backend.controller.answer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.francislainy.so.backend.dto.answer.AnswerCreateDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.service.answer.AnswerCommandService;
import com.francislainy.so.backend.service.answer.AnswerQueryService;
import com.francislainy.so.backend.service.question.QuestionCommandService;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * mvn -Dtest=com.francislainy.so.backend.controller.*Test test
 */

@RunWith(SpringRunner.class)
@WebMvcTest(AnswerCommandController.class)
public class AnswerCommandControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AnswerCommandService answerCommandService;

    @MockBean
    private AnswerQueryService answerQueryService;

    @MockBean
    private QuestionCommandService questionCommandService;

    @MockBean
    private QuestionQueryService questionQueryService;


    @Test
    public void postOneAnswerJson() throws Exception {
        Gson gson = new Gson();

        AnswerCreateDto bodyParams = new AnswerCreateDto("myContent");

        String jsonStringBodyParams = asJsonString(bodyParams);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/api/so/questions/164349e9-637f-4bac-8443-f2e05861934c/answers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonStringBodyParams)
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setUserEntity(new UserEntity(UUID.fromString("85514581-cc50-4490-8612-6a288842ff6")));

//        String jsonQuestionEntity = asJsonString(questionEntity);
//        QuestionEntity questionEntity1 = gson.fromJson("{\"question\":{\"id\":\"164349e9-637f-4bac-8443-f2e05861934c\"}}", QuestionEntity.class);


        String jsonStringResponse = "{\"id\":\"42d89318-3ad9-41a7-8e82-4773be9208f8\",\"creationDate\":1611630864777,\"content\":\"myContent\",\"question\":{\"id\":\"164349e9-637f-4bac-8443-f2e05861934c\"}}";
        AnswerCreateDto answerCreateDto = gson.fromJson(jsonStringResponse, AnswerCreateDto.class);


//        //
//        answerCreateDto = new AnswerCreateDto(UUID.fromString("42d89318-3ad9-41a7-8e82-4773be9208f8"),
//                1611630864777L, "myContent", questionEntity1);
//
//        jsonStringResponse = asJsonString(answerCreateDto);
//
//        //


        given(answerCommandService.createAnswer(Mockito.any(UUID.class), Mockito.any(UUID.class), Mockito.any(AnswerCreateDto.class))).willReturn(answerCreateDto);

        MvcResult result = mvc.perform(request)
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().json(jsonStringResponse, false))
                .andExpect(jsonPath("$.id").value("42d89318-3ad9-41a7-8e82-4773be9208f8"))
                .andReturn();

    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
