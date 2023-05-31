package com.example.walletapp.repository;

import com.example.walletapp.model.Transaction;
import com.example.walletapp.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    public List<Transaction> findByWallet(Wallet wallet);
}
