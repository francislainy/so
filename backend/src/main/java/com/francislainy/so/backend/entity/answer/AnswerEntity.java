package com.francislainy.so.backend.entity.answer;

import com.francislainy.so.backend.entity.question.QuestionEntity;
import com.francislainy.so.backend.entity.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "answer")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public class AnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "content", nullable = false)
    private String content;

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
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionEntity questionEntity;

}
