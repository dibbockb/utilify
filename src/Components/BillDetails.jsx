import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const BillDetails = () => {

    const { id } = useParams();
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/bills/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Bill not found');
                return res.json();
            })
            .then(data => {
                setBill(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center text-2xl mt-10">Loading bill...</p>;
    if (error) return <p className="text-center text-red-500 text-2xl mt-10">{error}</p>;
    if (!bill) return <p className="text-center text-2xl mt-10">No bill found.</p>;

    return (
        <div className="flex justify-center pt-10 pb-10">
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-3xl flex flex-col justify-center ">
                <img src={bill.image} alt={bill.title} className="w-full h-80 object-cover rounded-2xl" />
                <div className="flex items-center pt-10 justify-between">
                    <h1 className="text-4xl font-bold">{bill.title}</h1>
                    <p className="text-2xl text-gray-600 mt-2">{bill.date}</p>
                </div>

                <div className="flex items-center pt-2 justify-between text-2xl">
                    <p><strong>Category:</strong> {bill.category}</p>
                    <p><strong>Location:</strong> {bill.location}</p>
                </div>

                <div className="text-2xl pb-5">
                    <p className="mt-6 text-2xl"><strong>Amount:</strong> ৳{bill.amount || 'N/A'} (${(bill.amount / 125).toFixed(2)} USD)</p>
                    <p className="mt-4 text-2xl"><strong>Description:</strong> {bill.description || 'No details available.'}</p>
                </div>

                <button className="mt-8 w-full bg-[#58ba01] text-white py-4 rounded-2xl text-2xl font-medium hover:bg-green-600 transition ">
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default BillDetails;