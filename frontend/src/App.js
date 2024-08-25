import {Routes, Route} from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useContext } from 'react'

import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import TenantHome from './components/Home/TenantHome'
import LandLordHome from './components/Home/LandLordHome'
import ProductMarket from './components/Home/tenant/ProductMarket'
import BusinessTalk from './components/Home/tenant/BusinessTalk'
import FavroitProduct from './components/Home/tenant/FavroitProduct'

import LogOut from './components/Logout/LogOut'
import { DataContext } from './context/DataProvider'




const App = () => {

  const {openPortal, darkMode} = useContext(DataContext)
  const root = document.getElementById('root')
// 

  if(darkMode){
    root.style.background = '#464646';
  }else{
    root.style.background = 'white';

  }

  return (<>

    
    { createPortal( openPortal && <LogOut />, root) }


    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/create/account" element={<Signup />} />

     <Route path="/tenantHome" element={<TenantHome darkMode={darkMode} />} />
     <Route path="/landlordHome" element={<LandLordHome darkMode={darkMode}/>} />
     <Route path='/tenant/productmarket/:Category' element={<ProductMarket darkMode={darkMode}/>} />
     <Route path='/tenant/BusinessTalk/:id' element={<BusinessTalk darkMode={darkMode}/>} />
     <Route path='/tenant/favroit' element={<FavroitProduct darkMode={darkMode}/>} />

   



     
    </Routes>

    </>)
}

export default App