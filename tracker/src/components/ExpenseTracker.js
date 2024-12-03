import React, { useState } from 'react';
import ExpenseInput from './ExpenseInput';
import ExpenseTable from './ExpenseTable';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [exceededExpense, setExceededExpense] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expense Distribution',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF']; // Colors for categories

  const updateChartData = (newExpense, affordablePortion) => {
    const remainingBalance = balance - affordablePortion; // Updated balance
    const newLabels = [...chartData.labels];
    const newData = [...chartData.datasets[0].data];
    const newColors = [...chartData.datasets[0].backgroundColor];

    // Add category or update its percentage
    const categoryIndex = newLabels.indexOf(newExpense.category);
    if (categoryIndex === -1) {
      // New category
      newLabels.push(newExpense.category);
      newData.push(affordablePortion);
      newColors.push(COLORS[newLabels.length % COLORS.length]); // Assign color
    } else {
      // Update existing category
      newData[categoryIndex] += affordablePortion;
    }

    // Update remaining balance in chart
    const remainingIndex = newLabels.indexOf('Remaining Balance');
    if (remainingIndex === -1 && remainingBalance > 0) {
      newLabels.push('Remaining Balance');
      newData.push(remainingBalance);
      newColors.push('#28A745'); // Green for remaining balance
    } else if (remainingBalance <= 0 && remainingIndex !== -1) {
      newLabels.splice(remainingIndex, 1); // Remove 'Remaining Balance'
      newData.splice(remainingIndex, 1);
      newColors.splice(remainingIndex, 1);
    } else if (remainingIndex !== -1) {
      newData[remainingIndex] = remainingBalance; // Update remaining balance
    }

    // Update chart data state
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Expense Distribution',
          data: newData,
          backgroundColor: newColors,
        },
      ],
    });
  };

  const addExpense = (expense) => {
    const { price } = expense;

    if (price > balance) {
      const affordablePortion = balance; // Remaining balance that can be spent
      const exceedingAmount = price - balance;

      // Update balance to 0, track exceeded expense
      setBalance(0);
      setExceededExpense(exceedingAmount);

      // Add only the affordable portion to the expense table
      if (affordablePortion > 0) {
        setExpenses([...expenses, { ...expense, price: affordablePortion }]);
        updateChartData(expense, affordablePortion);
      }
    } else {
      // Normal case: Deduct full amount from balance
      setBalance(balance - price);
      setExceededExpense(0); // No exceeded expense
      setExpenses([...expenses, expense]);
      updateChartData(expense, price);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Smart Expense Tracker</h1>

      {/* Input initial balance */}
      {expenses.length === 0 && (
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Enter Initial Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value))}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your starting balance"
          />
        </div>
      )}

      {/* Expense Input Form */}
      <ExpenseInput balance={balance} setBalance={setBalance} addExpense={addExpense} />

      {/* Remaining Balance */}
      <h2 className="text-lg font-semibold mt-6">
        Remaining Balance: ₹{balance.toFixed(2)}
      </h2>

      {/* Exceeded Expense (if any) */}
      {exceededExpense > 0 && (
        <h3 className="text-md font-semibold text-red-500 mt-2">
          Exceeded Expense: ₹{exceededExpense.toFixed(2)}
        </h3>
      )}

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />

      {/* Pie Chart */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">Expense Distribution:</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseTracker;
