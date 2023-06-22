package com.motowiki.moto.models;

import com.motowiki.moto.enumerations.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    private String firstName;
    private String lastName;
    private Role role;

}
