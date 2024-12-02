import React from 'react';
import clientlogo from '../../assets/client_logos.webp';

const Brands = () => {
    return (
        <div className='m-6 '>
            <div className='flex item-center justify-center m-4'>
                <h2 className='text-tiny text-center text-light px-6 py-1'>Trusted By</h2>
                <img className="w-[70%] h-[70%]" src={clientlogo} alt='client-logo' />
            </div>
            <div className='border-b-2 border-black-500 m-5'></div>
        </div>
    );
};

export default Brands;
