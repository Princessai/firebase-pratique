import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';

function App() {
    return (
        <>
            <div className="App">
                <Header />
                <ToastContainer position="top-center" />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddEdit />} />
                    <Route path="/update/:id" element={<AddEdit />} />
                    <Route path="/view/:id" element={<View />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
