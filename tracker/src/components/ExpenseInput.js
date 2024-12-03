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
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Item:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-medium mb-2">Select a Category:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-500 hover:text-white transition`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleAddExpense}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseInput;
