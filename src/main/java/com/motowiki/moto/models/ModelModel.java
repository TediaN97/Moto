package com.motowiki.moto.models;

import com.motowiki.moto.enumerations.Bodywork;
import com.motowiki.moto.enumerations.CarClass;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Component
public class ModelModel {

    private Integer car_id;
    private String model;
    private String bodywork;
    private String car_class;
    private Integer price_from;
    private List<String> equipment;
    private List<String> more_versions;
    private Integer height;
    private List<String> images;
    private Integer width;
    private Integer car_length;
    private Integer weight;

}
