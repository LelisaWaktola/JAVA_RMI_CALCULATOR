package com.example.demo.rmi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

@Component
public class RMIRegistry implements CommandLineRunner {

    @Value("${rmi.registry.port:1099}")
    private int rmiPort;

    @Value("${rmi.service.name:CalculatorService}")
    private String serviceName;

    private final CalculatorImpl calculatorImpl;

    public RMIRegistry(CalculatorImpl calculatorImpl) {
        this.calculatorImpl = calculatorImpl;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            Registry registry = LocateRegistry.createRegistry(rmiPort);
            registry.rebind(serviceName, calculatorImpl);
            System.out.println("RMI Registry started on port " + rmiPort);
            System.out.println("Calculator service registered as: " + serviceName);
        } catch (RemoteException e) {
            System.err.println("RMI Registry already running on port " + rmiPort);
            try {
                Registry registry = LocateRegistry.getRegistry(rmiPort);
                registry.rebind(serviceName, calculatorImpl);
                System.out.println("Calculator service re-registered as: " + serviceName);
            } catch (RemoteException ex) {
                System.err.println("Failed to initialize RMI Registry: " + ex.getMessage());
                throw ex;
            }
        }
    }
}
