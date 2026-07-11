package com.novabank.dto;

import com.novabank.enums.AccountType;
import lombok.Data;

@Data
public class CreateAccountRequest {

    private String email;
    private AccountType accountType;

}