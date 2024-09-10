import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div>
            <Link to={'/first'}>
                <button>Go to first page</button>
            </Link>
            <Link to={'/second'}>
                <button>Go to second page</button>
            </Link>
        </div>
    )
}
