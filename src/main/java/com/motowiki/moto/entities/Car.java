package com.motowiki.moto.entities;

import jakarta.persistence.*;
import lombok.*;

import org.jetbrains.annotations.NotNull;

import java.io.File;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car")
public class Car extends BaseEntity{

    @Id
    @GeneratedValue
    private long id;

    private String brand;

    private String country;

    private Integer start_from;

    private byte[] logo;
}
