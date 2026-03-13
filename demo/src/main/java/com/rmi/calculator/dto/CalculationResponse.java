package com.rmi.calculator.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculationResponse {
    private double result;
    private String operation;
    private double operand1;
    private double operand2;
    private boolean success;
    private String message;
}
