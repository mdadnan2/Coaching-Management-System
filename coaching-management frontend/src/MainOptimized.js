import React, { lazy, Suspense } from "react";
import ModernSidebar from "./components/ModernSidebar";
import { Routes, Route } from "react-router-dom";
import { LoadingOverlay } from "./components/common";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./Pages/Dashboard/ModernDashboard"));
const Students = lazy(() => import("./Pages/Students/ModernStudent"));
const Addmission = lazy(() => import("./Pages/Addmission/Addmission"));
const AddCourse = lazy(() => import("./Pages/Syllabus/Add Course/ModernAddCourse"));
const ChapterForm = lazy(() => import("./Pages/Syllabus/Add Chapter in Course/ChapterForm"));
const AddChapter = lazy(() => import("./Pages/Syllabus/Add Chapter in Course/AddChapter"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));

const Main = () => {
  return (
    <ModernSidebar>
      <Suspense fallback={<LoadingOverlay message="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/addmission_form" element={<Addmission />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/selectCourse/:id" element={<AddChapter />} />
          <Route path="/syllabusForm/:id" element={<ChapterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </ModernSidebar>
  );
};

export default Main;
