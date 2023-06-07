package com.example.walletapp.service;

import com.example.walletapp.auth.AuthenticationService;
import com.example.walletapp.model.Transaction;
import com.example.walletapp.model.User;
import com.example.walletapp.model.Wallet;
import com.example.walletapp.repository.TransactionRepository;
import com.example.walletapp.repository.UserRepository;
import com.example.walletapp.repository.WalletRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    public Wallet createOrUpdate(String userId, Wallet wallet) {
        if (wallet.getPriority() == null) {
            wallet.setPriority(3);
        }
        if (wallet.getCurrentBalance() == null) {
            wallet.setCurrentBalance(0.0);
        }
        User user = userRepository.findById(userId).get();
        wallet.setUser(user);
        userRepository.save(user);
        return walletRepository.save(wallet);
    }

    public void delete(String id) {
        Wallet wallet = walletRepository.findById(id).get();
        Optional<List<Transaction>> transactions = transactionRepository.findByWallet(wallet);
        if (transactions.isPresent()) {
            transactionRepository.deleteAll(transactions.get());
        }
        userRepository.save(wallet.getUser());
        walletRepository.deleteById(id);
    }

    public Optional<Wallet> findById(String id) {
        return walletRepository.findById(id);
    }

    public List<Wallet> getAll(String userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return walletRepository.findByUser(user.get()).get();
        }
        return null;
    }
}
