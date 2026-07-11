package com.novabank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransferResponse {

    private String fromAccount;
    private String toAccount;
    private Double amount;
    private String message;
}