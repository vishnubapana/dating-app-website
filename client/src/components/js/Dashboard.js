import React from 'react'
import NavigationBarDashboard from "./NavigationBarDashboard"
import TinderCards from './tinderCards/TinderCards'
import SwipeButtons from './swipeButtons/SwipeButtons'
import { getUser } from '../utils/Common';
import AdminDashboard from './adminDashboard/AdminDashboard'

function Dashboard() {
    if(getUser().isAdmin){
        return <AdminDashboard />
    }
    return (
        <>
        <NavigationBarDashboard/>
        <TinderCards />
        <SwipeButtons />
        </>
    )
}

export default Dashboard
