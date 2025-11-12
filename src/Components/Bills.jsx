import React, { useEffect, useState } from 'react';
import { FaRegCircleDot } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from 'react-router';


const Bills = () => {
    const [bs, setAllbills] = useState([]);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const params = category ? `?category=${category}` : '';
        fetch(`http://localhost:3000/bills${params}`)
            .then(res => res.json())
            .then(data => setAllbills(data))
            .catch(error => console.log(error)
            )
    }, [category]);

    const handleSeeDetails = (id) => {
        navigate(`/bills/${id}`);
    };

    const filtered = bs.filter(b => !category || b.category === category);

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="max-w-7xl w-full px-4">
                    <div className="recent-container flex flex-col pt-10 justify-center items-center text-center gap-5">
                        <h6 className="text-4xl font-medium">All Bills</h6>

                        <select value={category} onChange={e => setCategory(e.target.value)} className="select select-bordered text-2xl bg-gray-200 rounded-2xl">
                            <option className="dropdown-option" value="">All</option>
                            <option className="dropdown-option">Electricity</option>
                            <option className="dropdown-option">Gas</option>
                            <option className="dropdown-option">Mobile</option>
                            <option className="dropdown-option">Internet</option>
                            <option className="dropdown-option">Water</option>
                        </select>

                        <div className="recent-cards pb-10 grid grid-cols-3 gap-5 ">
                            {filtered.map((b) => (
                                <div key={b._id ?? b.id} className="recent-card flex flex-col justify-between items-center gap-3 p-3 shadow-lg rounded-3xl h-[450px]">
                                    <img
                                        className="rounded-3xl w-full h-60"
                                        src={b.image}
                                        alt="recent-card-img"
                                    />

                                    <div className="flex w-full pl-2 justify-between">
                                        <div className="flex justify-center items-center">
                                            <h4 className="flex items-center gap-1 font-medium w-[200px] text-left text-2xl">
                                                {b.title}
                                            </h4>
                                        </div>
                                        <h4 className="flex justify-center items-center gap-1 font-light text-2xl text-right">
                                            {b.date}
                                        </h4>
                                    </div>

                                    <div className="flex w-full pl-2 justify-between">
                                        <h4 className="flex justify- items-center gap-1 font-light  text-left text-2xl">
                                            <FaRegCircleDot></FaRegCircleDot>
                                            {b.category}
                                        </h4>
                                        <h4 className="flex justify-center items-center gap-1 font-light text-right text-2xl">
                                            <MdLocationOn></MdLocationOn>
                                            {b.location}
                                        </h4>
                                    </div>

                                    <button
                                        onClick={() => handleSeeDetails(b._id)}
                                        className="recent-details-button w-full bg-[#58ba01] text-white rounded-4xl h-12 text-2xl mt-auto">
                                        See details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bills;