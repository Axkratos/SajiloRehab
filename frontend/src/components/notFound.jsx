import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const NotFound = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            {/* Optional: Add an illustration or image for visual appeal */}
            <Box
                component="img"
                src="https://source.unsplash.com/featured/?fitness" // You can replace this with an illustration
                alt="Page Not Found"
                sx={{
                    width: '100%',
                    maxWidth: '400px',
                    mb: 4, // Margin-bottom
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
            />
            
            {/* Main Heading */}
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#34495e' }}>
                Oops! This model is still in development
            </Typography>

            {/* Subtext */}
            <Typography variant="body1" sx={{ color: '#7f8c8d', maxWidth: '600px', mb: 4 }}>
                We are constantly improving our app! In the meantime, you can check out one of our developed models like Bicep Curls.
            </Typography>

            {/* Call-to-action Button */}
            <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/exercise/bicep-curls"
                sx={{ py: 1.5, px: 4, borderRadius: '8px' }}
            >
                Go to Bicep Curls
            </Button>
        </Container>
    );
};

export default NotFound;
