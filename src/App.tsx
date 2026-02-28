import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { LoginScreen } from '@/features/auth/LoginScreen';
import { MainLayout } from '@/layouts/MainLayout';
import { POSPage } from '@/features/pos/POSPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ProductManagementPage } from '@/features/products/ProductManagementPage';
import { SettingsPage } from '@/features/settings/SettingsPage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginScreen /> : <Navigate to="/" />} />

        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
          <Route index element={<POSPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
