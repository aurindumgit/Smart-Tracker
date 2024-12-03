import React from 'react';

const ExpenseTable = ({ expenses }) => {
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div style={{ marginTop: '20px' }}>
      {expenses.length > 0 ? (
        <div>
          <h3>Expenses by Category:</h3>
          {Object.keys(groupedExpenses).map((category) => (
            <div key={category} style={{ marginBottom: '20px' }}>
              <h4>{category}</h4>
              <table border="1" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedExpenses[category].map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.item}</td>
                      <td>{expense.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses added yet.</p>
      )}
    </div>
  );
};

export default ExpenseTable;
