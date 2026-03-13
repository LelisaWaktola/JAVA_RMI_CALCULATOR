package com.rmi.calculator.rmi;

import com.rmi.calculator.entity.CalculatorOperation;
import com.rmi.calculator.repository.CalculatorOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * Implementation of the RMI Calculator interface
 * This class extends UnicastRemoteObject to enable RMI functionality
 */
@Component
public class CalculatorRMIImpl extends UnicastRemoteObject implements CalculatorRMI {

    @Autowired
    private CalculatorOperationRepository operationRepository;

    public CalculatorRMIImpl() throws RemoteException {
        super();
    }

    @Override
    public double add(double a, double b) throws RemoteException {
        double result = a + b;
        saveOperation("ADD", a, b, result);
        return result;
    }

    @Override
    public double subtract(double a, double b) throws RemoteException {
        double result = a - b;
        saveOperation("SUBTRACT", a, b, result);
        return result;
    }

    @Override
    public double multiply(double a, double b) throws RemoteException {
        double result = a * b;
        saveOperation("MULTIPLY", a, b, result);
        return result;
    }

    @Override
    public double divide(double a, double b) throws RemoteException {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        double result = a / b;
        saveOperation("DIVIDE", a, b, result);
        return result;
    }

    private void saveOperation(String operationType, double operand1, double operand2, double result) {
        try {
            CalculatorOperation operation = new CalculatorOperation();
            operation.setOperationType(operationType);
            operation.setOperand1(operand1);
            operation.setOperand2(operand2);
            operation.setResult(result);
            operationRepository.save(operation);
        } catch (Exception e) {
            System.err.println("Error saving operation: " + e.getMessage());
        }
    }
}
