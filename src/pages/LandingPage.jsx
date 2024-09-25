import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className='flex justify-center items-center w-full h-screen'>

            <Link to={'/second'} className='bg-[#009ddb] text-white p-3 hover:bg-[#009ddbc5]'>
                <button>Go to page</button>
            </Link>
        </div>
    )
}
