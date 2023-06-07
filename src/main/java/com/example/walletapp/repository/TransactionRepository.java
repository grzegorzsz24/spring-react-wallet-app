package com.example.walletapp.repository;

import com.example.walletapp.model.Transaction;
import com.example.walletapp.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    public Optional<List<Transaction>> findByWallet(Wallet wallet);
}
