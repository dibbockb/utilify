import React, { useContext, useEffect, useState } from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { BsEthernet } from "react-icons/bs";
import { FaRegCircleDot } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router";

const Home = () => {
    const [allBids, setAllBids] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:3000/topbills`)
            .then((res) => res.json())
            .then((data) => setAllBids(data))
            .catch((err) => console.log(err));
    }, []);

    const handleSeeDetails = (id) => {
        navigate(`/bills/${id}`);

    };

    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setCurrent(c => (c + 1) % 4), 6000);
        return () => clearInterval(id);
    }, []);

    const handleNavigateToBills = () => {
        navigate('/bills')
    }

    return (

        <>
            <div className="hero-container w-full flex justify-center">
                <div className="max-w-7xl w-full px-4 pt-5 mt-8">
                    <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl ">
                        <div
                            className="absolute inset-0 flex transition-transform duration-200 ease-in-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            <div className="min-w-full bg-linear-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                                <div className="max-w-3xl mx-auto text-center px-6 text-white ">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Pay Electricity Bills in 30 Seconds</h1>
                                    <p className="text-lg md:text-xl mb-6 opacity-90">DESCO — no queues. tap and pay.</p>
                                    <br />
                                    <button onClick={handleNavigateToBills} className="btn btn-primary btn-lg shadow-lg rounded-3xl hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        Pay Electricity Now
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-full bg-linear-to-br from-teal-600 to-cyan-700 flex items-center justify-center">
                                <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Gas Bills? Done Before Your Cha Cools</h1>
                                    <p className="text-lg md:text-xl mb-6 opacity-90">Titas, Karnaphuli — instant receipt.</p>
                                    <br />

                                    <button onClick={handleNavigateToBills} className="btn btn-accent btn-lg rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        Pay Gas Bill
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-full bg-linear-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                                <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">WASA Water Bills — Paid While You Shower</h1>
                                    <p className="text-lg md:text-xl mb-6 opacity-90">Dhaka, Chittagong — track usage, avoid surprises.</p>
                                    <br />

                                    <button onClick={handleNavigateToBills} className="btn btn-info btn-lg rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        Pay Water Bill
                                    </button>
                                </div>
                            </div>

                            <div className="min-w-full bg-linear-to-br from-purple-700 to-pink-600 flex items-center justify-center">
                                <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">One App. All Bills. Zero Drama.</h1>
                                    <p className="text-lg md:text-xl mb-6 opacity-90">Electricity • Gas • Water • Internet • Mobile — all in one dashboard.</p>
                                    <br />

                                    <button onClick={handleNavigateToBills} className="btn btn-success btn-lg rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        View All Bills
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                            {[0, 1, 2, 3].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-white w-10' : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrent((c) => (c - 1 + 4) % 4)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                        >❮</button>
                        <button
                            onClick={() => setCurrent((c) => (c + 1) % 4)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                        >❯</button>
                    </div>
                </div>
            </div>



            {/* category cards */}
            <div className="w-full flex justify-center">
                <div className="max-w-7xl w-full px-4">
                    <div className="category-cards pb-5 pt-10 gap-6 flex justify-center items-center ">
                        <div className="category-card flex flex-col items-center text-center justify-center ">
                            <MdOutlineElectricBolt className="category-ico w-20 h-20"></MdOutlineElectricBolt>
                            <h4 className="text-4xl text-center pt-5">Electricity</h4>
                            <p className=" text-2xl w-55 pt-3 text-center">
                                Pay your power bill in 30 seconds. No lines. No hassle.
                            </p>
                        </div>

                        <div className="category-card flex flex-col items-center text-center justify-center ">
                            <FaGasPump className="category-ico w-20 h-20"></FaGasPump>
                            <h4 className="text-4xl text-center pt-5">Gas</h4>
                            <p className=" text-2xl w-50 pt-3 text-center">
                                Settle gas bills instantly. Cook without worry.
                            </p>
                        </div>

                        <div className="category-card flex flex-col items-center text-center justify-center ">
                            <FaHandHoldingWater className="category-ico w-20 h-20"></FaHandHoldingWater>
                            <h4 className="text-4xl text-center pt-5">Water</h4>
                            <p className=" text-2xl w-50 pt-3 text-center">
                                Pay WASA bills fast. Keep the flow running.
                            </p>
                        </div>

                        <div className="category-card flex flex-col items-center text-center justify-center ">
                            <BsEthernet className="category-ico w-20 h-20"></BsEthernet>
                            <h4 className="text-4xl text-center pt-5">Internet</h4>
                            <p className=" text-2xl w-50 pt-3 text-center">
                                Recharge broadband in one tap. Stay online.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* //mapping allBids */}
            <div className="w-full flex justify-center">
                <div className="max-w-7xl w-full px-4">
                    <div className="recent-container flex flex-col pt-10 justify-center items-center text-center gap-5">
                        <h6 className="text-4xl font-medium">Recent Bills</h6>
                        <div className="recent-cards pb-10 grid grid-cols-3 gap-5 ">
                            {allBids.slice(0, 6).map((allBid) => (
                                <div key={allBid._id ?? allBid.id} className="recent-card flex flex-col justify-between items-center gap-3 p-3 shadow-lg rounded-3xl h-[450px]">
                                    <img
                                        className="rounded-3xl w-full h-60"
                                        src={allBid.image}
                                        alt="recent-card-img"
                                    />

                                    <div className="flex w-full pl-2 justify-between">
                                        <div className="flex justify-center items-center">
                                            <h4 className="flex items-center gap-1 font-medium w-[200px] text-left text-2xl">
                                                {allBid.title}
                                            </h4>
                                        </div>
                                        <h4 className="flex justify-center items-center gap-1 font-light text-2xl text-right">
                                            {allBid.date}
                                        </h4>
                                    </div>

                                    <div className="flex w-full pl-2 justify-between">
                                        <h4 className="flex justify- items-center gap-1 font-light  text-left text-2xl">
                                            <FaRegCircleDot></FaRegCircleDot>
                                            {allBid.category}
                                        </h4>
                                        <h4 className="flex justify-center items-center gap-1 font-light text-right text-2xl">
                                            <MdLocationOn></MdLocationOn>
                                            {allBid.location}
                                        </h4>
                                    </div>

                                    <button
                                        onClick={() => handleSeeDetails(allBid._id)}
                                        className="recent-details-button w-full bg-[#58ba01] text-white rounded-4xl h-12 text-2xl mt-auto">
                                        See details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
