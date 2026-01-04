import React, { useEffect, useState } from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { FaGasPump, FaRegCheckCircle } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { BsEthernet } from "react-icons/bs";
import { FaFileInvoiceDollar, FaRegCircleDot, FaRegCreditCard } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";
import { FaUserPlus } from "react-icons/fa6";


const Home = () => {
    const [allBids, setAllBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch('https://b12a10-utility-management-server.vercel.app/topbills')
            .then(res => res.json())
            .then(data => {
                setAllBids(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
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

    const stats = [
        { number: '50K+', label: 'Bills Paid', icon: '☑️' },
        { number: '₹2Cr+', label: 'Total Transactions', icon: '💰' },
        { number: '15K+', label: 'Active Users', icon: '👥' },
        { number: '<30s', label: 'Avg Payment Time', icon: '⚡' }
    ];

    const steps = [
        {
            icon: <FaUserPlus />,
            title: 'Sign Up',
            description: 'Create your account with email or Google.'
        },
        {
            icon: <FaFileInvoiceDollar />,
            title: 'Choose Bill',
            description: 'Browse electricity, gas, water, internet, or mobile bills.'
        },
        {
            icon: <FaRegCreditCard />,
            title: 'Pay Instantly',
            description: 'Complete payment in 30 seconds. No OTPs, no hassle.'
        },
        {
            icon: <FaRegCheckCircle />,
            title: 'Get Receipt',
            description: 'Instant confirmation. Download PDF receipt anytime.'
        }
    ];
    return (

        <Fade>
            <Fade>
                <div className="hero-container w-full flex justify-center ">
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
                                        <button onClick={handleNavigateToBills} className="btn btn-lg shadow-lg rounded-3xl hover:shadow-xl transform transition-all">
                                            Pay Electricity Now
                                        </button>
                                    </div>
                                </div>

                                <div className="min-w-full bg-linear-to-br from-teal-600 to-cyan-700 flex items-center justify-center">
                                    <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Gas Bills? Done Before Your Cha Cools</h1>
                                        <p className="text-lg md:text-xl mb-6 opacity-90">Titas, Karnaphuli — instant receipt.</p>
                                        <br />

                                        <button onClick={handleNavigateToBills} className="btn btn-lg rounded-3xl shadow-lg hover:shadow-xl transform transition-all">
                                            Pay Gas Bill
                                        </button>
                                    </div>
                                </div>

                                <div className="min-w-full bg-linear-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                                    <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4">WASA Water Bills — Paid While You Shower</h1>
                                        <p className="text-lg md:text-xl mb-6 opacity-90">Dhaka, Chittagong — track usage, avoid surprises.</p>
                                        <br />

                                        <button onClick={handleNavigateToBills} className="btn btn-lg rounded-3xl shadow-lg hover:shadow-xl transform transition-all">
                                            Pay Water Bill
                                        </button>
                                    </div>
                                </div>

                                <div className="min-w-full bg-linear-to-br from-purple-700 to-pink-600 flex items-center justify-center">
                                    <div className="max-w-3xl mx-auto text-center px-6 text-white">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-4">One App. All Bills. Zero Drama.</h1>
                                        <p className="text-lg md:text-xl mb-6 opacity-90">Electricity • Gas • Water • Internet • Mobile — all in one dashboard.</p>
                                        <br />

                                        <button onClick={handleNavigateToBills} className="btn  btn-lg rounded-3xl shadow-lg hover:shadow-xl transform transition-all">
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
            </Fade>


            {/* category cards */}
            <Fade>
                <div className=" flex justify-center items-center dark:text-white pt-20 pb-10 mx-auto">
                    <div className="">
                        <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
                            <div className="category-card shadow-2xl w-75 h-100 rounded-2xl bg-white dark:bg-black transition-all hover:scale-102 flex flex-col justify-center items-center ">
                                <MdOutlineElectricBolt className="category-ico w-20 h-20"></MdOutlineElectricBolt>
                                <h4 className="text-4xl text-center pt-5">Electricity</h4>
                                <p className=" text-2xl w-55 pt-3 text-center">
                                    Pay your power bill in 30 seconds. No lines. No hassle.
                                </p>
                            </div>

                            <div className="category-card shadow-2xl w-75 h-100 rounded-2xl bg-white dark:bg-black transition-all hover:scale-102 flex flex-col justify-center items-center">
                                <FaGasPump className="category-ico w-20 h-20"></FaGasPump>
                                <h4 className="text-4xl text-center pt-5">Gas</h4>
                                <p className=" text-2xl w-50 pt-3 text-center">
                                    Settle gas bills instantly. Cook without worry.
                                </p>
                            </div>

                            <div className="category-card shadow-2xl w-75 h-100 rounded-2xl bg-white dark:bg-black transition-all hover:scale-102 flex flex-col justify-center items-center">
                                <FaHandHoldingWater className="category-ico w-20 h-20"></FaHandHoldingWater>
                                <h4 className="text-4xl text-center pt-5">Water</h4>
                                <p className=" text-2xl w-50 pt-3 text-center">
                                    Pay WASA bills fast. Keep the flow running.
                                </p>
                            </div>

                            <div className="category-card shadow-2xl w-75 h-100 rounded-2xl bg-white dark:bg-black transition-all hover:scale-102 flex flex-col justify-center items-center">
                                <BsEthernet className="category-ico w-20 h-20"></BsEthernet>
                                <h4 className="text-4xl text-center pt-5">Internet</h4>
                                <p className=" text-2xl w-50 pt-3 text-center">
                                    Recharge broadband in one tap. Stay online.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            {/* //mapping allBids */}
            <Fade>
                <div className=" flex justify-center pb-20">
                    <div className="">
                        <div className="recent-container flex flex-col pt-10 justify-center items-center text-center gap-5 ">
                            <h6 className="text-4xl font-medium dark:text-white">Recent Bills</h6>
                            {loading && (
                                <div className="flex justify-center items-center my-6 pt-10 dark:text-white">
                                    <span className="loading loading-spinner loading-lg text-neutral dark:text-white"></span>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-5 dark:text-white ">
                                {allBids.slice(0, 6).map((allBid) => (
                                    <div key={allBid._id ?? allBid.id} className="recent-card flex flex-col justify-between items-center gap-3 p-3 shadow-lg rounded-3xl h-[450px] dark:bg-[#040101] hover:scale-105 transition-all overflow-hidden">
                                        <img
                                            className="rounded-3xl w-full h-60 "
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
                                            className="recent-details-button w-full bg-[#58ba01] text-white rounded-4xl h-12 text-2xl mt-auto transition ">
                                            See details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade>
                <div className="w-full flex justify-center py-0 pt-0 dark:bg-[#1a1a1a]">
                    <div className="max-w-7xl w-full px-4 flex justify-center text-center flex-col">
                        <h2 className="text-4xl font-medium dark:text-white pb-10">
                            Trusted by Thousands
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-linear-to-br from-green-100 to-blue-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] rounded-3xl p-8 hover:shadow-2xl transition-all h-full flex flex-col items-center text-center"
                                >
                                    <div className="text-6xl mb-4">{stat.icon}</div>
                                    <br />
                                    <h3 className="text-5xl font-bold text-[#58ba01] mb-2">
                                        {stat.number}
                                    </h3>
                                    <p className="text-xl text-gray-600 dark:text-gray-300">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fade>

            <Fade>
                <div className="w-full flex justify-center py-1 pb-20  dark:bg-[#1a1a1a]">
                    <div className="max-w-7xl w-full px-4 flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-medium dark:text-white">
                            How It Works
                        </h2>
                        <p className="text-2xl text-center text-gray-600 dark:text-gray-400 mb-16 pb-10">
                            Four simple steps to never worry about bills again!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((step, id) => (
                                <div key={id} className="relative">
                                    <div className="bg-linear-to-br from-green-100 to-blue-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] rounded-3xl p-8 hover:shadow-2xl transition-all h-full flex flex-col items-center text-center">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#58ba01] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                            {id + 1}
                                        </div>

                                        <div className="text-6xl text-[#58ba01] mb-6 mt-4">
                                            {step.icon}
                                        </div>

                                        <h3 className="text-3xl font-bold mb-4 dark:text-white">
                                            {step.title}
                                        </h3>

                                        <p className="text-xl text-gray-600 dark:text-gray-300">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fade>
        </Fade>
    );
};

export default Home;
