package com.novabank.dto;

import com.novabank.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TransactionResponse {

    private String transactionId;
    private TransactionType transactionType;
    private Double amount;
    private Double balanceAfterTransaction;
    private String description;
    private LocalDateTime transactionDate;

}