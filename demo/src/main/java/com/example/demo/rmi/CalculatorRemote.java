package com.example.demo.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface CalculatorRemote extends Remote {
    double add(double a, double b) throws RemoteException;
    double subtract(double a, double b) throws RemoteException;
    double multiply(double a, double b) throws RemoteException;
    double divide(double a, double b) throws RemoteException;
    String getServerInfo() throws RemoteException;
}
