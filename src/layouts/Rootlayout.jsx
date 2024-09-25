import React from 'react'
import { Outlet } from 'react-router-dom'
import { ParkProgressProvider } from '../context/ParkProgressContext'

export default function Rootlayout() {
    return (
        <ParkProgressProvider>

            <>

                <Outlet />
            </>
        </ParkProgressProvider>
    )
}
