package com.motowiki.moto.entities;

import com.motowiki.moto.enumerations.Fuel;
import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@Table(name = "engine")
public class Engine extends BaseEntity {

    public Engine(){
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @NotNull
    private String engine_volume;

    @NotNull
    private Integer maximum_performance;

    @NotNull
    private String gearbox;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Fuel fuel;

    @NotNull
    private Float acceleration_from_0_to_100;

    @NotNull
    private String drive_type;

    @NotNull
    private String kind_of_engine;

    @NotNull
    private Float combined_consumption_from;

    @NotNull
    private Float combined_consumption_to;

    @NotNull
    private Integer co2_emissions_from;

    @NotNull
    private Integer co2_emissions_to;

    @NotNull
    private Integer maximum_speed;

    @NotNull
    private Integer maximum_torque;
}
