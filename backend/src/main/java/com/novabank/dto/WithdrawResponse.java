package com.novabank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WithdrawResponse {

    private String accountNumber;
    private Double balance;
    private String message;

}