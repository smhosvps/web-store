import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './screens/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import CreateProduct from './components/store/ProductCreate';
import StoreScreen from './screens/StoreScreen';
import EditProduct from './components/store/EditProduct';
import ProductPreview from './components/store/ProductPreview';
import DeliveryScreen from './screens/DeliveryScreen';
import StoreTransactions from './screens/StoreTransactions';
import OrderTableView from './components/storeOrder/OrderTableView';
import IncomeAnalyticsView from './components/storeOrder/chart/IncomeAnalyticsView';
import TaxAnalyticsView from './components/storeOrder/chart/TaxAnalyticsView';
import DeliveryFeeChart from './components/storeOrder/chart/DeliveryFeeChart';
import PrivateRoute from './components/routes/PrivateRoutes';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { useGetUserQuery } from './redux/features/api/apiSlice';
import { userLoggedIn } from './redux/features/auth/authSlice';
import ProfileSetup from './screens/media/ProfileSetup';
import ProfileScreen from './screens/media/ProfileScreen';
import StoreSharedLayout from './screens/StoreSharedLayout';
import WelcomeScreen from './screens/WelcomeScreen';
import IsNotLoginAuth from './components/routes/IsNotLoginAuth';
import Loader from './components/loader/Loader';


function App() {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (user) {
      dispatch(userLoggedIn({ user, accessToken: localStorage.getItem('accessToken') || '' }));
      // Reload the page
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div>
      <Loader />
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Catch-all route to redirect to the appropriate dashboard or login page */}
        <Route path="*" element={<Navigate to={user ? `/store` : '/'} replace />} />
        <Route element={<IsNotLoginAuth />}>
          <Route path="/" element={<WelcomeScreen />} />
        </Route>
        <Route element={<IsNotLoginAuth />}>
          <Route path="/sign-in" element={<Auth />} />
        </Route>

        <Route element={<IsNotLoginAuth />}>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<IsNotLoginAuth />}>
          <Route path="/reset-password" element={<ChangePassword />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['store', 'admin']} />}>
          <Route path="/store" element={<StoreSharedLayout />}>
            <Route index element={<StoreTransactions />} />
            <Route path="store" element={<StoreScreen />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="view-product/:id" element={<ProductPreview />} />
            <Route path="delivery" element={<DeliveryScreen />} />
            <Route path="profile-setup" element={<ProfileSetup />} />
            <Route path="store-order-table-view" element={<OrderTableView />} />
            <Route path="store-order-income-view" element={<IncomeAnalyticsView />} />
            <Route path="store-order-tax-view" element={<TaxAnalyticsView />} />
            <Route path="store-order-fee-view" element={<DeliveryFeeChart />} />
            <Route path="settings" element={<ProfileScreen />} />
          </Route>
        </Route>


      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
