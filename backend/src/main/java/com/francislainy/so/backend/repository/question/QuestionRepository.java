package com.francislainy.so.backend.repository.question;

import com.francislainy.so.backend.entity.question.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuestionRepository extends JpaRepository<QuestionEntity, UUID> {
}
