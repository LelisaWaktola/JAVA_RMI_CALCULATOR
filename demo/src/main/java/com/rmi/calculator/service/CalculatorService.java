package com.rmi.calculator.service;

import com.rmi.calculator.dto.CalculationRequest;
import com.rmi.calculator.dto.CalculationResponse;
import com.rmi.calculator.entity.CalculatorOperation;
import com.rmi.calculator.repository.CalculatorOperationRepository;
import com.rmi.calculator.rmi.CalculatorRMI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;

@Service
public class CalculatorService {

    @Autowired
    private CalculatorOperationRepository operationRepository;

    @Value("${rmi.port:1099}")
    private int rmiPort;

    @Value("${rmi.service.name:CalculatorService}")
    private String serviceName;

    public CalculationResponse calculate(CalculationRequest request) {
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", rmiPort);
            CalculatorRMI calculator = (CalculatorRMI) registry.lookup(serviceName);

            double result;
            switch (request.getOperation().toUpperCase()) {
                case "ADD":
                    result = calculator.add(request.getOperand1(), request.getOperand2());
                    break;
                case "SUBTRACT":
                    result = calculator.subtract(request.getOperand1(), request.getOperand2());
                    break;
                case "MULTIPLY":
                    result = calculator.multiply(request.getOperand1(), request.getOperand2());
                    break;
                case "DIVIDE":
                    result = calculator.divide(request.getOperand1(), request.getOperand2());
                    break;
                default:
                    return new CalculationResponse(0, request.getOperation(),
                            request.getOperand1(), request.getOperand2(),
                            false, "Invalid operation");
            }

            return new CalculationResponse(result, request.getOperation(),
                    request.getOperand1(), request.getOperand2(),
                    true, "Calculation successful");

        } catch (RemoteException | NotBoundException e) {
            return new CalculationResponse(0, request.getOperation(),
                    request.getOperand1(), request.getOperand2(),
                    false, "RMI Error: " + e.getMessage());
        } catch (ArithmeticException e) {
            return new CalculationResponse(0, request.getOperation(),
                    request.getOperand1(), request.getOperand2(),
                    false, e.getMessage());
        }
    }

    public List<CalculatorOperation> getRecentOperations() {
        return operationRepository.findTop20ByOrderByCreatedAtDesc();
    }
}
