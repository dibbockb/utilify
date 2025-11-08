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
                        <a className="w-[150px] font-light text-gray-300">Megamarket</a>
                        <a className="w-[150px] font-light text-gray-300">Mega Electronics</a>
                        <a className="w-[150px] font-light text-gray-300">Furniture</a>
                        <a className="w-[150px] font-light text-gray-300">Accessories</a>
                        <a className="w-[150px] font-light text-gray-300">Game</a>
                    </div>

                    <div className="footer-right flex flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300">Resources</h4>
                        <a className="w-[150px] font-light text-gray-300">Support</a>
                        <a className="w-[150px] font-light text-gray-300">Documentation</a>
                        <a className="w-[150px] font-light text-gray-300">Video Tutorials</a>
                        <a className="w-[150px] font-light text-gray-300">Refund Policy</a>
                        <a className="w-[150px] font-light text-gray-300">Terms of Service</a>
                    </div>
                </div>

                <div className="footer-info font-light text-white pt-10">Copyright 2025 - Dibbo Chakraborty</div>

            </footer>
        </>
    );
};

export default Footer;
