import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Fade } from "react-awesome-reveal";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



const MyBills = () => {
    const { user, MySwal } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchMyBills = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            // const res = await fetch(`http://localhost:3000/my-bills?email=${user.email}`);
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
            // const res = await fetch(`http://localhost:3000/pay-bill/${id}`, { method: 'DELETE' });
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
                // const res = await fetch(`http://localhost:3000/pay-bill/${bill._id}`, {
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

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const now = DateTime.now().toFormat('yyyy-MM-dd HH:mm');
        const totalUSD = (totalAmount / 125).toFixed(2);

        doc.setFontSize(18);
        doc.text('My Bills Report', 14, 20);
        doc.setFontSize(14);
        doc.text(`Generated: ${now}`, 14, 30);
        doc.text(`User: ${user?.email || 'N/A'}`, 14, 37);
        doc.text(`Total Bills: ${bills.length}`, 14, 44);
        doc.text(`Total Amount: ${totalAmount.toLocaleString()}`, 14, 51);

        const tableData = bills.map(b => [
            b.username || 'N/A',
            b.email,
            `${b.amount}`,
            b.address,
            b.phone,
            b.time
        ]);

        autoTable(doc, {
            head: [['Username', 'Email', 'Amount', 'Address', 'Phone', 'Date']],
            body: tableData,
            startY: 60,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [88, 186, 1] }
        });

        doc.save(`utilify-report-${DateTime.now().toFormat('yyyy-MM-dd')}.pdf`);
    };

    if (loading) return <div className="flex justify-center pt-20 dark:text-white"><span className="loading loading-spinner loading-lg dark:text-white"></span></div>;

    return (
        <Fade>
            <div className="min-h-screen flex items-start justify-center dark:bg-[#1A1A1A] dark:text-white">
                <div className="my-bills-container max-w-7xl w-full p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">My Paid Bills</h2>
                        <div className="text-right">
                            <p className="text-2xl">Total Bills Paid: <strong>{bills.length}</strong></p>
                            <p className="text-2xl">Total Amount: <strong>৳{totalAmount.toLocaleString()} (${(totalAmount / 125).toFixed(2)})</strong></p>
                        </div>
                    </div>

                    <button onClick={handleDownloadPDF} className="btn rounded-2xl mb-6 hover:bg-[#58BA01]">
                        Download PDF Report
                    </button>

                    <div className="overflow-x-auto dark:text-white">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="dark:text-gray-500" >
                                    <th>Index</th>
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
                                            <button onClick={() => handleUpdate(bill)} className="btn btn-sm rounded-2xl border hover:bg-green-600">Update</button>
                                            <button onClick={() => handleDelete(bill._id)} className="btn btn-sm  rounded-2xl border hover:bg-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default MyBills;