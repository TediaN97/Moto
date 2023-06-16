package com.motowiki.moto.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {

    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
