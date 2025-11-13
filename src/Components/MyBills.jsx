import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MyBills = () => {
    const { user } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const MySwal = withReactContent(Swal);


    const fetchMyBills = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`https://b12a10-utility-management-server.vercel.app/my-bills?email=${user.email}`);
            const data = await res.json();
            setBills(data);
            const total = data.reduce((sum, b) => sum + b.amount, 0);
            setTotalAmount(total);
        } catch (err) {
            MySwal.fire('Error', 'Failed to load your bills.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBills();
    }, [user]);

    const handleDelete = async (id) => {
        const result = await MySwal.fire({
            title: 'Delete Bill?',
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
        });
        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`https://b12a10-utility-management-server.vercel.app/pay-bill/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            setBills(bills.filter(b => b._id !== id));
            setTotalAmount(totalAmount - bills.find(b => b._id === id).amount);
            MySwal.fire('Deleted!', '', 'success');
        } catch {
            MySwal.fire('Failed', 'Could not delete.', 'error');
        }
    };

    const handleUpdate = async (bill) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Update Bill',
            html: `
                <input id="amount" class="swal2-input" value="${bill.amount}" type="number" placeholder="Amount">
                <input id="address" class="swal2-input" value="${bill.address}" placeholder="Address">
                <input id="phone" class="swal2-input" value="${bill.phone}" placeholder="Phone">
                <input id="time" class="swal2-input" type="month" value="${bill.time}" required>
            `,
            focusConfirm: false,
            preConfirm: () => ({
                amount: parseFloat(document.getElementById('amount').value),
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                time: document.getElementById('time').value,
            })
        });

        if (formValues) {
            try {
                const res = await fetch(`https://b12a10-utility-management-server.vercel.app/pay-bill/${bill._id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formValues)
                });
                if (!res.ok) throw new Error();
                fetchMyBills();
                MySwal.fire('Updated!', '', 'success');
            } catch {
                MySwal.fire('Failed', 'Update failed.', 'error');
            }
        }
    };

    const handleDownloadReport = () => {
        const csv = [
            ['Username', 'Email', 'Amount (৳)', 'Amount (USD)', 'Address', 'Phone', 'Date'],
            ...bills.map(b => [
                b.username, b.email, b.amount, (b.amount / 125).toFixed(2), b.address, b.phone, b.time
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `my-bills-report-${DateTime.now().toFormat('yyyy-MM-dd')}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="flex justify-center pt-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold">My Paid Bills</h2>
                <div className="text-right">
                    <p className="text-2xl">Total Bills Paid: <strong>{bills.length}</strong></p>
                    <p className="text-2xl">Total Amount: <strong>৳{totalAmount.toLocaleString()} (${(totalAmount / 125).toFixed(2)} USD)</strong></p>
                </div>
            </div>

            <button onClick={handleDownloadReport} className="btn btn-success mb-6">Download Report</button>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill._id}>
                                <td>{bill.username}</td>
                                <td>{bill.email}</td>
                                <td>৳{bill.amount} (${(bill.amount / 125).toFixed(2)} USD)</td>
                                <td>{bill.address}</td>
                                <td>{bill.phone}</td>
                                <td>{bill.time}</td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleUpdate(bill)} className="btn btn-sm btn-warning">Update</button>
                                    <button onClick={() => handleDelete(bill._id)} className="btn btn-sm btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBills;