import { Box, Button, Card, Typography, IconButton, Chip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Add, Edit, Delete } from "@mui/icons-material";
import instance from "../../../apis/apiRequest";
import { Chapter, AddChapter as AddChapterEndpoint, UpdateChapter } from "../../../apis/apiContsants";
import { EmptyState, LoadingOverlay } from "../../../components/common";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddChapter = () => {
  const { id: courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getChapters();
  }, []);

  const getChapters = () => {
    setLoading(true);
    instance.get(`${Chapter}?courseId=${courseId}`)
      .then((res) => setChapters(res.data.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load chapters");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this chapter?")) {
      instance.delete(Chapter + id)
        .then(() => {
          toast.success("Chapter deleted");
          getChapters();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete chapter");
        });
    }
  };

  if (loading) return <LoadingOverlay message="Loading chapters..." />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Course Chapters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage chapters and course content
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate(`/syllabusForm/${courseId}`)}>
            Add Chapter
          </Button>
        </Box>

        {chapters.length === 0 ? (
          <EmptyState
            title="No chapters yet"
            description="Start by adding your first chapter"
            actionLabel="Add Chapter"
            onAction={() => navigate(`/syllabusForm/${courseId}`)}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {chapters.map((chapter, index) => (
              <Card
                key={chapter._id}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Chip label={`Chapter ${index + 1}`} size="small" color="primary" />
                      <Typography variant="h6" fontWeight={600}>
                        {chapter.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {chapter.description}
                    </Typography>

                    {chapter.concepts && chapter.concepts.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                          Concepts:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {chapter.concepts.map((concept, i) => (
                            <Chip key={i} label={concept} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {chapter.references && chapter.references.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                          References:
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {chapter.references.map((ref, i) => (
                            <Chip
                              key={i}
                              label={ref}
                              size="small"
                              variant="outlined"
                              color="secondary"
                              component="a"
                              href={ref}
                              target="_blank"
                              clickable
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton size="small" color="primary" onClick={() => navigate(`/syllabusForm/${courseId}`, { state: { chapter } })}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(chapter._id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default AddChapter;
