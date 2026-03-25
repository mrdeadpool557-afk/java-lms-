package com.lms.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Lecture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private String videoUrl;
    private int sortOrder;

    @ManyToOne
    @JoinColumn(name = "section_id")
    @JsonIgnore
    private Section section;
}
