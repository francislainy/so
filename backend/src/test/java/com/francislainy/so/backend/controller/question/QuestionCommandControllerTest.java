package com.francislainy.so.backend.controller.question;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.francislainy.so.backend.dto.question.QuestionCreateDto;
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
@WebMvcTest(QuestionCommandController.class)
public class QuestionCommandControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private QuestionCommandService questionCommandService;

    @MockBean
    private QuestionQueryService questionQueryService;

    @Test
    public void postOneQuestion() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .post("/api/so/questions")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\n" +
                        "            \"title\": \"myTitle\",\n" +
                        "            \"creationDate\": 1606106807178\n" +
                        "}")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        QuestionCreateDto question = new QuestionCreateDto(UUID.fromString("c974f737-eb25-475c-871f-822540e85fd6"),
                "myTitle", 1606106807178L);

        given(questionCommandService.createQuestion(Mockito.any(UUID.class), Mockito.any(QuestionCreateDto.class))).willReturn(question);

        MvcResult result = mvc.perform(request)
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().json("{\n" +
                        "    \"id\": \"c974f737-eb25-475c-871f-822540e85fd6\",\n" +
                        "    \"title\": \"myTitle\",\n" +
                        "    \"creationDate\": 1606106807178\n" +
                        "}", true))
                .andExpect(jsonPath("$.id").value("c974f737-eb25-475c-871f-822540e85fd6"))
                .andReturn();

    }


    @Test
    public void postOneQuestionJson() throws Exception {

        QuestionCreateDto questionPostBodyParams = new QuestionCreateDto(
                "myTitle", 1606106807178L, "my post");

        String jsonStringBodyParams = asJsonString(questionPostBodyParams);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/api/so/questions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonStringBodyParams)
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        QuestionCreateDto questionResponse = new QuestionCreateDto(UUID.fromString("c974f737-eb25-475c-871f-822540e85fd6"),
                "myTitle", 1606106807178L, "desc", UUID.fromString("e88d7cd3-3e9c-4113-a19a-f3907bf8b6d0"));

        String jsonStringResponse = asJsonString(questionResponse);

        given(questionCommandService.createQuestion(Mockito.any(UUID.class), Mockito.any(QuestionCreateDto.class))).willReturn(questionResponse);

        MvcResult result = mvc.perform(request)
                .andExpect(status().is2xxSuccessful())
                .andExpect(content().json(jsonStringResponse, true))
                .andExpect(jsonPath("$.id").value("c974f737-eb25-475c-871f-822540e85fd6"))
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
