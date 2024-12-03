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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Smart Expense Tracker</h1>

      {/* Input initial balance */}
      {expenses.length === 0 && (
        <div>
          <label>
            Enter Initial Balance: 
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* Expense Input Form */}
      <ExpenseInput
        balance={balance}
        setBalance={setBalance}
        addExpense={addExpense}
      />

      {/* Remaining Balance */}
      <h2>Remaining Balance: {balance.toFixed(2)}</h2>

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default ExpenseTracker;
