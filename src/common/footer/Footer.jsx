import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { YouTube, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#0C1C2D', color: 'white', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Logo + Social */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              borderRight: { md: '2px solid #f2eeee', xs: 'none' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <img
              src={`/images/image/logo.png`}
              alt="JadeCaps Logo"
              style={{ width: '160px', marginBottom: '20px' }}
            />

            <Box>
              <IconButton
                color="inherit"
                sx={{ mr: 1 }}
                href="https://www.youtube.com/channel/UCZzAxHIseSk-nepsA-HV_mw"
                target="_blank"
              >
                <YouTube />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/company/jadecaps-technologies-pte-ltd/"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Address */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              borderRight: { md: '2px solid #f2eeee', xs: 'none' },
              textAlign: { xs: 'center', md: 'left' },
              mt: { xs: 4, md: 0 }
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontFamily: 'Inter, sans-serif', mb: 1 }}
            >
              Find Us Here
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>
              # 2nd Floor, 9, Sarjapur - Marathahalli Rd, 1st Block Koramangala,<br />
              Bengaluru, Karnataka 560034
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Inter, sans-serif' }}>
              # 10 Anson Road, #10-11 International Plaza, Singapore 079903
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Inter, sans-serif' }}>
              # 10 Komplek Nakula Plaza B-8, Jl. Nakula, Kuta, Badung, Bali
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Inter, sans-serif' }}>
              +91 79816 09550
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>
              <Box
                component="a"
                href="mailto:customer@jadecaps.com"
                sx={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  '&:hover': { color: '#c5c5c5' }
                }}
              >
                customer@jadecaps.com
              </Box>
            </Typography>
          </Grid>

          {/* Company Links */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ textAlign: { xs: 'center', md: 'left' }, mt: { xs: 4, md: 0 } }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontFamily: 'Inter, sans-serif', mb: 1 }}
            >
              Company
            </Typography>
            <Typography
              sx={{ cursor: 'pointer', fontFamily: 'Inter, sans-serif', mb: 1 }}
              onClick={() => navigate('/')}
            >
              Home
            </Typography>
            <Typography
              sx={{ cursor: 'pointer', fontFamily: 'Inter, sans-serif', mb: 1 }}
              onClick={() => window.location.href = 'https://owner.jadecaps.com'}
            >
              Property Owner
            </Typography>
            <Typography
              sx={{ cursor: 'pointer', fontFamily: 'Inter, sans-serif', mb: 1 }}
              onClick={() => navigate('/contact-us')}
            >
              Contact Us
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Text */}
        <Box mt={6} textAlign="center">
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            © 2025 JadeCaps. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
