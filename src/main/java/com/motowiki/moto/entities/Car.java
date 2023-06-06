package com.motowiki.moto.entities;

import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

import java.io.File;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@Table(name = "car")
public class Car extends BaseEntity{

    public Car(){
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String brand;

    private String country;

    private Integer start_from;

    private byte @NotNull [] logo;
}
