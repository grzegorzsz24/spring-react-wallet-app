package com.example.walletapp.controller;

import com.example.walletapp.model.Wallet;
import com.example.walletapp.service.ValidationService;
import com.example.walletapp.service.WalletService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
@CrossOrigin
@AllArgsConstructor
public class WalletController {
    private final WalletService walletService;
    private final ValidationService validationService;

    @PostMapping
    public ResponseEntity<?> createWallet(@Valid @RequestBody Wallet wallet, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if (errors != null) {
            return errors;
        }
        Wallet savedWallet = walletService.createOrUpdate(wallet);
        return new ResponseEntity<Wallet>(savedWallet, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateWallet(@PathVariable String id, @Valid @RequestBody Wallet wallet, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if(errors != null){
            return errors;
        }
        wallet.setId(id);
        Wallet savedWallet = walletService.createOrUpdate(wallet);
        return new ResponseEntity<Wallet>(savedWallet, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<List<Wallet>>(walletService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        if (walletService.findById(id).isPresent()) {
            return new ResponseEntity<Wallet>(walletService.findById(id).get(),HttpStatus.OK);
        }
        return new ResponseEntity<String>("Wallet not found!",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        if (walletService.findById(id).isPresent()) {
            walletService.delete(id);
            return new ResponseEntity<String>("Wallet is deleted!",HttpStatus.OK);
        }
        return new ResponseEntity<String>("Wallet not found!",HttpStatus.BAD_REQUEST);
    }
}
