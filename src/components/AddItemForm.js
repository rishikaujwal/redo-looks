import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';

function AddItemForm() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    size: '',
    condition: '',
    price: '',
    type: '' // "Donate" or "Resale"
  });

  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type) return alert("Select item type");

    const itemData = {
      name: form.name,
      category: form.category,
      size: form.size,
      condition: form.condition,
      price: parseFloat(form.price),
      type: form.type,
      isSold: false,
      sellerEmail: currentUser.email,
      userId: currentUser.uid,
      createdAt: new Date()
    };

    await addDoc(collection(db, 'items'), itemData);
    alert("Item submitted!");
    setForm({ name: '', category: '', size: '', condition: '', price: '', type: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add a Clothing Item</h2>

      <input type="text" name="name" placeholder="Item Name" onChange={handleChange} value={form.name} required className="w-full p-2 border rounded" />

      <input type="text" name="category" placeholder="Category (e.g. Shirt, Pants)" onChange={handleChange} value={form.category} required className="w-full p-2 border rounded" />

      <input type="text" name="size" placeholder="Size" onChange={handleChange} value={form.size} required className="w-full p-2 border rounded" />

      <input type="text" name="condition" placeholder="Condition" onChange={handleChange} value={form.condition} required className="w-full p-2 border rounded" />

      <input type="number" name="price" placeholder="Price (0 if donating)" onChange={handleChange} value={form.price} required className="w-full p-2 border rounded" />

      <div className="flex space-x-4">
        <label>
          <input type="radio" name="type" value="Donate" onChange={handleChange} checked={form.type === 'Donate'} /> Donate
        </label>
        <label>
          <input type="radio" name="type" value="Resale" onChange={handleChange} checked={form.type === 'Resale'} /> Resale
        </label>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default AddItemForm;
