import React from "react";

const Footer = () => {
    return (
        <div className="pt-25">
            <footer className="footer-container bg-black pt-10 pb-3 flex flex-col w-full text-center rounded-[3.125rem] rounded-b-none ">
                <div className="flex justify-evenly items-center text-center">
                    <div className="footer-left flex flex-col justify-center items-center text-center gap-2">
                        <img className="w-20" src="/logo.png" alt="" />
                        <h4 className="font-bold text-3xl text-white">Utilify</h4>
                        <p className="w-37.5 font-light text-gray-300">Pay your bills! Without headache!</p>
                    </div>


                    <div className="footer-middle hidden  lg:flex flex-col justify-center items-center text-center gap-2  ">
                        <h4 className="font-medium text-2xl text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=similar+sites+like+utilify" target="_blank">Similar Websites</h4>
                        <a className="w-9.375rem font-light text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=megamarket" target="_blank">Megamarket</a>
                        <a className="w-9.375rem font-light text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=megaelectronics" target="_blank">Mega Electronics</a>
                        <a className="w-9.375rem font-light text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=furniture" target="_blank">Furniture</a>
                        <a className="w-9.375rem font-light text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=accessories" target="_blank">Accessories</a>
                        <a className="w-9.375rem font-light text-gray-300" href="https://www.google.com/search?client=firefox-b-d&q=gaming" target="_blank">Game</a>
                    </div>

                    <div className="footer-right hidden  lg:flex  flex-col justify-center items-center text-center gap-2">
                        <h4 className="font-medium text-2xl text-gray-300" target="_blank" href="https://www.google.com/search?client=firefox-b-d&q=support">Resources</h4>
                        <a className="w-9.375rem font-light text-gray-300" href="mailto:divyajitchakraborty@gmail.com" target="_blank">Support</a>
                        <a className="w-9.375rem font-light text-gray-300" target="_blank" href="https://www.google.com/search?client=firefox-b-d&q=documentation">Documentation</a>
                        <a className="w-9.375rem font-light text-gray-300" target="_blank" href="https://www.google.com/search?client=firefox-b-d&q=video+tutorials">Video Tutorials</a>
                        <a className="w-9.375rem font-light text-gray-300" target="_blank" href="https://www.google.com/search?client=firefox-b-d&q=refund+policy">Refund Policy</a>
                        <a className="w-9.375rem font-light text-gray-300" target="_blank" href="https://www.google.com/search?client=firefox-b-d&q=terms">Terms of Service</a>
                    </div>
                </div>

                <a className="footer-info font-light text-white pt-10" href="https://github.com/dibbockb" target="_blank">Copyright 2026 - Dibbo Chakraborty</a>
            </footer>
        </div>
    );
};

export default Footer;
