
import {Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import SearchResults from './pages/SearchResults'
import FlashDeals from './pages/FlashDeals'
//import CheckOut from './pages/CheckOut'
//import OrderTracking from './pages/OrderTracking'
import MyOrders from './pages/MyOrders'
import Addresses from './pages/Addresses'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminDeliveryPartners from './pages/admin/AdminDeliveryPartners'
import DeliveryLayout from './pages/delivery/DeliveryLayout'
import DeliveryDashboard from './pages/delivery/DeliveryDashboard'
import DeliveryLogin from './pages/delivery/DeliveryLogin'
import CheckOut from './pages/Checkout'

const App = () => {
  return (
    < > 
    <Toaster position='top-right' toastOptions={{duration:3000,style:{background:'#1b3022', color:'#fff', borderRadius:'12px', fontSize:'14px' }}}/>
    <Routes>
      {/* Auth Pages- No Navbar/Footer */}
      <Route path='/login' element={<Login/>}/>
      {/* Main Pages with Footer/Navbar  'index' below means homepage(ie '/') */}
      <Route path='/' element={<AppLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='products' element={<Products/>}/>
      <Route path='products/:id' element={<ProductPage/>}/>
      <Route path='search' element={<SearchResults/>}/>
      <Route path='deals' element={<FlashDeals/>}/>

      {/* Protected routes below this*/}
      <Route element={<ProtectedRoute/>}>
        <Route  path='checkout'  element={<CheckOut/>}/>
        <Route  path='orders'  element={<MyOrders/>}/>
       {/*  <Route  path='orders/:id'  element={<OrderTracking/>}/> */}
        <Route  path='addresses'  element={<Addresses/>}/>
        
      </Route>

      </Route>
      {/* Admin Pages */}
      <Route path='/admin' element={<AdminLayout/>}>
      <Route index  element={<AdminDashboard/>}/>
      <Route path='products' element={<AdminProducts/>}/>
      <Route path='product/new' element={<AdminProductForm/>}/>
      <Route path='product/:id/edit' element={<AdminProductForm/>}/>
      <Route path='orders' element={<AdminOrders/>}/>
      <Route path='delivery-partners' element={<AdminDeliveryPartners/>}/>
      </Route>
      {/* Delivery Partner Pages */}
      <Route path='/delivery/login' element={<DeliveryLogin/>}/>
      <Route path='/delivery' element={<DeliveryLayout/>}>
      <Route index element={<DeliveryDashboard/>}/>
      </Route>
      
      


      

    </Routes>
     </>
    
  )
}

export default App