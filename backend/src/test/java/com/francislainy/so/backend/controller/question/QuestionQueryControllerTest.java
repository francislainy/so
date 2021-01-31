package com.francislainy.so.backend.controller.question;

import com.francislainy.so.backend.controller.question.QuestionQueryController;
import com.francislainy.so.backend.dto.question.QuestionQueryDto;
import com.francislainy.so.backend.service.question.QuestionQueryService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * mvn -Dtest=com.francislainy.so.backend.controller.*Test test
 */

@RunWith(SpringRunner.class)
@WebMvcTest(QuestionQueryController.class)
public class QuestionQueryControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private QuestionQueryService service;

    @Test
    public void getQuestionListNoItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"questions\":[]}", true))
                .andReturn();

    }


    @Test
    public void getQuestionListOneItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        QuestionQueryDto question = new QuestionQueryDto(UUID.fromString("c974f737-eb25-475c-871f-822540e85fd6"),
                "Question17d55", "desc", 1606106807178L);

        List<QuestionQueryDto> allQuestions = Arrays.asList(question);

        given(service.getQuestionList(UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"))).willReturn(allQuestions);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\n" +
                        "    \"questions\": [\n" +
                        "        {\n" +
                        "            \"id\": \"c974f737-eb25-475c-871f-822540e85fd6\",\n" +
                        "            \"title\": \"Question17d55\",\n" +
                        "            \"description\": \"desc\",\n" +
                        "            \"creationDate\": 1606106807178\n" +
                        "        }\n" +
                        "    ]\n" +
                        "}", true))
                .andReturn();

        String content = result.getResponse().getContentAsString();
        System.out.println(content);

    }


    @Test
    public void getQuestionListThreeItems() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"));

        QuestionQueryDto question1 = new QuestionQueryDto(UUID.fromString("c974f737-eb25-475c-871f-822540e85fd6"),
                "Question17d55", "desc", 1606106807178L);

        QuestionQueryDto question2 = new QuestionQueryDto(UUID.fromString("cdea76bd-b5a0-4fce-aeb5-c163a808abf5"),
                "Question17d56", "desc", 1606106813147L);

        QuestionQueryDto question3 = new QuestionQueryDto(UUID.fromString("14120295-638c-4999-b9f4-35645c0f1a30"),
                "Question2021", "desc", 1609946260055L);


        List<QuestionQueryDto> allQuestions = Arrays.asList(question1, question2, question3);


        given(service.getQuestionList(UUID.fromString("85514581-cc50-4490-8612-6a288842ff6"))).willReturn(allQuestions);


        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\n" +
                        "    \"questions\": [\n" +
                        "        {\n" +
                        "            \"id\": \"c974f737-eb25-475c-871f-822540e85fd6\",\n" +
                        "            \"title\": \"Question17d55\",\n" +
                        "            \"description\": \"desc\",\n" +
                        "            \"creationDate\": 1606106807178\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"id\": \"cdea76bd-b5a0-4fce-aeb5-c163a808abf5\",\n" +
                        "            \"title\": \"Question17d56\",\n" +
                        "            \"description\": \"desc\",\n" +
                        "            \"creationDate\": 1606106813147\n" +
                        "        },\n" +
                        "        {\n" +
                        "            \"id\": \"14120295-638c-4999-b9f4-35645c0f1a30\",\n" +
                        "            \"title\": \"Question2021\",\n" +
                        "            \"description\": \"desc\",\n" +
                        "            \"creationDate\": 1609946260055\n" +
                        "        }\n" +
                        "    ]\n" +
                        "}", true))
//                .andExpect(jsonPath("$", hasSize(3)))
                .andReturn();

    }

}
