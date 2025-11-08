import React, { useEffect, useState } from "react";
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
        // console.log(id);

    };

    return (

        <>
            {/* <div className="max-w-7xl mx-auto mt-8 px-4 pt-5 flex flex-col ">
                <div className="hero-carousel">

                    <div id="hero1" className="hero-slide hero1 flex items-center justify-center">
                        <div className="hero-overlay">
                            <h1 className="hero-title">No Water in Dhanmondi</h1>
                            <p className="hero-text">"2 days dry. Taps dead. Buckets empty." – Oct 27</p>
                        </div>
                    </div>

                    <div id="hero2" className="hero-slide hero2 flex items-center justify-center">
                        <div className="hero-overlay">
                            <h1 className="hero-title">Uttara Stinks</h1>
                            <p className="hero-text">"Overflowing bins. Rats rule the street." – Oct 25</p>
                        </div>
                    </div>

                    <div id="hero3" className="hero-slide hero3 flex items-center justify-center">
                        <div className="hero-overlay">
                            <h1 className="hero-title">Rampura Drowns</h1>
                            <p className="hero-text">"30 cm water after 10 min rain. Cars dead." – Oct 31</p>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center gap-2 mt-4 pb-3 pt-4">
                    <a href="#hero1" className="btn btn-s btn-circle">1</a>
                    <a href="#hero2" className="btn btn-s btn-circle">2</a>
                    <a href="#hero3" className="btn btn-s btn-circle">3</a>
                </div>

                <script dangerouslySetInnerHTML={{
                    __html: `
                setInterval(() => {
                  const items = ['hero1', 'hero2', 'hero3'];
                  const hash = window.location.hash.slice(1) || 'hero1';
                  const next = items[(items.indexOf(hash) + 1) % 3];
                  window.location.hash = next;
                }, 250);
              `}} />
            </div> */}


            {/* category cards */}
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

            {/* //mapping allBids */}
            <div className="recent-container flex flex-col pt-10 justify-center items-center text-center gap-5 ">
                <h6 className="text-4xl font-medium">Recent Bills</h6>
                <div className="recent-cards pb-10 grid grid-cols-3 gap-5 ">
                    {allBids.slice(0, 6).map((allBid) => (
                        <div key={allBid._id ?? allBid.id} className="recent-card flex flex-col justify-center items-center gap-3 p-3 shadow-lg rounded-3xl ">
                            <img
                                className="rounded-3xl w-full h-60"
                                src={allBid.image}
                                alt="recent-card-img"
                            />

                            <div className="flex w-full pl-2 pb-3 justify-between">
                                <div className="flex justify-center items-center">
                                    <h4 className="flex justify-center items-center gap-1 font-bold w-[200px] text-left text-2xl">
                                        {allBid.title}
                                    </h4>
                                </div>
                                <h4 className="flex justify-center items-center gap-1 font-bold text-2xl text-right">
                                    {allBid.date}
                                </h4>
                            </div>

                            <div className="flex w-full pl-2 pb-3 justify-between">
                                <h4 className="flex justify- items-center gap-1 font-bold  text-left text-2xl">
                                    <FaRegCircleDot></FaRegCircleDot>
                                    {allBid.category}
                                </h4>
                                <h4 className="flex justify-center items-center gap-1 font-bold text-right text-2xl">
                                    <MdLocationOn></MdLocationOn>
                                    {allBid.location}
                                </h4>
                            </div>

                            <button
                                onClick={() => handleSeeDetails(allBid._id)}
                                className="recent-details-button w-full bg-[#58ba01] text-white rounded-4xl h-12 text-2xl">
                                See details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
