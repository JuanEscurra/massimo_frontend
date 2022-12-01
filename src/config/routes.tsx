import { RouteObject } from "react-router-dom";

import PublicRoute from "shared/components/router/PublicRoute";
import ProtectedRoute from "shared/components/router/ProtectedRoute";

import HomePage from "modules/home/pages/HomePage";

import AuthPage from "modules/auth/pages/AuthPage";
import LoginPage from "modules/auth/pages/LoginPage";
import RegisterPage from "modules/auth/pages/RegisterPage";
import ForgotPage from "modules/auth/pages/ForgotPage";

import AdminPage from "modules/admin/pages/AdminPage";
import UserPage from "modules/admin/pages/user/UserPage";
import UserForm from "modules/admin/pages/user/UserForm";
import ProductPage from "modules/admin/pages/products/ProductPage";
import ProductForm from "modules/admin/pages/products/ProductForm";

import { OrderPage } from "modules/admin/pages/orders/OrderPage";
import { TicketPage } from "modules/admin/pages/tickets/TicketPage";
import { ReportPage } from "modules/admin/pages/reports/ReportPage";
import { ProfilePage } from "modules/admin/pages/profile/ProfilePage";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "auth",
		element: (
			<PublicRoute>
				<AuthPage />
			</PublicRoute>
		),
		children: [
			{ path: "login", element: <LoginPage /> },
			{ path: "register", element: <RegisterPage /> },
			{ path: "forgot", element: <ForgotPage /> },
		],
	},
	{
		path: "admin",
		element: (
			<ProtectedRoute>
				<AdminPage />
			</ProtectedRoute>
		),
		children: [
			{
				path: "users",
				children: [
					{
						path: "",
						element: <UserPage />,
					},
					{
						path: ":idUser",
						element: <UserForm />,
					},
				],
			},
			{
				path: "products",
				children: [
					{
						path: "",
						element: <ProductPage />,
					},
					{
						path: ":idProduct",
						element: <ProductForm />,
					},
				],
			},
			{ path: "orders", element: <OrderPage /> },
			{ path: "tickets", element: <TicketPage /> },
			{ path: "reports", element: <ReportPage /> },
			{ path: "profile", element: <ProfilePage /> },
		],
	},
];
