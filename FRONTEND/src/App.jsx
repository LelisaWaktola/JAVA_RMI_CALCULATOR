import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import HistoryPanel from './components/HistoryPanel';
import InfoPanel from './components/InfoPanel';
import { calculatorService } from './services/calculatorService';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

function App() {
    const [history, setHistory] = useState([]);
    const [serverStatus, setServerStatus] = useState('checking');
    const [error, setError] = useState(null);

    useEffect(() => {
        checkServerHealth();
        fetchHistory();
    }, []);

    const checkServerHealth = async () => {
        try {
            await calculatorService.checkHealth();
            setServerStatus('online');
        } catch (err) {
            setServerStatus('offline');
        }
    };

    const fetchHistory = async () => {
        try {
            const data = await calculatorService.getHistory();
            setHistory(data);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        }
    };

    const handleCalculate = async ({ operand1, operand2, operation }) => {
        try {
            setError(null);
            const response = await calculatorService.calculate(operand1, operand2, operation);

            if (!response.success) {
                setError(response.message);
                return 0;
            }

            await fetchHistory();
            return response.result;
        } catch (err) {
            setError(err.message || 'Calculation failed');
            return 0;
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Java RMI Calculator
                    </h1>
                    <p className="text-xl text-white opacity-90 mb-4">
                        Distributed Computing with Spring Boot, PostgreSQL & React
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Activity className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">RMI Server Status:</span>
                            {serverStatus === 'online' ? (
                                <span className="flex items-center gap-1 text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Online
                </span>
                            ) : serverStatus === 'offline' ? (
                                <span className="flex items-center gap-1 text-red-300">
                  <AlertCircle className="w-4 h-4" />
                  Offline
                </span>
                            ) : (
                                <span className="text-yellow-300">Checking...</span>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <Calculator onCalculate={handleCalculate} />
                    </div>

                    <div className="lg:col-span-1">
                        <HistoryPanel history={history} />
                    </div>

                    <div className="lg:col-span-1">
                        <InfoPanel />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
                        <h3 className="text-white font-bold text-lg mb-3">Technology Stack</h3>
                        <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                Java RMI
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                Spring Boot 3.2
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                PostgreSQL
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                React 18
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                Supabase
              </span>
                            <span className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                AWS Ready
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
