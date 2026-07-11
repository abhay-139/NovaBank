package com.novabank.service;

import com.novabank.dto.AccountResponse;
import com.novabank.dto.CreateAccountRequest;
import com.novabank.entity.Account;
import com.novabank.entity.User;
import com.novabank.enums.AccountStatus;
import com.novabank.repository.AccountRepository;
import com.novabank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.novabank.dto.DepositRequest;
import com.novabank.dto.BalanceResponse;
import com.novabank.entity.Transaction;
import com.novabank.enums.TransactionType;
import com.novabank.repository.TransactionRepository;
import java.time.LocalDateTime;
import java.util.Random;
import com.novabank.dto.WithdrawRequest;
import com.novabank.dto.WithdrawResponse;
import com.novabank.dto.TransferRequest;
import com.novabank.dto.TransferResponse;
import java.util.List;
import com.novabank.dto.TransactionResponse;
@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public AccountResponse createAccount(CreateAccountRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accountNumber = "NB" + (10000000 + new Random().nextInt(90000000));

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .ifscCode("NBIN0001001")
                .balance(0.0)
                .accountType(request.getAccountType())
                .accountStatus(AccountStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        accountRepository.save(account);

        return new AccountResponse(
                account.getAccountNumber(),
                account.getIfscCode(),
                account.getBalance(),
                "Account created successfully"
        );
    }
    public BalanceResponse deposit(DepositRequest request) {

        Account account = accountRepository.findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance() + request.getAmount());

        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .transactionId("TXN" + System.currentTimeMillis())
                .account(account)
                .transactionType(TransactionType.DEPOSIT)
                .amount(request.getAmount())
                .balanceAfterTransaction(account.getBalance())
                .description("Cash Deposit")
                .transactionDate(java.time.LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);

        return new BalanceResponse(
                account.getAccountNumber(),
                account.getBalance(),
                "Amount deposited successfully"
        );
    }
    public WithdrawResponse withdraw(WithdrawRequest request) {

        Account account = accountRepository.findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance() - request.getAmount());

        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .transactionId("TXN" + System.currentTimeMillis())
                .account(account)
                .transactionType(TransactionType.WITHDRAW)
                .amount(request.getAmount())
                .balanceAfterTransaction(account.getBalance())
                .description("Cash Withdrawal")
                .transactionDate(java.time.LocalDateTime.now())
                .build();

        transactionRepository.save(transaction);

        return new WithdrawResponse(
                account.getAccountNumber(),
                account.getBalance(),
                "Amount withdrawn successfully"
        );
    }
    public BalanceResponse getBalance(String accountNumber) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return new BalanceResponse(
                account.getAccountNumber(),
                account.getBalance(),
                "Balance fetched successfully"
        );
    }
    public TransferResponse transfer(TransferRequest request) {

        Account sender = accountRepository.findByAccountNumber(request.getFromAccountNumber())
                .orElseThrow(() -> new RuntimeException("Sender account not found"));

        Account receiver = accountRepository.findByAccountNumber(request.getToAccountNumber())
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        if (sender.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance");
        }

        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());

        accountRepository.save(sender);
        accountRepository.save(receiver);

        Transaction debitTransaction = new Transaction();
        debitTransaction.setAmount(request.getAmount());
        debitTransaction.setDescription("Money Transfer Sent");
        debitTransaction.setBalanceAfterTransaction(sender.getBalance());
        debitTransaction.setTransactionType(TransactionType.TRANSFER);
        debitTransaction.setTransactionId("TXN" + System.currentTimeMillis());
        debitTransaction.setTransactionDate(LocalDateTime.now());
        debitTransaction.setAccount(sender);

        Transaction creditTransaction = new Transaction();
        creditTransaction.setAmount(request.getAmount());
        creditTransaction.setDescription("Money Transfer Received");
        creditTransaction.setBalanceAfterTransaction(receiver.getBalance());
        creditTransaction.setTransactionType(TransactionType.TRANSFER);
        creditTransaction.setTransactionId("TXN" + (System.currentTimeMillis() + 1));
        creditTransaction.setTransactionDate(LocalDateTime.now());
        creditTransaction.setAccount(receiver);
        transactionRepository.save(debitTransaction);
        transactionRepository.save(creditTransaction);

        return new TransferResponse(
                sender.getAccountNumber(),
                receiver.getAccountNumber(),
                request.getAmount(),
                "Money transferred successfully"
        );
    }
    public List<TransactionResponse> getTransactionHistory(String accountNumber) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<Transaction> transactions = transactionRepository.findByAccount(account);

        return transactions.stream()
                .map(transaction -> new TransactionResponse(
                        transaction.getTransactionId(),
                        transaction.getTransactionType(),
                        transaction.getAmount(),
                        transaction.getBalanceAfterTransaction(),
                        transaction.getDescription(),
                        transaction.getTransactionDate()
                ))
                .toList();
    }
}