package com.example.walletapp.controller;

import com.example.walletapp.model.Transaction;
import com.example.walletapp.service.TransactionService;
import com.example.walletapp.service.ValidationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin
@AllArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
    private final ValidationService validationService;

    @GetMapping("/{wallet_id}")
    public ResponseEntity<?> getAll(@PathVariable String wallet_id) {
        return new ResponseEntity<List<Transaction>>(transactionService.getAll(wallet_id), HttpStatus.OK);
    }

    @GetMapping("/{wallet_id}/{transaction_id}")
    public ResponseEntity<?> getById(@PathVariable String transaction_id) {
        if (transactionService.findById(transaction_id).isEmpty()) {
            return new ResponseEntity<String>("Transaction not found!", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Transaction>(transactionService.findById(transaction_id).get(), HttpStatus.OK);
    }

    @PostMapping("/{wallet_id}")
    public ResponseEntity<?> createTransaction(@PathVariable String wallet_id, @Valid @RequestBody Transaction transaction, BindingResult result) {
        ResponseEntity error = validationService.validate(result);
        if (error != null) {
            return error;
        }
        if (transaction.getTranscationDate() == null) {
            transaction.setTranscationDate(new Date());
        }
        Transaction savedTransaction = transactionService.create(wallet_id, transaction);
        return new ResponseEntity<Transaction>(savedTransaction, HttpStatus.OK);
    }

    @DeleteMapping("/{wallet_id}/{transaction_id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable String transaction_id) {
        if (transactionService.findById(transaction_id).isEmpty()) {
            return new ResponseEntity<String>("Transaction not found", HttpStatus.BAD_REQUEST);
        }
        transactionService.delete(transaction_id);
        return new ResponseEntity<String>("Transaction deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/revoke/{wallet_id}/{transaction_Id}")
    public ResponseEntity<?> deleteTransactionRevoke(@PathVariable String transaction_Id) {
        if (transactionService.findById(transaction_Id).isEmpty()) {
            return new ResponseEntity<String>("Transaction not found",HttpStatus.BAD_REQUEST);
        }
        Transaction trToRevoke = transactionService.findById(transaction_Id).get();
        if (trToRevoke.getType() == 1) {
            trToRevoke.getWallet().withdraw(trToRevoke.getAmount());
        } else if(trToRevoke.getType() == 2){
            trToRevoke.getWallet().deposit(trToRevoke.getAmount());
        }
        transactionService.delete(transaction_Id);
        return new ResponseEntity<String>("Transaction is deleted",HttpStatus.OK);
    }

}
