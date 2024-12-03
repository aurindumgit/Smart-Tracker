import React, { useState } from 'react';
import ExpenseInput from './ExpenseInput';
import ExpenseTable from './ExpenseTable';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
      <h2 className="text-lg font-semibold mt-6">Remaining Balance: ₹{balance.toFixed(2)}</h2>

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default ExpenseTracker;
