import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, Avatar, LinearProgress, Chip, IconButton, Paper } from "@mui/material";
import { TrendingUp, TrendingDown, People, School, CheckCircle, Cancel, MoreVert, CalendarMonth, LibraryBooks } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { motion } from "framer-motion";
import instance from "../../apis/apiRequest";
import toast from "react-hot-toast";

const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card sx={{ 
      p: 2, 
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
        borderColor: color,
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 40, height: 40 }}>
          <Icon fontSize="small" />
        </Avatar>
        <Chip 
          icon={trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
          label={change}
          size="small"
          sx={{ 
            bgcolor: trend === 'up' ? '#10b98115' : '#ef444415',
            color: trend === 'up' ? '#10b981' : '#ef4444',
            fontWeight: 600,
            height: 24
          }}
        />
      </Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
        {title}
      </Typography>
    </Card>
  </motion.div>
);

const QuickStat = ({ label, value, color }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value}%</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={value} 
      sx={{ 
        height: 6, 
        borderRadius: 3,
        bgcolor: `${color}15`,
        '& .MuiLinearProgress-bar': { bgcolor: color }
      }}
    />
  </Box>
);

const RecentActivity = ({ name, action, time, avatar }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>{avatar}</Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body2" fontWeight={500}>{name}</Typography>
      <Typography variant="caption" color="text.secondary">{action}</Typography>
    </Box>
    <Typography variant="caption" color="text.secondary">{time}</Typography>
  </Box>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    completed: 0
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, studentsRes, coursesRes] = await Promise.all([
        instance.get('/student/stats'),
        instance.get('/student/'),
        instance.get('/course/')
      ]);
      
      setStats(statsRes.data.data);
      setStudents(studentsRes.data.data);
      setCourses(coursesRes.data.data || []);
      console.log('Courses loaded:', coursesRes.data.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { id: 0, value: stats.active ?? 0, label: "Active", color: "#6366f1" },
    { id: 1, value: stats.inactive ?? 0, label: "Inactive", color: "#f59e0b" },
    { id: 2, value: stats.completed ?? 0, label: "Completed", color: "#10b981" },
  ];

  const courseProgress = courses.map(course => ({
    label: course.title,
    value: Math.floor(Math.random() * 40) + 60 // Random for now, replace with actual progress
  })).slice(0, 4);

  const recentActivities = students.slice(0, 5).map(student => {
    const formattedDate = student.createdDate 
      ? new Date(student.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
      : 'Invalid Date';
    
    return {
      name: student.studentname,
      action: student.selectCourse ? `Enrolled in ${student.selectCourse}` : 'Registered',
      time: formattedDate,
      avatar: student.studentname.charAt(0).toUpperCase()
    };
  });

  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading...</Typography></Box>;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening with your coaching center today.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.total ?? 0}
            change="+12.5%"
            icon={People}
            color="#6366f1"
            trend="up"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Active Students"
            value={stats.active ?? 0}
            change="+8.2%"
            icon={School}
            color="#10b981"
            trend="up"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Inactive Students"
            value={stats.inactive ?? 0}
            change="-2.4%"
            icon={Cancel}
            color="#f59e0b"
            trend="down"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Completed Courses"
            value={stats.completed ?? 0}
            change="+5.1%"
            icon={CheckCircle}
            color="#ec4899"
            trend="up"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 2, border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Student Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
              <PieChart
                series={[{
                  data: chartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 20, additionalRadius: -20 },
                  innerRadius: 30,
                  paddingAngle: 2,
                }]}
                width={300}
                height={180}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                    itemMarkWidth: 12,
                    itemMarkHeight: 12,
                    markGap: 4,
                    itemGap: 8,
                  },
                }}
                margin={{ top: 0, bottom: 40, left: 0, right: 0 }}
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Live Courses
            </Typography>
            {courses.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {courses.map((course) => (
                  <Box key={course._id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <LibraryBooks />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{course.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{course.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No courses available</Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>Recent Activity</Typography>
            </Box>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, i) => (
                <RecentActivity key={i} {...activity} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>No recent activity</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
