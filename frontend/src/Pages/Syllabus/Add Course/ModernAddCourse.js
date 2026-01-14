import React, { useEffect, useState } from "react";
import { Box, Button, Card, Typography, IconButton, Dialog, DialogContent, TextField, InputAdornment, Menu, MenuItem, Chip } from "@mui/material";
import { Add, Edit, Delete, Visibility, Search, FilterList, Download, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import instance from "../../../apis/apiRequest";
import { Add_Course, Course, Update_Course } from "../../../apis/apiContsants";
import { EmptyState, LoadingOverlay } from "../../../components/common";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ModernAddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseForm, setCourseForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    setLoading(true);
    instance.get(Course)
      .then((res) => setCourses(res.data.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load courses");
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = editedCourse ? Update_Course : Add_Course;
    const payload = editedCourse ? { ...courseForm, _id: editedCourse._id } : courseForm;

    instance.post(endpoint, payload)
      .then(() => {
        toast.success(editedCourse ? "Course updated!" : "Course created!");
        getCourses();
        setOpen(false);
        setCourseForm({ title: "", description: "" });
        setEditedCourse(null);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to save course");
      });
  };

  const handleEdit = (course) => {
    setEditedCourse(course);
    setCourseForm({ title: course.title, description: course.description });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this course?")) {
      instance.delete(Course + id)
        .then(() => {
          toast.success("Course deleted");
          getCourses();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete course");
        });
    }
  };

  const handleExport = () => {
    const csv = [
      ["Title", "Description"],
      ...filteredCourses.map(c => [c.title, c.description])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
    toast.success("Courses exported!");
  };

  const filteredCourses = courses.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingOverlay message="Loading courses..." />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Courses
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all courses and their content
          </Typography>
        </Box>

        <Card sx={{ p: 3, mb: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1, minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="outlined" startIcon={<Download />} onClick={handleExport}>
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setEditedCourse(null);
                setCourseForm({ title: "", description: "" });
                setOpen(true);
              }}
            >
              Add Course
            </Button>
          </Box>
        </Card>

        {filteredCourses.length === 0 ? (
          <EmptyState
            title="No courses found"
            description="Create your first course to get started"
            actionLabel="Add Course"
            onAction={() => setOpen(true)}
          />
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 3 }}>
            {filteredCourses.map((course) => (
              <Card
                key={course._id}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.1)" },
                }}
              >
                <Box sx={{ flex: 1, mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", alignItems: "center", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/selectCourse/${course._id}`)}
                  >
                    View
                  </Button>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(course)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(course._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                {editedCourse ? "Edit Course" : "Add New Course"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Course Title"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    required
                    fullWidth
                    multiline
                    rows={4}
                  />
                  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" variant="contained">
                      {editedCourse ? "Update" : "Create"}
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default ModernAddCourse;
