
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminAddProduct from '@/components/admin/AdminAddProduct';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/add" element={<AdminAddProduct />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
