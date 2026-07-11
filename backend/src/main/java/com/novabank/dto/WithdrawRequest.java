package com.novabank.dto;

import lombok.Data;

@Data
public class WithdrawRequest {

    private String accountNumber;
    private Double amount;

}