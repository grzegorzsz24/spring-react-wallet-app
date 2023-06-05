package com.example.walletapp.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "wallets")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Wallet {
    @Id
    private String id;
    @NotNull
    @Size(max = 50)
    private String name;
    @NotNull
    @Size(max = 50)
    private String accountNumber;
    @NotNull
    @Size(max = 250)
    private String description;
    private Integer priority;
    private Double currentBalance;
    @DocumentReference
    private List<Transaction> transactionList;

    public void deposit(double amount){this.currentBalance+=amount;}
    public void withdraw(double amount){this.currentBalance-=amount;}

}
