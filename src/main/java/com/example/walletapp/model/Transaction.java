package com.example.walletapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;

@Document(collection = "transactions")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    private String id;
    @NotNull
    @Min(0)
    private Double amount;
    @NotNull
    @Size(max = 250)
    private String description;
    @NotNull
    private int type;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date transcationDate;
    @DocumentReference
    private Wallet wallet;
}
