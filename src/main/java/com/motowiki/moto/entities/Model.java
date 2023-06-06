package com.motowiki.moto.entities;

import com.motowiki.moto.enumerations.Bodywork;
import com.motowiki.moto.enumerations.CarClass;
import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@Table(name = "model")
public class Model extends BaseEntity {

    public Model(){
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @NotNull
    private String model;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CarClass carClass;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Bodywork bodywork;

    @NotNull
    private Integer price_from;

    @NotNull
    private List<String> equipment;

    private List<String> more_versions;

    @NotNull
    private Integer height;

    @NotNull
    private Integer width;

    @NotNull
    private Integer car_length;

    @NotNull
    private Integer weight;
}