
import React from 'react';
import './style.css';
import GenerateScreen from './screens/GenerateScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeFeedScreen from './screens/HomeFeedScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer"> <Navbar />
        <Routes>
          <Route path="/" element={<HomeFeedScreen />}/>
          <Route path="/create" element={<GenerateScreen />}/>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;