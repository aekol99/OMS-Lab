import React from 'react';
import './Main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Project from '../project/Project';
import NotFound from '../notFound/NotFound';

function Main() {
    return (
    <BrowserRouter>
        <div className='main'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:pid/:bid/:tab" element={<Project />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    </BrowserRouter>
    )
}

export default Main