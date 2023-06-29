package com.motowiki.moto.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "model")
public class Model extends BaseEntity {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private String model;

    private String carClass;

    private String bodywork;

    private Integer price_from;

    private List<String> equipment;

    private List<String> more_versions;

    private Integer height;

    private Integer width;

    private Integer car_length;

    private Integer weight;

    @Column(name = "images", columnDefinition = "bytea[][]")
    private byte[][] images;
}