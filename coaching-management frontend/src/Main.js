import React from "react";
import ModernSidebar from "./components/ModernSidebar";
import { Routes, Route } from "react-router-dom";
import Students from "./Pages/Students/Student";
import Addmission from "./Pages/Addmission/Addmission";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddCourse from "./Pages/Syllabus/Add Course/Add_course";
import ChapterForm from "./Pages/Syllabus/Add Chapter in Course/ChapterForm";
import AddChapter from "./Pages/Syllabus/Add Chapter in Course/AddChapter";

const Main = () => {
  return (
    <ModernSidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/addmission_form" element={<Addmission />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path={"/selectCourse/:id"} element={<AddChapter />} />
        <Route path={"/syllabusForm"} element={<ChapterForm />} />
      </Routes>
    </ModernSidebar>
  );
};

export default Main;
