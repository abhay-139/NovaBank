package com.novabank.service;

import com.novabank.dto.RegisterRequest;
import com.novabank.entity.User;
import com.novabank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.novabank.dto.LoginRequest;
import com.novabank.dto.LoginResponse;
import com.novabank.service.JwtService;
import com.novabank.entity.Account;
import com.novabank.enums.AccountStatus;
import com.novabank.enums.AccountType;
import com.novabank.repository.AccountRepository;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public String register(RegisterRequest request)
    {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);
        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .ifscCode("NOVA0001234")
                .balance(0.0)
                .accountType(AccountType.SAVINGS)
                .accountStatus(AccountStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .user(savedUser)
                .build();

        accountRepository.save(account);

        return "User registered successfully";
    }
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse("Login successful", token);
    }
    private String generateAccountNumber() {

        Random random = new Random();

        String accountNumber;

        do {
            accountNumber = "100" + (1000000 + random.nextInt(9000000));
        } while (accountRepository.findByAccountNumber(accountNumber).isPresent());

        return accountNumber;
    }
}