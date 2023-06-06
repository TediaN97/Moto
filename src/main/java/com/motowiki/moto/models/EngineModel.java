package com.motowiki.moto.models;

import com.motowiki.moto.entities.Model;
import com.motowiki.moto.enumerations.Fuel;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@Component
public class EngineModel {

    private Integer model_id;
    private String engine_volume;
    private Integer maximum_performance;
    private String gearbox;
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
