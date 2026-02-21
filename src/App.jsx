import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Members from "./pages/members";
import NewMember from "./pages/new-member";
import ExpiredMembers from "./pages/expired-members";
import MemberEnquiry from "./pages/member-enquiry";
import Programs from "./pages/programs";
import Trainers from "./pages/trainers";
import Schedule from "./pages/schedule";
// import Analytics from "./pages/analytics";
import Settings from "./pages/settings";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <AppLayout title="Dashboard">
          <Dashboard />
        </AppLayout>
      }
    />
    <Route
      path="/members"
      element={
        <AppLayout title="Members">
          <Members />
        </AppLayout>
      }
    />
    <Route
      path="/new-member"
      element={
        <AppLayout title="New Member">
          <NewMember />
        </AppLayout>
      }
    />
    <Route
      path="/expired-members"
      element={
        <AppLayout title="Expired Members">
          <ExpiredMembers />
        </AppLayout>
      }
    />
    <Route
      path="/member-enquiry"
      element={
        <AppLayout title="Member Enquiry">
          <MemberEnquiry />
        </AppLayout>
      }
    />
    <Route
      path="/programs"
      element={
        <AppLayout title="Programs">
          <Programs />
        </AppLayout>
      }
    />
    <Route
      path="/trainers"
      element={
        <AppLayout title="Trainers">
          <Trainers />
        </AppLayout>
      }
    />
    <Route
      path="/schedule"
      element={
        <AppLayout title="Schedule">
          <Schedule />
        </AppLayout>
      }
    />
    {/* <Route
      path="/analytics"
      element={
        <AppLayout title="Analytics">
          <Analytics />
        </AppLayout>
      }
    /> */}
    <Route
      path="/settings"
      element={
        <AppLayout title="Settings">
          <Settings />
        </AppLayout>
      }
    />
  </Routes>
);

export default App;
