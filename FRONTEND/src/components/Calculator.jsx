import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

const Calculator = ({ onCalculate }) => {
    const [display, setDisplay] = useState('0');
    const [operand1, setOperand1] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const handleDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const handleOperation = (op) => {
        const inputValue = parseFloat(display);

        if (operand1 === null) {
            setOperand1(inputValue);
        } else if (operation) {
            const result = performCalculation();
            setDisplay(String(result));
            setOperand1(result);
        }

        setWaitingForOperand(true);
        setOperation(op);
    };

    const performCalculation = async () => {
        const inputValue = parseFloat(display);

        if (operand1 === null || !operation) {
            return inputValue;
        }

        const result = await onCalculate({
            operand1: operand1,
            operand2: inputValue,
            operation: operation,
        });

        return result;
    };

    const handleEquals = async () => {
        const result = await performCalculation();
        setDisplay(String(result));
        setOperand1(null);
        setOperation(null);
        setWaitingForOperand(true);
    };

    const handleClear = () => {
        setDisplay('0');
        setOperand1(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const handleSign = () => {
        const value = parseFloat(display);
        setDisplay(String(value * -1));
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
                <CalcIcon className="w-8 h-8 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">RMI Calculator</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="text-right">
                    <div className="text-sm text-gray-400 h-6 mb-1">
                        {operand1 !== null && operation && (
                            <span>{operand1} {operation === 'ADD' ? '+' : operation === 'SUBTRACT' ? '-' : operation === 'MULTIPLY' ? '×' : '÷'}</span>
                        )}
                    </div>
                    <div className="text-4xl font-bold text-white break-all">
                        {display}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <button onClick={handleClear} className="calculator-button-clear col-span-2">
                    AC
                </button>
                <button onClick={handleSign} className="calculator-button-secondary bg-gray-300 hover:bg-gray-400 text-gray-800">
                    +/-
                </button>
                <button onClick={() => handleOperation('DIVIDE')} className="calculator-button-operator">
                    ÷
                </button>

                <button onClick={() => handleNumber(7)} className="calculator-button-number">7</button>
                <button onClick={() => handleNumber(8)} className="calculator-button-number">8</button>
                <button onClick={() => handleNumber(9)} className="calculator-button-number">9</button>
                <button onClick={() => handleOperation('MULTIPLY')} className="calculator-button-operator">×</button>

                <button onClick={() => handleNumber(4)} className="calculator-button-number">4</button>
                <button onClick={() => handleNumber(5)} className="calculator-button-number">5</button>
                <button onClick={() => handleNumber(6)} className="calculator-button-number">6</button>
                <button onClick={() => handleOperation('SUBTRACT')} className="calculator-button-operator">-</button>

                <button onClick={() => handleNumber(1)} className="calculator-button-number">1</button>
                <button onClick={() => handleNumber(2)} className="calculator-button-number">2</button>
                <button onClick={() => handleNumber(3)} className="calculator-button-number">3</button>
                <button onClick={() => handleOperation('ADD')} className="calculator-button-operator">+</button>

                <button onClick={() => handleNumber(0)} className="calculator-button-number col-span-2">0</button>
                <button onClick={handleDecimal} className="calculator-button-number">.</button>
                <button onClick={handleEquals} className="calculator-button-equals">=</button>
            </div>
        </div>
    );
};

export default Calculator;
