import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MonitorIcon from '@mui/icons-material/Monitor';
import HealingIcon from '@mui/icons-material/Healing';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, keyframes } from '@mui/material/styles';
import bgimage from '/physio.jpg';

// Keyframes for animations
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components for consistency and animations
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    animation: `${pulseAnimation} 2s infinite`
  }
}));

const RotatingIconAvatar = styled(Avatar)(({ theme }) => ({
  animation: `${rotateIcon} 3s infinite linear`,
  bgcolor: theme.palette.secondary.main,
  mx: 'auto',
  mb: 2,
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5), // Reduced padding from 8 to 5
  textAlign: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
  marginBottom: theme.spacing(5), // Reduced margin from 8 to 5
}));

const ParallaxSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://source.unsplash.com/featured/?fitness)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  padding: theme.spacing(8), // Reduced padding from 10 to 8
  textAlign: 'center',
  marginTop: theme.spacing(3), // Reduced top margin
}));

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ mt: 3, p: 2 }}> {/* Reduced margin-top and padding */}
      {/* Hero Section */}
      <Box
        sx={{
          py: 8, // Reduced vertical padding
          backgroundImage: `url(${bgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Semi-transparent overlay for better readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
            zIndex: 1,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
            Accelerate Your Recovery Journey
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
            Personalized exercise plans tailored to your injury and progress.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, animation: `${pulseAnimation} 2s infinite` }} 
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Feature Section with Parallax */}
      <Box sx={{ mt: 8 }}> {/* Reduced margin-top */}
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Our Features
        </Typography>
        <ParallaxSection>
          <Grid container spacing={3} sx={{ mt: 3 }}> {/* Reduced spacing and margin */}
            <Grid item xs={12} md={4}>
              <AnimatedCard elevation={3}>
                <CardContent>
                  <RotatingIconAvatar>
                    <HealingIcon />
                  </RotatingIconAvatar>
                  <Typography variant="h5" fontWeight="bold">
                    Injury-based Recommendations
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}> {/* Reduced margin */}
                    Get the best exercises to match your recovery needs based on your injury type.
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AnimatedCard elevation={3}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#4caf50', mx: 'auto', mb: 1 }}> {/* Reduced margin-bottom */}
                    <MonitorIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    Real-time Monitoring
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}> {/* Reduced margin */}
                    Get instant feedback on your exercises with real-time monitoring.
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AnimatedCard elevation={3}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#ff9800', mx: 'auto', mb: 1 }}> {/* Reduced margin-bottom */}
                    <FitnessCenterIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    Progress Tracking
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}> {/* Reduced margin */}
                    Track your progress and adjust your exercises as you recover.
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </Grid>
        </ParallaxSection>
      </Box>

      {/* Staggered Content Presentation */}
      <Grid container spacing={3} sx={{ mt: 4 }}> {/* Reduced spacing */}
        <Grid item xs={12} md={6}>
          <FeatureBox sx={{ backgroundColor: '#e1f5fe' }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Personalized Plans
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}> {/* Reduced margin */}
              Our app generates personalized exercise plans based on your injury details.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }} 
              onClick={() => navigate('/chat')}
            >
              Start Now
            </Button>
          </FeatureBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <FeatureBox sx={{ backgroundColor: '#ffebee' }}>
            <Typography variant="h4" fontWeight="bold" color="secondary">
              Track Progress in Real-Time
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}> {/* Reduced margin */}
              Monitor how your exercises are helping you recover and improve over time.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }} 
              onClick={() => navigate('/dashboard')}
            >
              Learn More
            </Button>
          </FeatureBox>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ py: 6, mt: 4 }}> {/* Reduced padding and margin */}
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How does the injury-based recommendation work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We analyze the details of your injury and recommend exercises that are proven to aid recovery.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Can I cancel my subscription?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can cancel your subscription at any time without any additional charges.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Do I need any equipment for the exercises?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Most exercises do not require any equipment, but some may benefit from common items like resistance bands.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Footer Section */}
      <Box sx={{ py: 3, backgroundColor: '#2c3e50', color: '#fff', textAlign: 'center', mt: 4, borderRadius: '10px' }}>
        <Typography variant="body1" gutterBottom>
          &copy; 2024 SajiloRehab. All Rights Reserved.
        </Typography>
        <Typography variant="body2">Contact us: anupadhikari269@gmail.com | Follow us on social media</Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
