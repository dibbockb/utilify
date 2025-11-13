import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from './Context';
import { DateTime } from 'luxon';

const BillDetails = () => {
    const { id } = useParams();
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (!id) return;
        fetch(`https://b12a10-utility-management-server.vercel.app/bills/${id}`)
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

    const isBillCurrentMonth = () => {
        if (!bill || !bill.date) return false;
        const billDate = DateTime.fromISO(bill.date);
        const currentDate = DateTime.now();
        return billDate.month === currentDate.month && billDate.year === currentDate.year;
    };

    const handlePayButton = async () => {
        const currentMonth = DateTime.now().toFormat('yyyy-MM');

        const result = await MySwal.fire({
            title: 'Pay Bill',
            html: `
                <input id="email" class="swal2-input" value="${user.email || ''}" readonly>
                <input id="billid" class="swal2-input" value="${id}" readonly>
                <input id="amount" class="swal2-input" value="৳${bill.amount} ($${(bill.amount / 125).toFixed(2)} USD)" readonly>
                <input id="username" class="swal2-input" placeholder="Username" required>
                <input id="address" class="swal2-input" placeholder="Address" required>
                <input id="time" class="swal2-input" type="month" placeholder="Select Month" value="${currentMonth}" required>
                <div id="month-warning" style="color: red; font-size: 14px; margin-top: 5px; display: none;">
                    ⚠️ Only current month is allowed
                </div>
                <input id="phone" class="swal2-input" placeholder="Phone" required>
                <textarea id="info" class="swal2-textarea" placeholder="Additional Info (optional)"></textarea>
            `,
            didOpen: () => {
                const timeInput = document.getElementById('time');
                const confirmButton = MySwal.getConfirmButton();
                const warning = document.getElementById('month-warning');

                const checkMonth = () => {
                    const selectedMonth = timeInput.value;
                    const isCurrentMonth = selectedMonth === currentMonth;

                    if (isCurrentMonth) {
                        confirmButton.disabled = false;
                        confirmButton.style.opacity = '1';
                        confirmButton.style.cursor = 'pointer';
                        warning.style.display = 'none';
                    } else {
                        confirmButton.disabled = true;
                        confirmButton.style.opacity = '0.5';
                        confirmButton.style.cursor = 'not-allowed';
                        warning.style.display = 'block';
                    }
                };

                timeInput.addEventListener('change', checkMonth);
                timeInput.addEventListener('input', checkMonth);

                checkMonth();
            },
            showCancelButton: true,
            confirmButtonText: 'Pay Now',
            preConfirm: () => {
                const username = document.getElementById('username').value;
                const address = document.getElementById('address').value;
                const phone = document.getElementById('phone').value;
                const time = document.getElementById('time').value;
                const info = document.getElementById('info').value;

                if (!username || !address || !phone || !time) {
                    MySwal.showValidationMessage('All fields are required');
                    return false;
                }

                const selectedMonth = DateTime.fromISO(time + '-01');
                const current = DateTime.now();

                if (
                    selectedMonth.month !== current.month ||
                    selectedMonth.year !== current.year
                ) {
                    MySwal.showValidationMessage('Please select the current month only');
                    return false;
                }

                return { username, address, phone, time, info };
            }
        });

        if (result.isConfirmed) {
            const formData = {
                email: user.email || '',
                billId: id,
                amount: bill.amount,
                ...result.value
            };

            try {
                const res = await fetch('https://b12a10-utility-management-server.vercel.app/pay-bill', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!res.ok) throw new Error();
                MySwal.fire('Successful!', 'Your bill has been paid successfully!', 'success');
            } catch {
                MySwal.fire('Failed', 'Something went wrong!', 'error');
            }
        }
    };

    if (loading) return <div className="flex justify-center items-center pt-10"><span className="loading loading-spinner loading-lg text-neutral"></span></div>;
    if (error) return <p className="text-center text-red-500 text-2xl mt-10">{error}</p>;
    if (!bill) return <p className="text-center text-2xl mt-10">No bill found.</p>;

    const canPayBill = isBillCurrentMonth();

    return (
        <div className="flex justify-center pt-10 pb-10">
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-3xl flex flex-col justify-center">
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

                {!canPayBill && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
                        <p className="text-red-700 text-lg font-semibold">
                            ⚠️ This bill is not from the current month. Only current month bills can be paid.
                        </p>
                    </div>
                )}

                <button
                    onClick={handlePayButton}
                    disabled={!canPayBill}
                    className={`mt-8 w-full py-4 rounded-2xl text-2xl font-medium transition ${canPayBill
                        ? 'bg-[#58ba01] text-white hover:bg-green-600 cursor-pointer'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                        }`}
                >
                    {canPayBill ? 'Pay Now' : 'Cannot Pay - Not Current Month'}
                </button>
            </div>
        </div>
    );
};

export default BillDetails;