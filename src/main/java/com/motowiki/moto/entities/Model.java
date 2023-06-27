package com.motowiki.moto.entities;

import com.motowiki.moto.enumerations.Bodywork;
import com.motowiki.moto.enumerations.CarClass;
import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

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

    @Enumerated(EnumType.STRING)
    private CarClass carClass;

    @Enumerated(EnumType.STRING)
    private Bodywork bodywork;

    private Integer price_from;

    private List<String> equipment;

    private List<String> more_versions;

    private Integer height;

    private Integer width;

    private Integer car_length;

    private Integer weight;
}