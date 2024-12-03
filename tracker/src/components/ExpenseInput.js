import React, { useState } from 'react';

const ExpenseInput = ({ balance, setBalance, addExpense }) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['Grocery', 'Food', 'Shopping', 'Entertainment', 'Bills'];

  const handleAddExpense = () => {
    if (item && price && selectedCategory) {
      addExpense({ item, price: parseFloat(price), category: selectedCategory });
      setBalance(balance - parseFloat(price));
      setItem('');
      setPrice('');
      setSelectedCategory(null);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
      <div style={{ marginTop: '10px' }}>
        <p>Select a Category:</p>
        {categories.map((category) => (
          <button
            key={category}
            style={{
              margin: '5px',
              padding: '10px 15px',
              backgroundColor: selectedCategory === category ? 'blue' : 'lightgreen',
              color: selectedCategory === category ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: selectedCategory === category ? 1 : 0.6,
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button onClick={handleAddExpense} style={{ marginTop: '10px' }}>
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseInput;
