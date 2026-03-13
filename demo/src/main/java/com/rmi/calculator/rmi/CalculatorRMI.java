package com.rmi.calculator.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * RMI Interface for Calculator operations
 * This interface defines the remote methods that can be invoked by RMI clients
 */
public interface CalculatorRMI extends Remote {

    /**
     * Adds two numbers
     * @param a First operand
     * @param b Second operand
     * @return Sum of a and b
     * @throws RemoteException if remote communication fails
     */
    double add(double a, double b) throws RemoteException;

    /**
     * Subtracts second number from first
     * @param a First operand
     * @param b Second operand
     * @return Difference of a and b
     * @throws RemoteException if remote communication fails
     */
    double subtract(double a, double b) throws RemoteException;

    /**
     * Multiplies two numbers
     * @param a First operand
     * @param b Second operand
     * @return Product of a and b
     * @throws RemoteException if remote communication fails
     */
    double multiply(double a, double b) throws RemoteException;

    /**
     * Divides first number by second
     * @param a First operand (dividend)
     * @param b Second operand (divisor)
     * @return Quotient of a and b
     * @throws RemoteException if remote communication fails
     * @throws ArithmeticException if b is zero
     */
    double divide(double a, double b) throws RemoteException;
}
