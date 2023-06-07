package com.example.walletapp.service;

import com.example.walletapp.model.Transaction;
import com.example.walletapp.model.Wallet;
import com.example.walletapp.repository.TransactionRepository;
import com.example.walletapp.repository.WalletRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    
    public Transaction create(String walletId, Transaction transaction) {
        Optional<Wallet> wallet = walletRepository.findById(walletId);
        if (wallet.isPresent()) {
            transaction.setWallet(wallet.get());
            if (transaction.getType() == 1) {
                transaction.getWallet().deposit(transaction.getAmount());
            } else if (transaction.getType() == 2) {
                transaction.getWallet().withdraw(transaction.getAmount());
            }
            walletRepository.save(wallet.get());
            return transactionRepository.save(transaction);
        }
        return null;
    }

    public List<Transaction> getAll(String walletId) {
        Optional<Wallet> wallet = walletRepository.findById(walletId);
        if (wallet.isPresent()) {
            return transactionRepository.findByWallet(wallet.get()).get();
        }
        return null;
    }
    public void delete(String id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if (transaction.isPresent()) {
            Wallet wallet = transaction.get().getWallet();
            if (transaction.get().getType() == 1) {
                wallet.withdraw(transaction.get().getAmount());
            } else {
                wallet.deposit(transaction.get().getAmount());
            }
            walletRepository.save(wallet);
        }
        transactionRepository.deleteById(id);
    }

    public Optional<Transaction> findById(String id) {
        return transactionRepository.findById(id);
    }
}
