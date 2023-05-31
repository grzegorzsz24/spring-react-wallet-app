package com.example.walletapp.service;

import com.example.walletapp.model.Wallet;
import com.example.walletapp.repository.WalletRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    public Wallet createOrUpdate(Wallet wallet) {
        if (wallet.getPriority() == null) {
            wallet.setPriority(3);
        }
        if (wallet.getCurrentBalance() == null) {
            wallet.setCurrentBalance(0.0);
        }
        return walletRepository.save(wallet);
    }

    public void delete(String id) {
        walletRepository.deleteById(id);
    }

    public Optional<Wallet> findById(String id) {
        return walletRepository.findById(id);
    }

    public List<Wallet> getAll() {
        return walletRepository.findAllByOrderByPriority();
    }


}
