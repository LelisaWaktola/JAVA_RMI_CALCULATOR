import React from 'react';
import { History, Trash2 } from 'lucide-react';

const HistoryPanel = ({ history }) => {
    const getOperationSymbol = (operation) => {
        const symbols = {
            ADD: '+',
            SUBTRACT: '-',
            MULTIPLY: '×',
            DIVIDE: '÷',
        };
        return symbols[operation] || operation;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <History className="w-8 h-8 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Calculation History</h2>
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p>No calculations yet</p>
                        <p className="text-sm mt-2">Start calculating to see history</p>
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-800">
                                        {item.operand1} {getOperationSymbol(item.operationType)} {item.operand2} = {item.result}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {formatDate(item.createdAt)}
                                    </div>
                                </div>
                                <div className="ml-4">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-1 rounded">
                    {item.operationType}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                        Showing last {history.length} operations
                    </p>
                </div>
            )}
        </div>
    );
};

export default HistoryPanel;
