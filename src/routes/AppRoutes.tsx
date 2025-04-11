/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
import { Navigate, RouteObject } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LayoutOutlet from '../components/layout/LayoutOutlet';
import SuperAdminAppLayout from '../components/layout/SuperAdminAppLayout';

import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import LoginPage from '../pages/auth/login/LoginPage';
import NewPasswordPage from '../pages/auth/new-password/NewPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OtpVerificationPage';
import SuperAdminDashboardPage from '../pages/super-admin/dashboard/SuperAdminDashboardPage';
import SuperAdminAppImagePage from '../pages/super-admin/image-upload/SuperAdminAppImagePage';
import SuperAdminAddPermissionsPage from '../pages/super-admin/role-permissions/SuperAdminAddPermissionsPage';
import SuperAdminAddRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminAddRolePermissionsPage';
import SuperAdminEditPermissionsPage from '../pages/super-admin/role-permissions/SuperAdminEditPermissionPage';
import SuperAdminEditRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminEditRolePermissionPage';
import SuperAdminPermissionPage from '../pages/super-admin/role-permissions/SuperAdminPermissionPage';
import SuperAdminPermissionPageDetails from '../pages/super-admin/role-permissions/SuperAdminPermissionPageDetails';
import SuperAdminRolePermissionsPage from '../pages/super-admin/role-permissions/SuperAdminRolePermissionsPage';
import SuperAdminShopDetailPage from '../pages/super-admin/tenat/shop/SuperAdminShopDetailPage';

import SuperAdminShopPage from '../pages/super-admin/tenat/shop/SuperAdminShopPage';
import ShopAdminUserDetailPage from '../pages/super-admin/tenat/user/SuperAdminUserDetailPage';
import SuperAdminUserPage from '../pages/super-admin/tenat/user/SuperAdminUserPage';
import SuperAdminThemeCreatePage from '../pages/super-admin/theme/SuperAdminThemeCreatePage';
import SuperAdminThemeEditPage from '../pages/super-admin/theme/SuperAdminThemeEditPage';
import SuperAdminThemePage from '../pages/super-admin/theme/SuperAdminThemePage';
import RatingPage from '../pages/super-admin/rating/RatingPage';
import RatingReviewsPage from '../pages/super-admin/rating/RatingReviewsPage';
import ShopTypePage from '../pages/super-admin/shop-type/ShopTypePage';
import DoctorPage from '../pages/super-admin/doctors/DoctorPage';
import DoctorsCreatePage from '../pages/super-admin/doctors/DoctorsCreatePage';

export const routeObjects: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="superadmin" replace />,
  },
  {
    path: '/superadmin',
    element: <LayoutOutlet />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'otp-verification',
            element: <OTPVerificationPage />,
          },
          {
            path: 'new-password',
            element: <NewPasswordPage />,
          },
        ],
      },
      {
        path: 'main',
        element: <SuperAdminAppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: 'dashboard',
            element: <SuperAdminDashboardPage />,
          },
          {
            path: 'tenant',
            children: [
              {
                path: 'shop',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminShopPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <SuperAdminShopDetailPage />,
                  },
                  {
                    path: 'ratings/:tenantId',
                    element: <RatingPage />,
                  },
                  {
                    path: 'reviews/:itemId',
                    element: <RatingReviewsPage />,
                  },
                ],
              },
              {
                path: 'user',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminUserPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <ShopAdminUserDetailPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'app',
            children: [
              {
                path: 'image-upload',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminAppImagePage />,
                  },
                ],
              },
            ],
          },
          // {
          //   path: 'support',
          //   element: <SuperAdminSupportPage />,
          // },
          {
            path: 'tenant',
            children: [
              {
                path: 'shops',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminShopPage />,
                  },
                  {
                    path: 'detail/:id',
                    element: <SuperAdminShopDetailPage />,
                  },
                  {
                    path: 'ratings/:tenantId',
                    element: <RatingPage />,
                  },
                  {
                    path: 'reviews/:itemId',
                    element: <RatingReviewsPage />,
                  },
                ],
              },
              {
                path: 'type',
                children: [
                  {
                    index: true,
                    element: <ShopTypePage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'user-permission',
            children: [
              {
                path: 'role',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminRolePermissionsPage />,
                  },
                  {
                    path: 'add-role',
                    element: <SuperAdminAddRolePermissionsPage />,
                  },
                  {
                    path: 'edit-role/:id',
                    element: <SuperAdminEditRolePermissionsPage />,
                  },
                ],
              },
              {
                path: 'permission',
                children: [
                  { index: true, element: <Navigate to="list" replace /> },
                  {
                    path: 'list',
                    element: <SuperAdminPermissionPage />,
                  },
                  {
                    path: 'add-permission',
                    element: <SuperAdminAddPermissionsPage />,
                  },
                  {
                    path: 'edit-permission/:id',
                    element: <SuperAdminEditPermissionsPage />,
                  },
                  {
                    path: 'details/:id',
                    element: <SuperAdminPermissionPageDetails />,
                  },
                ],
              },
            ],
          },
          {
            path: 'theme-configuration',
            children: [
              { index: true, element: <Navigate to="list" replace /> },
              {
                path: 'list',
                element: <SuperAdminThemePage />,
              },
              {
                path: 'create',
                element: <SuperAdminThemeCreatePage />,
              },
              {
                path: 'edit/:id',
                element: <SuperAdminThemeEditPage />,
              },
            ],
          },
          {
            path: 'ratings',
            children: [
              {
                index: true,
                element: <RatingPage />,
              },
              {
                path: 'reviews/:itemId',
                element: <RatingReviewsPage />,
              },
            ],
          },
          {
            path: 'shop-type',
            children: [
              {
                index: true,
                element: <ShopTypePage />,
              },
            ],
          },
          {
            path: 'doctor',
            children: [
              {
                index: true,
                element: <DoctorPage />,
              },
              {
                path: 'create',
                element: <DoctorsCreatePage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
