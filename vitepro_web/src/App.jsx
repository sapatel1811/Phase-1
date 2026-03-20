import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './website/component/Header';
import Index from './website/pages/Index';
import Properties from './website/pages/Properties';
import PropertiesDetails from './website/pages/PropertiesDetails';
import Contact from './website/pages/Contact';
import Footer from './website/component/Footer';


function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<> <Header/> <Index/> <Footer/></>}></Route>
      <Route path="/properties" element={<> <Header/> <Properties/> <Footer/></>}></Route>
      <Route path="/propertyDetails" element={<> <Header/> <PropertiesDetails/> <Footer/></>}></Route>
      <Route path="/contact" element={<> <Header/> <Contact/> <Footer/></>}></Route>
           
     </Routes>
     </BrowserRouter>
    
    </div>
  )
}

export default App