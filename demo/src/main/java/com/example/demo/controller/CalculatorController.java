package com.example.demo.controller;

import com.example.demo.entity.CalculationHistory;
import com.example.demo.repository.CalculationHistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    private final CalculationHistoryRepository historyRepository;

    public CalculatorController(CalculationHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @GetMapping("/history")
    public ResponseEntity<List<CalculationHistory>> getHistory() {
        List<CalculationHistory> history = historyRepository.findAllByOrderByTimestampDesc();
        return ResponseEntity.ok(history);
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<CalculationHistory> getHistoryById(@PathVariable Long id) {
        return historyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        if (historyRepository.existsById(id)) {
            historyRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/history")
    public ResponseEntity<Void> clearHistory() {
        historyRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/info")
    public ResponseEntity<String> getInfo() {
        return ResponseEntity.ok("RMI Calculator Server - Distributed Computing Example");
    }
}
