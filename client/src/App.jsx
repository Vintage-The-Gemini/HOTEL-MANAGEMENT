import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { HotelProvider } from './contexts/HotelContext';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import Resources from './pages/Resources';
import Inquiries from './pages/Inquiries';
import Quotations from './pages/Quotations';
import Bookings from './pages/Bookings';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import Agents from './pages/Agents';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <HotelProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Router>
        </HotelProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
