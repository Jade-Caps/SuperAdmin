import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { YouTube, LinkedIn } from '@mui/icons-material';
import Logo from '../../assets/jadecapslogo.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: '#0C1C2D',
        color: '#fff',
        pt: { xs: 6, md: 10 },
        pb: { xs: 4, md: 6 },
        mt : "10"
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Logo + Social */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={Logo}
              alt="JadeCaps Logo"
              sx={{
                width: 160,
                mb: 2,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            />

            <Stack direction="row" spacing={1}>
              <IconButton
                color="inherit"
                href="https://www.youtube.com/channel/UCZzAxHIseSk-nepsA-HV_mw"
                target="_blank"
                sx={{
                  border: '1px solid #fff',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#0C1C2D'
                  }
                }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.linkedin.com/company/jadecaps-technologies-pte-ltd/"
                target="_blank"
                sx={{
                  border: '1px solid #fff',
                  '&:hover': {
                    bgcolor: '#fff',
                    color: '#0C1C2D'
                  }
                }}
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>

          {/* Address */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Find Us Here
            </Typography>
            <Typography variant="body2" gutterBottom>
              # 2nd Floor, 9, Sarjapur - Marathahalli Rd, 1st Block Koramangala,<br />
              Bengaluru, Karnataka 560034
            </Typography>
            <Typography variant="body2" gutterBottom>
              # 10 Anson Road, #10-11 International Plaza, Singapore 079903
            </Typography>
            <Typography variant="body2" gutterBottom>
              # 10 Komplek Nakula Plaza B-8, Jl. Nakula, Kuta, Badung, Bali
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              +91 79816 09550
            </Typography>
            <Typography variant="body2">
              <Box
                component="a"
                href="mailto:customer@jadecaps.com"
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#ddd',
                    textDecoration: 'underline'
                  }
                }}
              >
                customer@jadecaps.com
              </Box>
            </Typography>
          </Grid>

          {/* Company Links */}
          {/* <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#ddd' }
                }}
                onClick={() => navigate('/')}
              >
                Home
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#ddd' }
                }}
                onClick={() => window.location.href = 'https://owner.jadecaps.com'}
              >
                Property Owner
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#ddd' }
                }}
                onClick={() => navigate('/contact-us')}
              >
                Contact Us
              </Typography>
            </Box>
          </Grid> */}
        </Grid>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.1)',
            my: 4
          }}
        />

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          © {new Date().getFullYear()} JadeCaps. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
