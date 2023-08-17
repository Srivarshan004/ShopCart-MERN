import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import ProductDetail from './components/products/ProductDetail';
import ProductSearch from './components/products/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import store from './Store';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser);
      async function getStripeApiKey() {
        const { data } = await axios.get('/api/v1/stripeapi');
        setStripeApiKey(data.stripeApiKey);
      }
      getStripeApiKey();
  }, [])

  return (
    <Router>
      <HelmetProvider>
        <div className="App">
          <Header />
          <div className='container container-fluid'>
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
              <Route path='/profile/update' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} />
              <Route path='/profile/update/password' element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shipping' element={<ProtectedRoute> <Shipping /> </ProtectedRoute>} />
              <Route path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />
              {stripeApiKey && <Route path='/payment' element={<ProtectedRoute> <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements></ProtectedRoute>} />}
              <Route path='/order/success' element={<ProtectedRoute> <OrderSuccess /> </ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute> <UserOrders /> </ProtectedRoute>} />
              <Route path='/order/:id' element={<ProtectedRoute> <OrderDetail /> </ProtectedRoute>} />

            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />
            <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}> <ProductsList /> </ProtectedRoute>} />
            <Route path='/admin/product/create' element={<ProtectedRoute isAdmin={true}> <NewProduct /> </ProtectedRoute>} />
            <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}> <UpdateProduct /> </ProtectedRoute>} />
            <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}> <OrderList /> </ProtectedRoute>} />
            <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}> <UpdateOrder /> </ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}> <UserList /> </ProtectedRoute>} />
            <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}> <UpdateUser /> </ProtectedRoute>} />
            <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}> <ReviewList /> </ProtectedRoute>} />
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;