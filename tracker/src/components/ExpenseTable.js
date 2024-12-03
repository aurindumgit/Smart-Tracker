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
    <div className="mt-8">
      {expenses.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold mb-4">Expenses by Category:</h3>
          {Object.keys(groupedExpenses).map((category) => (
            <div key={category} className="mb-6">
              <h4 className="text-md font-semibold mb-2">{category}</h4>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedExpenses[category].map((expense, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{expense.item}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        ₹{expense.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No expenses added yet.</p>
      )}
    </div>
  );
};

export default ExpenseTable;
