package com.rmi.calculator.config;

import com.rmi.calculator.rmi.CalculatorRMI;
import com.rmi.calculator.rmi.CalculatorRMIImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * Configuration class for RMI Server
 * Sets up the RMI registry and binds the calculator service
 */
@Configuration
public class RMIServerConfig {

    @Value("${rmi.port:1099}")
    private int rmiPort;

    @Value("${rmi.service.name:CalculatorService}")
    private String serviceName;

    @Autowired
    private CalculatorRMIImpl calculatorRMIImpl;

    @Bean
    public Registry rmiRegistry() throws RemoteException {
        try {
            Registry registry = LocateRegistry.createRegistry(rmiPort);
            registry.rebind(serviceName, calculatorRMIImpl);
            System.out.println("RMI Server started successfully on port " + rmiPort);
            System.out.println("Calculator service bound to: " + serviceName);
            return registry;
        } catch (RemoteException e) {
            System.err.println("Failed to start RMI server: " + e.getMessage());
            throw e;
        }
    }
}
