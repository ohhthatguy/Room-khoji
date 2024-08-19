import {Routes, Route} from 'react-router-dom'
// import { useContext } from 'react'

import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import TenantHome from './components/Home/TenantHome'
import LandLordHome from './components/Home/LandLordHome'
import ProductMarket from './components/Home/tenant/ProductMarket'
import BusinessTalk from './components/Home/tenant/BusinessTalk'
import FavroitProduct from './components/Home/tenant/FavroitProduct'

// import LogOut from './components/Logout/LogOut'
// import { DataContext } from './context/DataProvider'




const App = () => {

  // const {openPortal} = useContext(DataContext)
// 

  return (<>


    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/create/account" element={<Signup />} />

     <Route path="/tenantHome" element={<TenantHome />} />
     <Route path="/landlordHome" element={<LandLordHome />} />
     <Route path='/tenant/productmarket/:Category' element={<ProductMarket />} />
     <Route path='/tenant/BusinessTalk/:id' element={<BusinessTalk />} />
     <Route path='/tenant/favroit' element={<FavroitProduct />} />

   



     
    </Routes>

    </>)
}

export default App