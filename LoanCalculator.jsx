import { useState, useEffect } from 'react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  useEffect(() => {
    calculateLoanDetails();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoanDetails = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseInt(loanTerm);

    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);
    
    const monthlyPaymentValue = isFinite(monthly) ? monthly : 0;
    setMonthlyPayment(monthlyPaymentValue);
    
    const totalPaymentValue = monthlyPaymentValue * numberOfPayments;
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalPaymentValue - principal);
    
    generateAmortizationSchedule(principal, monthlyRate, monthlyPaymentValue, numberOfPayments);
  };

  const generateAmortizationSchedule = (principal, monthlyRate, monthlyPayment, numberOfPayments) => {
    let balance = principal;
    let totalInterest = 0;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyRate;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      totalInterest += interest;

      schedule.push({
        paymentNumber: i,
        payment: monthlyPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interest: interest.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        balance: Math.max(0, balance).toFixed(2)
      });

      if (balance <= 0) break;
    }

    setAmortizationSchedule(schedule);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Loan Calculator</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Loan Information</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Loan Amount</label>
            <div className="flex items-center">
              <span className="bg-gray-200 px-3 py-2 rounded-l">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, e.target.value))}
                className="w-full p-2 border rounded-r focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Interest Rate (% per year)</label>
            <div className="flex items-center">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, e.target.value))}
                step="0.1"
                className="w-full p-2 border rounded-l focus:outline-none focus:ring focus:border-blue-300"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r">%</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Loan Term (months)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Summary</h2>
          
          <div className="mb-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Monthly Payment:</span>
              <span className="font-semibold text-blue-600">{formatCurrency(monthlyPayment)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Total of {loanTerm} Payments:</span>
              <span className="font-semibold text-blue-600">{formatCurrency(totalPayment)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-semibold text-blue-600">{formatCurrency(totalInterest)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              {showAmortization ? 'Hide Amortization Schedule' : 'Show Amortization Schedule'}
            </button>
          </div>
        </div>
      </div>
      
      {showAmortization && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Amortization Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Payment #</th>
                  <th className="p-2 border text-left">Payment</th>
                  <th className="p-2 border text-left">Principal</th>
                  <th className="p-2 border text-left">Interest</th>
                  <th className="p-2 border text-left">Total Interest</th>
                  <th className="p-2 border text-left">Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortizationSchedule.map((row) => (
                  <tr key={row.paymentNumber} className="hover:bg-gray-50">
                    <td className="p-2 border">{row.paymentNumber}</td>
                    <td className="p-2 border">{formatCurrency(row.payment)}</td>
                    <td className="p-2 border">{formatCurrency(row.principalPayment)}</td>
                    <td className="p-2 border">{formatCurrency(row.interest)}</td>
                    <td className="p-2 border">{formatCurrency(row.totalInterest)}</td>
                    <td className="p-2 border">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}