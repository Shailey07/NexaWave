import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Context Providers
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ModeProvider } from '@/context/ModeContext';
import { LocationProvider } from '@/context/LocationContext';

// Layout Components
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { VoiceAssistant } from '@/components/common/VoiceAssistant';

// Pages
import { LandingPage } from '@/pages/Landing/LandingPage';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { HomePage } from '@/pages/Home/HomePage';
import { BuyPage } from '@/pages/Buy/BuyPage';
import { SellPage } from '@/pages/Sell/SellPage';
import { SearchPage } from '@/pages/Search/SearchPage';
import { ServicesPage } from '@/pages/Services/ServicesPage';
import { ServiceDetailPage } from '@/pages/Services/ServiceDetailPage';
import { QuotesPage } from '@/pages/Quotes/QuotesPage';
import { ChatPage } from '@/pages/Messages/ChatPage';
import { WeatherPage } from '@/pages/Weather/WeatherPage';
import { MarketPricePage } from '@/pages/Market/MarketPricePage';
import { MachineryPage } from '@/pages/Machinery/MachineryPage';
import { CheckoutPage } from '@/pages/Bookings/CheckoutPage';
import { OrderTracking } from '@/pages/Orders/OrderTracking';
import { BookingsPage } from '@/pages/Bookings/BookingsPage';
import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { KYCVerification } from '@/pages/Profile/KYCVerification';
import { TransactionHistory } from '@/pages/Profile/TransactionHistory';

// Secret Admin Pages
import { AdminLogin } from '@/pages/Admin/AdminLogin';
import { AdminDashboard } from '@/pages/Admin/AdminDashboard';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900 relative overflow-x-hidden pb-16 md:pb-0">
    <Navbar />
    <VoiceAssistant /> 
    <main className="pt-16 min-h-screen flex flex-col">{children}</main>
    <Footer />
    <BottomNav />
  </div>
);

// Admin Layout without normal Navbar/Footer
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-900 text-white">
    {children}
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ModeProvider>
          <LocationProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  {/* Secret Admin Routes (Not wrapped in normal AppLayout) */}
                  <Route path="/admin/dashboard/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
                  <Route path="/admin/dashboard/main" element={<AdminLayout><ProtectedRoute><AdminDashboard /></ProtectedRoute></AdminLayout>} />

                  {/* Normal User App */}
                  <Route path="*" element={
                    <AppLayout>
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/buy" element={<ProtectedRoute><BuyPage /></ProtectedRoute>} />
                        <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
                        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                        <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                        <Route path="/services/:id" element={<ProtectedRoute><ServiceDetailPage /></ProtectedRoute>} />
                        <Route path="/quotes" element={<ProtectedRoute><QuotesPage /></ProtectedRoute>} />
                        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                        <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
                        <Route path="/market" element={<ProtectedRoute><MarketPricePage /></ProtectedRoute>} />
                        <Route path="/machinery" element={<ProtectedRoute><MachineryPage /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/tracking" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
                        <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/kyc" element={<ProtectedRoute><KYCVerification /></ProtectedRoute>} />
                        <Route path="/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </AppLayout>
                  } />
                </Routes>
              </Router>
            </AuthProvider>
          </LocationProvider>
        </ModeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;