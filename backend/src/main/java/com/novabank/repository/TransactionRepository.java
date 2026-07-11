package com.novabank.repository;

import com.novabank.entity.Transaction;
import com.novabank.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccount(Account account);

}