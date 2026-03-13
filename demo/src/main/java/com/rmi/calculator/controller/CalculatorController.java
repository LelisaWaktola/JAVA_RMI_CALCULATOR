package com.rmi.calculator.controller;

import com.rmi.calculator.dto.CalculationRequest;
import com.rmi.calculator.dto.CalculationResponse;
import com.rmi.calculator.entity.CalculatorOperation;
import com.rmi.calculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@RequestBody CalculationRequest request) {
        CalculationResponse response = calculatorService.calculate(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<CalculatorOperation>> getHistory() {
        List<CalculatorOperation> history = calculatorService.getRecentOperations();
        return ResponseEntity.ok(history);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Calculator RMI Service is running");
    }
}
