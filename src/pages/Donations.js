import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import ContactModal from '../components/ContactModal';

function Donations() {
  const [items, setItems] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchDonations = async () => {
      const itemsRef = collection(db, 'items');
      const q = query(itemsRef, where('type', '==', 'Donate'), where('isSold', '==', false));
      const querySnapshot = await getDocs(q);
      setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchDonations();
  }, []);

  const markAsTaken = async (id) => {
    await updateDoc(doc(db, 'items', id), { isSold: true });
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Size: {item.size}</p>
            <p>Condition: {item.condition}</p>
            <p className="mt-2">Free Donation</p>

            <button 
              onClick={() => { setSelectedEmail(item.sellerEmail); setShowModal(true); }}
              className="inline-block mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Contact Donor
            </button>

            {currentUser && currentUser.uid === item.userId && (
              <button 
                onClick={() => markAsTaken(item.id)} 
                className="ml-2 px-4 py-1 bg-red-500 text-white rounded"
              >
                Mark as Taken
              </button>
            )}
          </div>
        ))}
      </div>

      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        email={selectedEmail} 
      />
    </>
  );
}

export default Donations;
