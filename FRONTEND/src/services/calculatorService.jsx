const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const calculatorService = {
    async calculate(operand1, operand2, operation) {
        try {
            const response = await fetch(`${API_BASE_URL}/calculator/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    operand1,
                    operand2,
                    operation,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Calculation failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error calculating:', error);
            throw error;
        }
    },

    async getHistory() {
        try {
            const response = await fetch(`${API_BASE_URL}/calculator/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch history');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching history:', error);
            throw error;
        }
    },

    async checkHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/calculator/health`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Health check failed');
            }

            return await response.text();
        } catch (error) {
            console.error('Error checking health:', error);
            throw error;
        }
    },
};
