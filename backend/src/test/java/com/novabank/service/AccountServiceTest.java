package com.novabank.service;

import com.novabank.dto.AccountDetailsResponse;
import com.novabank.entity.Account;
import com.novabank.enums.AccountStatus;
import com.novabank.enums.AccountType;
import com.novabank.repository.AccountRepository;
import com.novabank.repository.TransactionRepository;
import com.novabank.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AccountService accountService;

    @Test
    void getMyAccountReturnsTheAccountForTheAuthenticatedUser() {
        String authenticatedEmail = "customer@novabank.com";
        Account account = Account.builder()
                .accountNumber("1001234567")
                .ifscCode("NOVA0001234")
                .balance(2500.00)
                .accountType(AccountType.SAVINGS)
                .accountStatus(AccountStatus.ACTIVE)
                .build();

        when(authentication.getName()).thenReturn(authenticatedEmail);
        when(accountRepository.findFirstByUserEmailOrderByCreatedAtAsc(authenticatedEmail))
                .thenReturn(Optional.of(account));

        AccountDetailsResponse response = accountService.getMyAccount(authentication);

        assertThat(response.getAccountNumber()).isEqualTo("1001234567");
        assertThat(response.getBalance()).isEqualTo(2500.00);
        verify(accountRepository)
                .findFirstByUserEmailOrderByCreatedAtAsc(authenticatedEmail);
    }
}
