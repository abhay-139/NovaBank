package com.novabank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountResponse {

    private String accountNumber;
    private String ifscCode;
    private Double balance;
    private String message;

}