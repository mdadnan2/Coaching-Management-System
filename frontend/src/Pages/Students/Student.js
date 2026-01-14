import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, IconButton, Chip } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import Addmission from "../Addmission/MultiStepAdmission";
import instance from "../../apis/apiRequest";
import { student, RegisterStudent, Update } from "../../apis/apiContsants";
import { TableSkeleton, EmptyState, PageTransition } from "../../components/common";
import toast from 'react-hot-toast';

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
      .then((res) => {
        setData(res.data.data);
      })
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

  return (
    <PageTransition>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Students
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditedStudentData(undefined);
              setOpen(true);
            }}
          >
            Add Student
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Paper>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Joined</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Qualification</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableSkeleton rows={5} cols={7} />
              ) : filteredData.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7}>
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
                    <TableRow key={row._id} hover>
                      <TableCell>{row.studentname}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.dateOfJoining}</TableCell>
                      <TableCell>{row.highestQualification}</TableCell>
                      <TableCell>
                        <Chip label={row.selectCourse} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary" onClick={() => handleEdit(row._id)}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => {
                          setDeleteId(row._id);
                          setDeleteOpen(true);
                        }}>
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
            <Addmission onSubmit={onSubmitClick} sendStudentData={editedStudentData} />
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
          <DialogTitle>Delete Student</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this student? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageTransition>
  );
};

export default Students;
