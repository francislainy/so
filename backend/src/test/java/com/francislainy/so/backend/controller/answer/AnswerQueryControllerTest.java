package com.francislainy.so.backend.controller.answer;

import com.francislainy.so.backend.dto.answer.AnswerQueryDto;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import com.francislainy.so.backend.service.answer.AnswerQueryService;
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

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * mvn -Dtest=com.francislainy.so.backend.controller.*Test test
 */

@RunWith(SpringRunner.class)
@WebMvcTest(AnswerQueryController.class)
public class AnswerQueryControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AnswerQueryService answerQueryService;

    @MockBean
    private QuestionQueryService questionQueryService;

    @Test
    public void getAnswerListNoItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions/164349e9-637f-4bac-8443-f2e05861934c/answers")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"answers\":[]}", true))
                .andReturn();

    }


    @Test
    public void getMyAnswerListNoItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions/my/164349e9-637f-4bac-8443-f2e05861934c/answers")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json("{\"answers\":[]}", true))
                .andReturn();

    }


    @Test
    public void getAnswerListOneItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions/164349e9-637f-4bac-8443-f2e05861934c/answers")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setId(UUID.fromString("164349e9-637f-4bac-8443-f2e05861934c"));
        UserEntity userEntity = new UserEntity(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        AnswerQueryDto answerQueryDto = new AnswerQueryDto(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"), 1606106807178L, "Question17d55", questionEntity, userEntity);

        Gson gson = new Gson();
        String answerJson = gson.toJson(answerQueryDto, AnswerQueryDto.class);

        List<AnswerQueryDto> allAnswers = Arrays.asList(answerQueryDto);

        given(answerQueryService.getAnswerList(Mockito.any(UUID.class), Mockito.any(UUID.class))).willReturn(allAnswers);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
//                .andExpect(content().json(answerJson, true))
                .andExpect(jsonPath("$.answers[0].id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andExpect(jsonPath("$.answers[0].creationDate").value(1606106807178L))
                .andExpect(jsonPath("$.answers[0].content").value("Question17d55"))
                .andExpect(jsonPath("$.answers[0].question.id").value("164349e9-637f-4bac-8443-f2e05861934c"))
                .andExpect(jsonPath("$.answers[0].user.id").value("85514581-cc50-4490-8612-6a288842ff64"))

                .andReturn();

        String content = result.getResponse().getContentAsString();
        System.out.println(content);

    }


    @Test
    public void getAnswerListThreeItems() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions/164349e9-637f-4bac-8443-f2e05861934c/answers")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setId(UUID.fromString("164349e9-637f-4bac-8443-f2e05861934c"));
        UserEntity userEntity = new UserEntity(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        AnswerQueryDto answerQueryDto0 = new AnswerQueryDto(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"), 1606106807178L, "Question17d55", questionEntity, userEntity);
        AnswerQueryDto answerQueryDto1 = new AnswerQueryDto(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"), 1606106807178L, "Question17d55", questionEntity, userEntity);
        AnswerQueryDto answerQueryDto2 = new AnswerQueryDto(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"), 1606106807178L, "Question17d55", questionEntity, userEntity);

        List<AnswerQueryDto> allAnswers = Arrays.asList(answerQueryDto0, answerQueryDto1, answerQueryDto2);

        given(answerQueryService.getAnswerList(Mockito.any(UUID.class), Mockito.any(UUID.class))).willReturn(allAnswers);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answers[0].id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andExpect(jsonPath("$.answers[0].creationDate").value(1606106807178L))
                .andExpect(jsonPath("$.answers[0].content").value("Question17d55"))
                .andExpect(jsonPath("$.answers[0].question.id").value("164349e9-637f-4bac-8443-f2e05861934c"))
                .andExpect(jsonPath("$.answers[0].user.id").value("85514581-cc50-4490-8612-6a288842ff64"))

                .andExpect(jsonPath("$.answers[1].id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andExpect(jsonPath("$.answers[1].creationDate").value(1606106807178L))
                .andExpect(jsonPath("$.answers[1].content").value("Question17d55"))
                .andExpect(jsonPath("$.answers[1].question.id").value("164349e9-637f-4bac-8443-f2e05861934c"))
                .andExpect(jsonPath("$.answers[1].user.id").value("85514581-cc50-4490-8612-6a288842ff64"))

                .andExpect(jsonPath("$.answers[2].id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andExpect(jsonPath("$.answers[2].creationDate").value(1606106807178L))
                .andExpect(jsonPath("$.answers[2].content").value("Question17d55"))
                .andExpect(jsonPath("$.answers[2].question.id").value("164349e9-637f-4bac-8443-f2e05861934c"))
                .andExpect(jsonPath("$.answers[2].user.id").value("85514581-cc50-4490-8612-6a288842ff64"))

                .andReturn();

    }


    @Test
    public void getAnswerItem() throws Exception {

        RequestBuilder request = MockMvcRequestBuilders
                .get("/api/so/questions/164349e9-637f-4bac-8443-f2e05861934c/answers/51b55b24-e74b-4f18-b125-1274ba321f6d")
                .accept(MediaType.APPLICATION_JSON)
                .header("authorization", UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setId(UUID.fromString("164349e9-637f-4bac-8443-f2e05861934c"));
        UserEntity userEntity = new UserEntity(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"));


        AnswerQueryDto answerQueryDto = new AnswerQueryDto(UUID.fromString("85514581-cc50-4490-8612-6a288842ff64"), 1606106807178L, "Question17d55", questionEntity, userEntity);

        given(answerQueryService.getAnswerItem(Mockito.any(UUID.class), Mockito.any(UUID.class))).willReturn(answerQueryDto);

        MvcResult result = mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andExpect(jsonPath("$.creationDate").value(1606106807178L))
                .andExpect(jsonPath("$.content").value("Question17d55"))
                .andExpect(jsonPath("$.question.id").value("164349e9-637f-4bac-8443-f2e05861934c"))
                .andExpect(jsonPath("$.user.id").value("85514581-cc50-4490-8612-6a288842ff64"))
                .andReturn();

    }

}
