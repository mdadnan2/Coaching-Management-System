import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogContent, Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, IconButton, Chip, Avatar, InputAdornment } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Search, Add, Edit, Delete, FilterList, Download } from "@mui/icons-material";
import MultiStepAdmission from "../Addmission/MultiStepAdmission";
import instance from "../../apis/apiRequest";
import { student, RegisterStudent, Update } from "../../apis/apiContsants";
import { TableSkeleton, EmptyState } from "../../components/common";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Students = () => {
  const [userData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedStudentData, setEditedStudentData] = useState();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getStudentsData();
  }, []);

  const getStudentsData = () => {
    setLoading(true);
    instance.get(student)
      .then((res) => setData(res.data.data))
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load students');
      })
      .finally(() => setLoading(false));
  };

  const addStudent = (params) => {
    instance.post(RegisterStudent, params)
      .then(() => {
        getStudentsData();
        setOpen(false);
        toast.success('Student added successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to add student');
      });
  };

  const updateStudent = (updateID) => {
    instance.post(Update, updateID)
      .then(() => {
        getStudentsData();
        setOpen(false);
        toast.success('Student updated successfully!');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to update student');
      });
  };

  const handleEdit = (studentId) => {
    instance.get(student + studentId)
      .then((res) => {
        setEditedStudentData(res.data.data);
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    instance.delete(student + deleteId)
      .then(() => {
        getStudentsData();
        setDeleteOpen(false);
        toast.success('Student deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete student');
      });
  };

  const onSubmitClick = (formData) => {
    if (formData.studentname && formData.phoneNumber && formData.email) {
      editedStudentData ? updateStudent(formData) : addStudent(formData);
    }
  };

  const filteredData = userData.filter(row => 
    row.studentname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.phoneNumber?.includes(searchTerm)
  );

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Course", "Joined"],
      ...filteredData.map(s => [
        s.studentname,
        s.email,
        s.phoneNumber,
        s.selectCourse,
        s.dateOfJoining
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    toast.success("Students exported!");
  };

  const getStatusColor = (course) => {
    const colors = {
      'Front-end Development': 'primary',
      'Back-end Development': 'success',
      'Full-stack Development': 'secondary'
    };
    return colors[course] || 'default';
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Students
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all student information in one place
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: { xs: '1 1 100%', sm: 1 }, minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="outlined" startIcon={<FilterList />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              Filter
            </Button>
            <Button variant="outlined" startIcon={<Download />} onClick={handleExport}>
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setEditedStudentData(undefined);
                setOpen(true);
              }}
              sx={{ flex: { xs: '1 1 100%', sm: 'initial' } }}
            >
              Add Student
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 600, md: 750 } }}>
              <TableHead>
                <TableRow sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Joined</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableSkeleton rows={5} cols={6} />
              ) : filteredData.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <EmptyState
                        title="No students found"
                        description="Add your first student to get started"
                        actionLabel="Add Student"
                        onAction={() => {
                          setEditedStudentData(undefined);
                          setOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row._id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {row.studentname?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {row.studentname}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {row.studentId || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.dateOfJoining}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.selectCourse} 
                          size="small" 
                          color={getStatusColor(row.selectCourse)}
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(row._id)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setDeleteId(row._id);
                            setDeleteOpen(true);
                          }}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <MultiStepAdmission onSubmit={onSubmitClick} sendStudentData={editedStudentData} />
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Delete Student
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Are you sure you want to delete this student? This action cannot be undone.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default Students;
