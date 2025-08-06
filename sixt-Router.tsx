import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/constants/paths";

import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProfileLayout from "@/layouts/ProfileLayout";

import HomePage from "@/pages/(business)/home";

import RentListPage from "@/pages/(business)/list";
import RentReserveStepOne from "@/pages/(business)/reserveStepOne";
import RentReserveStepTwo from "@/pages/(business)/reserveStepTwo";

import PaymentPage from "@/pages/(business)/payment";

import DashboardMainPage from "@/pages/(dashboard)/main";
import DashboardUserListPage from "@/pages/(dashboard)/user/list";

import DashboardRentListPage from "@/pages/(dashboard)/rent/list";
import DashboardRentCreatePage from "@/pages/(dashboard)/rent/create";
import DashboardRentEditPage from "@/pages/(dashboard)/rent/edit";
import DashboardRentDeletePage from "@/pages/(dashboard)/rent/delete";

import DashboardCategoriesPage from "@/pages/(dashboard)/category/list";
import DashboardCategoryCreatePage from "@/pages/(dashboard)/category/create";
import DashboardCategoryEditPage from "@/pages/(dashboard)/category/edit";
import DashboardCategoryDeletePage from "@/pages/(dashboard)/category/delete";

import DashboardLocationsPage from "@/pages/(dashboard)/location/list";
import DashboardLocationCreatePage from "@/pages/(dashboard)/location/create";
import DashboardLocationEditPage from "@/pages/(dashboard)/location/edit";
import DashboardLocationDeletePage from "@/pages/(dashboard)/location/delete";

import DashboardReservationListPage from "@/pages/(dashboard)/reservation/list";

import ProfilePage from "@/pages/(business)/profile";
import ProfileEditPage from "@/pages/(business)/profile/edit";
import ProfileDeletePage from "@/pages/(business)/profile/delete";
import { ResetDialog } from "@/components/shared/dialogs/ResetPassword";
import ReservationsPage from "@/pages/(business)/reservations";

import SuccessPage from "@/pages/(stripe)/success";
import CancelPage from "@/pages/(stripe)/cancel";
import FavoriteRentListPage from "@/pages/(business)/favorite";
import DiscountPage from "@/pages/(business)/discount";
import ErrorPage from "@/components/shared/ErrorPage";
import BusinessPage from "@/pages/(business)/business";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: paths.HOME,
        element: <HomePage />,
        children: [
          {
            path: paths.RESETPASSWORD(),
            element: <ResetDialog />,
          },
        ],
      },
      {
        path: paths.TRUCKS,
        element: <HomePage />,
      },
      {
        path: paths.BUSINESS,
        element: <BusinessPage />,
      },
      {
        path: paths.DISCOUNTS,
        element: <DiscountPage />,
      },

      {
        path: paths.LIST,
        element: <RentListPage />,
      },
      {
        path: paths.FAVORITES,
        element: <FavoriteRentListPage />,
      },

      {
        path: paths.DETAIL(),
        element: <RentReserveStepOne />,
      },
      {
        path: paths.DETAILRESERVE(),
        element: <RentReserveStepTwo />,
      },
      {
        path: paths.PAYMENT(),
        element: <PaymentPage />,
      },
      {
        path: paths.RESERVATIONS,
        element: <ReservationsPage />,
      },
      {
        path: paths.SUCCESS,
        element: <SuccessPage />,
      },
      {
        path: paths.CANCEL,
        element: <CancelPage />,
      },
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <ProfileLayout />,
            children: [
              {
                path: paths.PROFILE.MAIN,
                element: <ProfilePage />,
              },
              {
                path: paths.PROFILE.EDIT,
                element: <ProfileEditPage />,
              },
              {
                path: paths.PROFILE.DELETE,
                element: <ProfileDeletePage />,
              },
            ],
          },
        ],
      },

      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: paths.DASHBOARD.MAIN,
            element: <DashboardMainPage />,
          },
          {
            path: paths.DASHBOARD.USERS.LIST,
            element: <DashboardUserListPage />,
          },

          {
            path: paths.DASHBOARD.RENTS.LIST,
            element: <DashboardRentListPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.CREATE,
            element: <DashboardRentCreatePage />,
          },
          {
            path: paths.DASHBOARD.RENTS.EDIT(),
            element: <DashboardRentEditPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.DELETE(),
            element: <DashboardRentDeletePage />,
          },

          {
            path: paths.DASHBOARD.CATEGORIES.LIST,
            element: <DashboardCategoriesPage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.CREATE,
            element: <DashboardCategoryCreatePage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.EDIT(),
            element: <DashboardCategoryEditPage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.DELETE(),
            element: <DashboardCategoryDeletePage />,
          },

          {
            path: paths.DASHBOARD.LOCATIONS.LIST,
            element: <DashboardLocationsPage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.CREATE,
            element: <DashboardLocationCreatePage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.EDIT(),
            element: <DashboardLocationEditPage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.DELETE(),
            element: <DashboardLocationDeletePage />,
          },

          {
            path: paths.DASHBOARD.RESERVATIONS.LIST,
            element: <DashboardReservationListPage />,
          },
        ],
      },
    ],
  },
]);
