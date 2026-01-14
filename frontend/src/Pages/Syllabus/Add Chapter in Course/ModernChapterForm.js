import { Box, Button, Card, TextField, Typography, IconButton, Chip } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add, Close } from "@mui/icons-material";
import { motion } from "framer-motion";

const ModernChapterForm = ({ onSubmit }) => {
  const [chapterForm, setChapterForm] = useState({
    title: "",
    description: "",
    concepts: [],
    references: [],
  });
  const [conceptInput, setConceptInput] = useState("");
  const [referenceInput, setReferenceInput] = useState("");

  const navigate = useNavigate();

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
    onSubmit(chapterForm);
    navigate(-1);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Add Chapter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new chapter with concepts and references
          </Typography>
        </Box>

        <Card sx={{ p: 4, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Chapter Title"
                name="title"
                value={chapterForm.title}
                onChange={handleChange}
                required
                fullWidth
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
                placeholder="Brief description of the chapter"
              />

              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Concepts
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Add a concept"
                    value={conceptInput}
                    onChange={(e) => setConceptInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addConcept())}
                    fullWidth
                    size="small"
                  />
                  <Button variant="contained" onClick={addConcept} startIcon={<Add />}>
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {chapterForm.concepts.map((concept, i) => (
                    <Chip
                      key={i}
                      label={concept}
                      onDelete={() => removeConcept(i)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  References
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    placeholder="Add a reference URL"
                    value={referenceInput}
                    onChange={(e) => setReferenceInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addReference())}
                    fullWidth
                    size="small"
                  />
                  <Button variant="contained" onClick={addReference} startIcon={<Add />}>
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" variant="contained" size="large">
                  Create Chapter
                </Button>
              </Box>
            </Box>
          </form>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ModernChapterForm;
