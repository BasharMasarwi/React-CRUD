import React from 'react'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Index from './compnents/users/Index.jsx'
import Create from './compnents/users/Create.jsx'
import Details from './compnents/users/Details.jsx'
import Loader from './compnents/users/Loader.jsx'
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/user/create" element={<Create />}/>
      <Route path="/user/index" element ={<Index />} />
      <Route path='user/:id' element={<Details/>}/>
      <Route path ="*" element={<h3>Page Not Found</h3>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
