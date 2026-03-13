package com.rmi.calculator.repository;

import com.rmi.calculator.entity.CalculatorOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CalculatorOperationRepository extends JpaRepository<CalculatorOperation, UUID> {

    List<CalculatorOperation> findTop20ByOrderByCreatedAtDesc();
}
