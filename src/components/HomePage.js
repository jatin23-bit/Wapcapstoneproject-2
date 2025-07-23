import React from 'react';
import { Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: Calculator,
      title: 'Precise Calculations',
      description: 'Get accurate monthly payment calculations with detailed breakdowns.'
    },
    {
      icon: TrendingUp,
      title: 'Amortization Schedule',
      description: 'Visualize your payment schedule and see principal vs interest over time.'
    },
    {
      icon: PieChart,
      title: 'Interest Analysis',
      description: 'Understand total interest costs and payment distribution.'
    },
    {
      icon: BarChart3,
      title: 'Payment Scenarios',
      description: 'Compare different loan terms and interest rates.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Calculate your loan payments, understand interest costs, and visualize your repayment schedule with our comprehensive loan calculator tool.
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Calculating
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Calculate Your Loan?
          </h2>
          <p className="text-gray-600 mb-6">
            Get started with our easy-to-use loan calculator and make informed financial decisions.
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Calculate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;