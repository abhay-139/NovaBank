package com.novabank.dto;

import com.novabank.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;

    private String email;

    private String password;

    private Role role;
}