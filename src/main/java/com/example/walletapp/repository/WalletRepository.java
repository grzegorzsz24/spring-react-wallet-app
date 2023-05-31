package com.example.walletapp.repository;

import com.example.walletapp.model.Wallet;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
public interface WalletRepository extends MongoRepository<Wallet, String> {
    public List<Wallet> findAllByOrderByPriority();
}
