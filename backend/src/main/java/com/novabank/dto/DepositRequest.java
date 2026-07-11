package com.novabank.dto;

import lombok.Data;

@Data
public class DepositRequest {

    private String accountNumber;
    private Double amount;

}