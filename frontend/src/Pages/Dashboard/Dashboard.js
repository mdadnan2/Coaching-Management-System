import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import { CoPresent, Check, DoNotDisturbAlt, AssignmentTurnedIn } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PageTransition } from "../../components/common";
import { keyframes } from "@mui/system";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Dashboard = () => {
  const [stats] = useState({
    total: 30,
    active: 18,
    inactive: 4,
    completed: 8
  });

  const cards = [
    { title: "Total Students", icon: CoPresent, value: stats.total, color: "#FF8989", trend: "+12%" },
    { title: "Active Students", icon: Check, value: stats.active, color: "#1e81b0", trend: "+8%" },
    { title: "Inactive Students", icon: DoNotDisturbAlt, value: stats.inactive, color: "#BE3144", trend: "-2%" },
    { title: "Course Complete", icon: AssignmentTurnedIn, value: stats.completed, color: "#65B741", trend: "+5%" },
  ];

  const chartData = [
    { id: 0, value: stats.active, label: "Active", color: "#1e81b0" },
    { id: 1, value: stats.inactive, label: "Inactive", color: "#BE3144" },
    { id: 2, value: stats.completed, label: "Completed", color: "#65B741" },
  ];

  return (
    <PageTransition>
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Overview
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Grid item xs={12} sm={6} lg={3} key={card.title}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                    color: 'white',
                    animation: `${slideUp} 0.4s ease-out ${i * 0.1}s both`,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h3" fontWeight={700}>
                        {card.value}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: 'block' }}>
                        {card.trend} from last month
                      </Typography>
                    </Box>
                    <Icon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Student Distribution
              </Typography>
              <PieChart
                series={[{
                  data: chartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                }]}
                height={300}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Calendar
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageTransition>
  );
};

export default Dashboard;
