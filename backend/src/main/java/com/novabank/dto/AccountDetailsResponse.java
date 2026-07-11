package com.novabank.dto;

import com.novabank.enums.AccountStatus;
import com.novabank.enums.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountDetailsResponse {

    private String accountNumber;
    private String ifscCode;
    private Double balance;
    private AccountType accountType;
    private AccountStatus accountStatus;
}