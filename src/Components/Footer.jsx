import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="footer-container bg-black pt-10 pb-3 flex flex-col text-center rounded-[50px] rounded-b-none">
                <div className="flex justify-evenly items-center text-center">
                    <div className="footer-left flex flex-col justify-center items-center text-center gap-2">
                        <img className="w-20" src="/logo.png" alt="" />
                        <h4 className="font-bold text-3xl text-white">Utilify</h4>
                        <p className="w-[150px] font-light text-gray-300">Pay your bills! Without headache!</p>
                    </div>


                    <div className="footer-middle flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Similar Websites</h4>
                        <p className="w-[150px] font-light text-gray-300">Megamarket</p>
                        <p className="w-[150px] font-light text-gray-300">Mega Electronics</p>
                        <p className="w-[150px] font-light text-gray-300">Furniture</p>
                        <p className="w-[150px] font-light text-gray-300">Accessories</p>
                        <p className="w-[150px] font-light text-gray-300">Game</p>
                    </div>

                    <div className="footer-right flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Resources</h4>
                        <p className="w-[150px] font-light text-gray-300">Support</p>
                        <p className="w-[150px] font-light text-gray-300">Documentation</p>
                        <p className="w-[150px] font-light text-gray-300">Video Tutorials</p>
                        <p className="w-[150px] font-light text-gray-300">Refund Policy</p>
                        <p className="w-[150px] font-light text-gray-300">Terms of Service</p>
                    </div>
                </div>

                <div className="footer-info font-light text-white pt-10">Copyright 2025 - Dibbo Chakraborty</div>
            </footer>
        </>
    );
};

export default Footer;
