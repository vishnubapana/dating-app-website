import React from 'react'
import NavigationBarDashboard from "./NavigationBarDashboard"
import TinderCards from './tinderCards/TinderCards'
import SwipeButtons from './swipeButtons/SwipeButtons'

function Dashboard() {
    return (
        <>
        <NavigationBarDashboard/>
        <TinderCards />
        <SwipeButtons />
        </>
    )
}

export default Dashboard
