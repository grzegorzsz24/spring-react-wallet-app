package com.example.walletapp.controller;

import com.example.walletapp.model.Wallet;
import com.example.walletapp.service.ValidationService;
import com.example.walletapp.service.WalletService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class WalletController {
    private final WalletService walletService;
    private final ValidationService validationService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> createWallet(@PathVariable String userId, @Valid @RequestBody Wallet wallet, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        Wallet savedWallet = walletService.createOrUpdate(userId, wallet);
        return new ResponseEntity<Wallet>(savedWallet, HttpStatus.CREATED);
    }

    @PutMapping("/update/{userId}/{id}")
    public ResponseEntity<?> updateWallet(@PathVariable String userId, @PathVariable String id, @Valid @RequestBody Wallet wallet, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if(errors != null){
            return errors;
        }
        wallet.setId(id);
        Wallet savedWallet = walletService.createOrUpdate(userId, wallet);
        return new ResponseEntity<Wallet>(savedWallet, HttpStatus.OK);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getAll(@PathVariable String userId) {
        return new ResponseEntity<List<Wallet>>(walletService.getAll(userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        if (walletService.findById(id).isPresent()) {
            return new ResponseEntity<Wallet>(walletService.findById(id).get(),HttpStatus.OK);
        }
        return new ResponseEntity<String>("Wallet not found!",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        if (walletService.findById(id).isPresent()) {
            walletService.delete(id);
            return new ResponseEntity<String>("Wallet is deleted!",HttpStatus.OK);
        }
        return new ResponseEntity<String>("Wallet not found!",HttpStatus.BAD_REQUEST);
    }
}
