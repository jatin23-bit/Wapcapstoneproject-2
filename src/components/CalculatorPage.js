import React, { useState } from 'react';
import { Calculator, IndianRupee, Calendar, Percent, TrendingUp, RotateCcw } from 'lucide-react';

const CalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState(null);
  const [amortization, setAmortization] = useState([]);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm) * 12;

    if (!principal || !monthlyRate || !numberOfPayments) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - principal;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });

    const schedule = [];
    let remainingBalance = principal;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        payment: i,
        monthlyPayment: monthlyPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        remainingBalance: Math.max(0, remainingBalance).toFixed(2)
      });
    }

    setAmortization(schedule);
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
    setAmortization([]);
    setShowAmortization(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Loan Calculator</h1>
          <p className="text-gray-600">Calculate your monthly payments and see the complete amortization schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Loan Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IndianRupee className="h-4 w-4 inline mr-1" />
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Percent className="h-4 w-4 inline mr-1" />
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter interest rate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Loan Term (Years)
                </label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter loan term in years"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={calculateLoan}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                  Calculate
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
              Calculation Results
            </h2>

            {results ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Monthly Payment</div>
                  <div className="text-2xl font-bold text-blue-800">₹{results.monthlyPayment}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Total Amount Paid</div>
                  <div className="text-2xl font-bold text-green-800">₹{results.totalAmount}</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">Total Interest Paid</div>
                  <div className="text-2xl font-bold text-red-800">₹{results.totalInterest}</div>
                </div>

                <button
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter loan details and click calculate to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Amortization Schedule */}
        {showAmortization && amortization.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Amortization Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Payment #</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Monthly Payment</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Principal</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Interest</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortization.slice(0, 12).map((payment) => (
                    <tr key={payment.payment} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{payment.payment}</td>
                      <td className="border border-gray-200 px-4 py-2">${payment.monthlyPayment}</td>
                      <td className="border border-gray-200 px-4 py-2">${payment.principalPayment}</td>
                      <td className="border border-gray-200 px-4 py-2">${payment.interestPayment}</td>
                      <td className="border border-gray-200 px-4 py-2">${payment.remainingBalance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {amortization.length > 12 && (
                <div className="text-center mt-4">
                  <p className="text-gray-500">
                    Showing first 12 payments of {amortization.length} total payments
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;