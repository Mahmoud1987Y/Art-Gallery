import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className='flex flex-col items-center sm:items-start'>
                <img src={assets.logo} alt="" className='mb-5 w-32' />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto consequuntur velit reprehenderit soluta necessitatibus aliquid nobis, perferendis, optio odit explicabo ad atque tenetur blanditiis vel quia! Dolores voluptatum at ut.
                </p>
            </div>
            <div className='flex flex-col sm:items-start mt-10'>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='flex flex-col  sm:items-start mt-10'>
            
                <p className='text-xl font-medium mb-5'> Get in touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-202-456-789</li>
                <li>example@artseller.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ ArtSeller.com - All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer