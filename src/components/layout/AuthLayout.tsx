/* eslint-disable prettier/prettier */
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';
import { NotificationProvider } from '../Contexts/NotificationContext';

function AuthLayout() {
  const authState: any = useAppSelector((state) => state?.authState);
  if (authState.user) return <Navigate to="../../superadmin/main" replace />;
  return (
    <div className="bg-super-admin-auth-background h-screen bg-[#ccc]">
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </div>
  );
}

export default AuthLayout;
