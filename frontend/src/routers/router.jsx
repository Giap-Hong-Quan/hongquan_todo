import React from 'react'
import { Route, Routes } from 'react-router'
import Homepage from '../pages/HomePage'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <Routes>
        
        <Route path='/'element={<Homepage/>}/>
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter