package com.francislainy.so.backend.entity.question;

import com.francislainy.so.backend.entity.answer.AnswerEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "question")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date", nullable = false)
    private Long creationDate;

    @Column(name = "last_updated")
    private Long lastUpdated;

    @Column(name = "total_votes")
    private Integer totalVotes;

    @Column(name = "total_upvotes")
    private Integer totalUpVotes;

    @Column(name = "total_downvotes")
    private Integer totalDownVotes;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserEntity userEntity;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "questionEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<AnswerEntity> answerEntities;

    @ManyToMany(mappedBy = "questionFavouriteEntity")
    private Set<UserEntity> userEntities;

    public QuestionEntity(UUID id) {
        this.id = id;
    }

    public QuestionEntity(UUID id, String title) {
        this.id = id;
        this.title = title;
    }

    public void addAnswer(AnswerEntity a) {
        if (this.answerEntities == null) {
            this.answerEntities = new ArrayList<>();
        }
        a.setQuestionEntity(this);
        this.answerEntities.add(a);
    }

}
