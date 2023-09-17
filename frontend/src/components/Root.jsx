import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
import AuthProvider from '../context/provider'
import Home from '../pages/Home'
import Workspace from '../pages/Workspace'

const Root = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/workspace/:workspaceId" element={<Workspace />} />
                <Route path="/*" element={<h1>Error wlak</h1>} />
            </Routes>
        </AuthProvider>
    )
}

export default Root