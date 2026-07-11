package com.novabank.dto;

import lombok.Data;

@Data
public class TransferRequest {

    private String fromAccountNumber;
    private String toAccountNumber;
    private Double amount;
}