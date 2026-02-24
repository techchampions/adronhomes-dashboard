import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ContractTransactionList from "../components/ContractsDashboardComponents/TransactionListModal";
import Loader from "../components/Loader";
import Modal from "../components/Modal2";
import Toast from "../components/Toast";
import OnboardingScreen from "../pages/AuthScreen";
import ContractsPage from "../pages/ContractsScreen";
import FAQAccordion from "../pages/FAQScreen";
import ForgotPassword from "../pages/ForgotPassword";
import HomeScreen from "../pages/HomeScreen";
import InvestmentForm from "../pages/InvestInProperty";
import InvestmentDetailForm from "../pages/InvestmentDetailForm";
import Login from "../pages/Login";
import MyProfileScreen from "../pages/MyProfileScreen";
import MyPropertyDetail from "../pages/MyPropertyDetail";
import MyPropertyPaymentList from "../pages/MyPropertyPaymentList";
import MyPropertyScreen from "../pages/MyPropertyScreen";
import NewPropertyScreen from "../pages/NewPropertyScreen";
import NotificationsPage from "../pages/NotificationScreen";
import OTPScreen from "../pages/OTPScreen";
import PropertyDetail from "../pages/PropertyDetail";
import PropertyPaymentMethod from "../pages/PropertyPaymentMethod";
import PropertySearchResultScreen from "../pages/PropertySearchResult";
import ProppertyAgreement from "../pages/ProppertyAgreement";
import ResetPassword from "../pages/ResetPassword";
import SavedPropertyScreen from "../pages/SavedPropertyScreen";
import SignUp from "../pages/SignUp";
import SupportScreen from "../pages/SupportScreen";
import TransactionsPage from "../pages/TransactionScreen";
import WalletScreen from "../pages/WalletScreen";
import AnalyticsTracker from "../utils/GoogleAnalyticsTracker";
import { useOnboardingStore } from "../zustand/OnboardingStore";
import { useUserStore } from "../zustand/UserStore";
import { useToastStore } from "../zustand/useToastStore";
import AuthRoutes from "./authRoutes";
import ProtectedRoutes from "./protectedRoutes";

const DashboardScreen = lazy(() => import("../pages/DashboardScreen"));

const AllRoutes = () => {
  const { message, type, hideToast } = useToastStore();
  const { hasCompletedOnboarding } = useOnboardingStore();
  const { isLoggedIn } = useUserStore();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-[100px] w-[100px]" />}>
          <AnalyticsTracker />

          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    isLoggedIn && hasCompletedOnboarding
                      ? "/dashboard"
                      : "/login"
                  }
                  replace
                />
              }
            />

            {/* Protected Routes - Dashboard */}

            <Route path="/dashboard/*" element={<ProtectedRoutes />}>
              <Route element={<DashboardScreen />}>
                <Route index element={<HomeScreen />} />
                <Route path="wallet" element={<WalletScreen />} />
                <Route path="payments" element={<TransactionsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="my-properties" element={<MyPropertyScreen />} />
                <Route path="new-properties" element={<NewPropertyScreen />} />
                <Route
                  path="search-properties"
                  element={<PropertySearchResultScreen />}
                />
                <Route
                  path="saved-properties"
                  element={<SavedPropertyScreen />}
                />
                <Route path="settings" element={<MyProfileScreen />} />
                <Route path="my-contracts" element={<ContractsPage />} />
                <Route
                  path="my-contracts/:id/transactions"
                  element={<ContractTransactionList />}
                />
                <Route path="support" element={<SupportScreen />} />
                <Route
                  path="properties/:id"
                  element={<PropertyDetail />}
                />{" "}
                <Route
                  path="invest-property-form/:id"
                  element={<InvestmentDetailForm />}
                />{" "}
                <Route
                  path="invest-property/:id"
                  element={<InvestmentForm />}
                />{" "}
                <Route
                  path="property-agreement/:id"
                  element={<ProppertyAgreement />}
                />{" "}
                <Route
                  path="property/:id/payment-method"
                  element={<PropertyPaymentMethod />}
                />{" "}
                <Route path="my-property/:id" element={<MyPropertyDetail />} />
                <Route
                  path="my-property/payment-list/:id"
                  element={<MyPropertyPaymentList />}
                />
                <Route path="FAQs" element={<FAQAccordion />} />
              </Route>
            </Route>

            {/* Login Route */}
            <Route path="/" element={<AuthRoutes />}>
              <Route element={<OnboardingScreen />}>
                <Route path="/login" index element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-otp" element={<OTPScreen />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <Toast />
        <Modal />
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
