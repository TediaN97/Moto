package com.motowiki.moto.models;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.io.File;

@Getter
@Component
public class CarModel {

    private String brand;
    private String country;
    private Integer start_from;
    private String logo;
}
