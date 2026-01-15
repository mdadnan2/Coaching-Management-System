import { Box, Button, Card, TextField, Typography, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import instance from "../../../apis/apiRequest";
import { AddChapter as AddChapterEndpoint, UpdateChapter } from "../../../apis/apiContsants";
import toast from "react-hot-toast";

const ChapterForm = () => {
  const { id: courseId } = useParams();
  const location = useLocation();
  const editChapter = location.state?.chapter;
  const [chapterForm, setChapterForm] = useState({
    title: "",
    description: "",
    concepts: [],
    references: [],
  });
  const [conceptInput, setConceptInput] = useState("");
  const [referenceInput, setReferenceInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (editChapter) {
      setChapterForm({
        title: editChapter.title || "",
        description: editChapter.description || "",
        concepts: editChapter.concepts || [],
        references: editChapter.references || [],
      });
    }
  }, [editChapter]);

  const handleChange = (e) => {
    setChapterForm({ ...chapterForm, [e.target.name]: e.target.value });
  };

  const addConcept = () => {
    if (conceptInput.trim()) {
      setChapterForm({ ...chapterForm, concepts: [...chapterForm.concepts, conceptInput] });
      setConceptInput("");
    }
  };

  const removeConcept = (index) => {
    setChapterForm({
      ...chapterForm,
      concepts: chapterForm.concepts.filter((_, i) => i !== index),
    });
  };

  const addReference = () => {
    if (referenceInput.trim()) {
      setChapterForm({ ...chapterForm, references: [...chapterForm.references, referenceInput] });
      setReferenceInput("");
    }
  };

  const removeReference = (index) => {
    setChapterForm({
      ...chapterForm,
      references: chapterForm.references.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...chapterForm, courseId };
    
    if (editChapter) {
      instance.post(UpdateChapter, { ...payload, _id: editChapter._id })
        .then(() => {
          toast.success("Chapter updated successfully!");
          navigate(-1);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update chapter");
        });
    } else {
      instance.post(AddChapterEndpoint, payload)
        .then(() => {
          toast.success("Chapter created successfully!");
          navigate(-1);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create chapter");
        });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            {editChapter ? 'Edit Chapter' : 'Add Chapter'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editChapter ? 'Update chapter details' : 'Create a new chapter with concepts and references'}
          </Typography>
        </Box>

        <Card sx={{ p: { xs: 2, sm: 4 }, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
              <TextField
                label="Chapter Title"
                name="title"
                value={chapterForm.title}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                placeholder="e.g., Introduction to React"
              />

              <TextField
                label="Description"
                name="description"
                value={chapterForm.description}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Brief description of the chapter"
              />

              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Concepts
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    placeholder="Add a concept"
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addConcept())}
                    fullWidth
                    size="small"
                  />
                  <Button 
                    variant="contained" 
                    onClick={addConcept} 
                    startIcon={<Add />}
                    size="small"
                    fullWidth={false}
                    sx={{ minWidth: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {chapterForm.concepts.map((concept, i) => (
                    <Chip
                      key={i}
                      label={concept}
                      onDelete={() => removeConcept(i)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  References
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    placeholder="Add a reference URL"
                    value={referenceInput}
                    onChange={(e) => setReferenceInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addReference())}
                    fullWidth
                    size="small"
                  />
                  <Button 
                    variant="contained" 
                    onClick={addReference} 
                    startIcon={<Add />}
                    size="small"
                    fullWidth={false}
                    sx={{ minWidth: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {chapterForm.references.map((ref, i) => (
                    <Chip
                      key={i}
                      label={ref}
                      onDelete={() => removeReference(i)}
                      color="secondary"
                      variant="outlined"
                      component="a"
                      href={ref}
                      target="_blank"
                      clickable
                      size="small"
                      sx={{ fontSize: '0.75rem', maxWidth: '100%' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button onClick={() => navigate(-1)} size="small" fullWidth={false} sx={{ order: { xs: 2, sm: 1 } }}>Cancel</Button>
                <Button type="submit" variant="contained" size="small" fullWidth={false} sx={{ order: { xs: 1, sm: 2 } }}>
                  {editChapter ? 'Update Chapter' : 'Create Chapter'}
                </Button>
              </Box>
            </Box>
          </form>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ChapterForm;
