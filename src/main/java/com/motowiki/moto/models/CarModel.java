package com.motowiki.moto.models;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.File;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarModel {

    private String brand;
    private String country;
    private Integer start_from;
    private String logo;
}
