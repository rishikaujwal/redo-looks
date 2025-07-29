import React from 'react';
import AddItemForm from '../components/AddItemForm';

function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8">Dashboard</h1>
      <AddItemForm />
      {/* Optionally, you can render resale or donation items here */}
    </div>
  );
}

export default Dashboard;
