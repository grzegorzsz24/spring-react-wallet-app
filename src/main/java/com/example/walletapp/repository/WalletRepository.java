package com.example.walletapp.repository;

import com.example.walletapp.model.User;
import com.example.walletapp.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WalletRepository extends MongoRepository<Wallet, String> {
    public List<Wallet> findAllByOrderByPriority();
    public Optional<List<Wallet>> findByUser(User user);
}
