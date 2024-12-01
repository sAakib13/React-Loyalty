import React from 'react';
import logo from "../../assets/telerivetlogo.webp"
const Header = () => {
    return (
        <header className="bg-dark text-white p-4">
            <div className="flex justify-around items-center">
                {/* Logo Section */}
                <div className="flex justify-between items-center" >
                    <img src={logo} alt='logo' className='h-12 w-auto'></img>
                </div>

                {/* Navigation Section */}
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="#product" className="hover:bg-hover py-2 px-3 text-tiny">Product</a></li>
                        <li><a href="#pricing" className="hover:bg-hover py-2 px-3 text-tiny">Pricing</a></li>
                        <li><a href="#guide" className="hover:bg-hover py-2 px-3 text-tiny">Guide</a></li>
                        <li><a href="#solution" className="hover:bg-hover py-2 px-3 text-tiny">Solution</a></li>
                        <li><a href="#about" className="hover:bg-hover py-2 px-3 text-tiny">About</a></li>
                        <li><a href="#signin" className="text-blue-500 py-2 px-3 text-tiny">Sign In</a></li>
                        <li><a href="#loyalty" className="hover:bg-hover py-2 px-3 text-tiny">Loyalty</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
