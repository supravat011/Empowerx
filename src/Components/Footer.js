import React from "react";
import { Link } from "react-router-dom"; // Verify if Link is needed, assuming yes for internal nav

const Footer = () => {
    const productList = [
        { name: "Easy Loan", link: "/EasyLoan" },
        { name: "Campaigns", link: "/campaign" },
        { name: "Mentorship", link: "/youtube" },
        { name: "Chat", link: "/chat" },
    ];
    const contactList = [
        "support@dappfunding.com",
        "info@dappfunding.com",
        "+91 98765 43210"
    ];
    const usefulLink = [
        { name: "Home", link: "/" },
        { name: "About Us", link: "/about" },
        { name: "Contact Us", link: "/contact" },
        { name: "Terms & Conditions", link: "/terms" },
    ];

    return (
        <footer className="text-center text-white backgroundMain lg:text-left pt-10">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h6 className="mb-4 flex items-center justify-center font-bold uppercase md:justify-start text-2xl tracking-wider">
                            <span className="text-teal-400 mr-2">EMPOWERX</span>
                        </h6>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering ideas through decentralized crowdfunding.
                            We bridge the gap between visionaries and investors
                            with secure, transparent blockchain technology.
                        </p>
                    </div>

                    {/* Products Section */}
                    <div>
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-teal-400 tracking-wider">
                            Services
                        </h6>
                        {productList.map((el, i) => (
                            <p className="mb-3" key={i + 1}>
                                <a href={el.link} className="text-gray-300 hover:text-white transition duration-300 text-sm">
                                    {el.name}
                                </a>
                            </p>
                        ))}
                    </div>

                    {/* Useful Links Section */}
                    <div>
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-teal-400 tracking-wider">
                            Company
                        </h6>
                        {usefulLink.map((el, i) => (
                            <p className="mb-3" key={i + 1}>
                                <a href={el.link} className="text-gray-300 hover:text-white transition duration-300 text-sm">
                                    {el.name}
                                </a>
                            </p>
                        ))}
                    </div>

                    {/* Newsletter & Contact Section */}
                    <div>
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start text-teal-400 tracking-wider">
                            Stay Updated
                        </h6>
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter for the latest updates.</p>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-teal-400 text-sm"
                                />
                                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded text-white font-semibold transition duration-300 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div>
                            <h6 className="mb-2 font-semibold text-teal-400 text-sm">Contact</h6>
                            {contactList.map((el, i) => (
                                <p className="text-gray-400 text-xs mb-1" key={i}>
                                    {el}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black/30 p-6 text-center border-t border-gray-800">
                <div className="flex justify-center items-center gap-6 mb-4">
                    {/* Social Icons (SVGs) */}
                    <a href="#!" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                    </a>
                    <a href="#!" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </a>
                    <a href="#!" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                </div>
                <div className="text-gray-500 text-sm">
                    <span>© 2026 Copyright: </span>
                    <a className="font-semibold text-teal-400 hover:text-teal-300" href="/">
                        EMPOWERX
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
