import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClerkProviderWrapper from './components/auth/ClerkProviderWrapper';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
// ...other imports for pages/components

const Home = React.lazy(() => import('./pages/Home'));
const Categories = React.lazy(() => import('./pages/Categories'));
const ProductList = React.lazy(() => import('./pages/ProductList'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ClerkProviderWrapper>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <React.Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<Contact />} />
              {/* Add more routes as needed */}
            </Routes>
          </React.Suspense>
        </div>
      </Router>
    </ClerkProviderWrapper>
  );
}

export default App;
