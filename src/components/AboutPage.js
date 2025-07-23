import React from 'react';
import { Shield, Users, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your financial information is processed securely with industry-standard encryption.'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Designed with simplicity in mind, making loan calculations accessible to everyone.'
    },
    {
      icon: Award,
      title: 'Accurate Results',
      description: 'Powered by precise financial algorithms to give you reliable calculations.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Built to help you make better financial decisions with clear, actionable insights.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About LoanCalc Pro</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making loan calculations simple, accurate, and accessible for everyone. 
            Our mission is to empower you with the tools and knowledge needed to make informed financial decisions.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                LoanCalc Pro was born from a simple idea: financial calculations shouldn't be complicated or confusing. 
                We noticed that many people struggled with understanding loan terms, monthly payments, and the true cost of borrowing.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of financial experts and developers came together to create a tool that not only calculates loan payments 
                but also educates users about the financial implications of their borrowing decisions.
              </p>
              <p className="text-gray-600">
                Today, thousands of users trust LoanCalc Pro to help them make smarter financial choices, whether they're 
                buying their first home, financing a car, or planning for other major purchases.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-700 mb-4">Loans Calculated</div>
                <div className="text-4xl font-bold text-green-600 mb-2">$2.5B+</div>
                <div className="text-gray-700 mb-4">Total Loan Amount</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-700">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;