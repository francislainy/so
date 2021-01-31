package com.francislainy.so.backend.repository.answer;

import com.francislainy.so.backend.entity.answer.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AnswerRepository extends JpaRepository<AnswerEntity, UUID> {

    String queryReportListAndCategoryName = "SELECT * FROM answer INNER JOIN question on answer.question_id = question.id WHERE answer.question_id = :id ORDER BY answer.creation_date DESC";

    @Query(value = queryReportListAndCategoryName, nativeQuery = true)
    List<AnswerEntity> findAnswerEntityByQuestionEntityId(UUID id);
}
