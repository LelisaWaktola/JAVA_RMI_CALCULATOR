import React from 'react';
import { Server, Database, Code2, Cloud } from 'lucide-react';

const InfoPanel = () => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Architecture Overview</h2>

            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="bg-blue-500 p-2 rounded-lg">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">Java RMI</h3>
                        <p className="text-sm text-gray-600">
                            Remote Method Invocation enables distributed computing by allowing method calls across JVMs
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="bg-green-500 p-2 rounded-lg">
                        <Server className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">Spring Boot</h3>
                        <p className="text-sm text-gray-600">
                            Backend framework managing RMI registry and exposing REST APIs
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="bg-orange-500 p-2 rounded-lg">
                        <Database className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">PostgreSQL</h3>
                        <p className="text-sm text-gray-600">
                            Supabase-hosted database storing calculation history and operations
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="bg-purple-500 p-2 rounded-lg">
                        <Cloud className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">AWS Ready</h3>
                        <p className="text-sm text-gray-600">
                            Designed for deployment on AWS EC2 with containerization support
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">How It Works</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                    <li>React UI sends calculation request to REST API</li>
                    <li>Spring Boot controller receives the request</li>
                    <li>Service layer invokes RMI remote method</li>
                    <li>RMI server performs calculation</li>
                    <li>Result is saved to PostgreSQL database</li>
                    <li>Response sent back to React frontend</li>
                </ol>
            </div>
        </div>
    );
};

export default InfoPanel;
