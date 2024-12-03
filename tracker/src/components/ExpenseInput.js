import React, { useState } from 'react';

const ExpenseInput = ({ balance, setBalance, addExpense }) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    if (item && price && category) {
      addExpense({ item, price: parseFloat(price), category });
      setBalance(balance - parseFloat(price));
      setItem('');
      setPrice('');
      setCategory('');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <label>
        Item:
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
        </select>
      </label>
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseInput;
