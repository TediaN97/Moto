package com.motowiki.moto.entities;

import com.motowiki.moto.enumerations.Fuel;
import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "engine")
public class Engine extends BaseEntity {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    private String engine_volume;

    private Integer maximum_performance;

    private String gearbox;

    @Enumerated(EnumType.STRING)
    private Fuel fuel;

    private Float acceleration_from_0_to_100;

    private String drive_type;

    private String kind_of_engine;

    private Float combined_consumption_from;

    private Float combined_consumption_to;

    private Integer co2_emissions_from;

    private Integer co2_emissions_to;

    private Integer maximum_speed;

    private Integer maximum_torque;
}
