package com.francislainy.so.backend.entity.user;

import com.francislainy.so.backend.entity.answer.AnswerEntity;
import com.francislainy.so.backend.entity.question.QuestionEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "user_profile")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<QuestionEntity> questionEntities;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<AnswerEntity> answerEntities;

    public UserEntity(UUID id) {
        this.id = id;
    }

    public void addQuestion(QuestionEntity q) {
        if (this.questionEntities == null) {
            this.questionEntities = new ArrayList<>();
        }
        q.setUserEntity(this);
        this.questionEntities.add(q);
    }

    public void addAnswer(AnswerEntity a) {
        if (this.answerEntities == null) {
            this.answerEntities = new ArrayList<>();
        }
        a.setUserEntity(this);
        this.answerEntities.add(a);
    }
}
