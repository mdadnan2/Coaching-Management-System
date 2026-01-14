import {
  Box,
  Card,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CourseForm from "../Course Form/CourseForm";
import instance from "../../../apis/apiRequest";
import "./Add_course.css";
import { useNavigate } from "react-router-dom";
import {
  Add_Course,
  Course,
  Update,
  Update_Course,
} from "../../../apis/apiContsants";

const AddCourse = () => {
  const [course, setCourse] = useState([]);
  const [editedCourse, setEditedCourse] = useState(); //props send
  const [open, setOpen] = useState(false); //dialog box
  const [dialogBoxDelete, setDialogBoxDelete] = useState();

  useEffect(() => {
    getCourse();
  }, []);

  //getCourse
  const getCourse = () => {
    instance
      .get(Course)
      .then((res) => {
        console.log("get course", res.data.data);
        setCourse(res.data.data);
      })
      .catch((err) => {
        console.log("cant get the course " + err);
      });
  };
  //add course
  const addCourse = (params) => {
    instance
      .post(Add_Course, params)
      .then((res) => {
        console.log("get course", res.data.data);
        getCourse();
        handleClose();
      })
      .catch((err) => {
        console.log("can't add the course " + err);
      });
  };

  //updateCourse
  const updateCourse = (params) => {
    instance
      .post(Update_Course, params)
      .then((res) => {
        console.log("course updated", res.data.data);
        getCourse();
        handleClose();
      })
      .catch((err) => {
        console.log("can't update the course " + err);
      });
  };

  //editCourse by getting single _id
  const editCourse = (params) => {
    setOpen(true);
    instance
      .get(Course + params)
      .then((res) => {
        console.log("get single course", res.data.data);
        setEditedCourse(res.data.data);
        // handleClose();
      })
      .catch((err) => {
        console.log("can't add the  course " + err);
      });
  };

  //deleteCourse
  const deleteCourse = (params) => {
    instance
      .delete(Course + params)
      .then((res) => {
        console.log("course deleted", res.data.data);
        getCourse();
        handleDeleteClose();
      })
      .catch((err) => {
        console.log("can't delete the  course " + err);
      });
  };

  //deletecourtse pop-up
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClickOpen = (courseId) => {
    setDialogBoxDelete(courseId);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  //validation of course

  const getValidation = (formData) => {
    if (!formData.title || !formData.description) {
      return false;
    }
    return true;
  };

  //course form submit
  const submitCourseForm = (courseData) => {
    if (getValidation(courseData)) {
      const params = {
        ...courseData,
      };
      if (editedCourse) {
        updateCourse(params);
      } else {
        addCourse(params);
      }
    } else {
      console.log("course validation failed");
    }
  };

  //dialog box for adding course

  const handleClickOpen = () => {
    setEditedCourse({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //viewCourse
  const navigate = useNavigate();
  const viewCourse = (id) => {
    navigate("/selectCourse/" + id);
  };
  return (
    <Box>
      <Box>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {course.length === 0 ? (
              <Typography sx={{ fontSize: "2rem", fontWeight: "bolder" }}>
                {"Add Course"}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "2rem", fontWeight: "bolder" }}>
                {"Select Course"}
              </Typography>
            )}
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  handleClickOpen();
                  setEditedCourse(undefined);
                }}
              >
                Add Course
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <CourseForm
                    onSubmit={submitCourseForm}
                    sendCourse={editedCourse}
                  />
                </DialogContent>
              </Dialog>
            </Box>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          {course.length === 0 ? (
            <Typography sx={{ textAlign: "center" }}>
              {"No course were added"}
            </Typography>
          ) : (
            <>
              {course.map((item) => (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Box className="courses">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px",
                      gap: "10px",
                    }}
                  >
                    {/* edit button */}
                    <Button
                      className="courseEdit"
                      sx={{ backgroundColor: "green", color: "white" }}
                      onClick={() => editCourse(item._id)}
                    >
                      <EditIcon />
                    </Button>

                    {/* delete button */}
                    <Button
                      className="courseDelete"
                      sx={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDeleteClickOpen(item._id)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Dialog
                      open={deleteOpen}
                      onClose={handleDeleteClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Confirm Deletion"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you really want to delete the course, this step is
                          undone!!!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteClose} variant="outlined">
                          Disagree
                        </Button>
                        <Button
                          onClick={() => deleteCourse(dialogBoxDelete)}
                          variant="outlined"
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* view button */}
                    <Button
                      className="courseView"
                      sx={{ backgroundColor: "blue", color: "white" }}
                      onClick={() => viewCourse(item._id)}
                    >
                      <FullscreenIcon />
                    </Button>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default AddCourse;
