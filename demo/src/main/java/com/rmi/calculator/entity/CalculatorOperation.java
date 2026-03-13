package com.rmi.calculator.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "calculator_operations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorOperation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "operation_type", nullable = false)
    private String operationType;

    @Column(name = "operand1", nullable = false)
    private Double operand1;

    @Column(name = "operand2", nullable = false)
    private Double operand2;

    @Column(name = "result", nullable = false)
    private Double result;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
