// // src/styles/theme.js
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#214FC6',
//         },
//         secondary: {
//             main: '#78716C',
//         },
//         background: {
//             default: '#ecebe4',
//             main: 'rgb(15, 15, 15)',
//             dark: 'rgb(30, 30, 30)',
//             light: "#ffffff"
//         },
//         text: {
//             primary: '#ffffff',
//             dark: "#000000"
//         },
//     },
//     typography: {
//         fontFamily: `'Poppins', 'Roboto', sans-serif`,
//         h6: {
//             fontWeight: 600,
//             fontSize: '1.125rem',
//             color: 'inherit',  // <- instead of '#1a1a1a'
//         },
//         h5: {
//             fontWeight: 500,
//             fontSize: '1.115rem',
//             color: 'inherit',
//         },
//         body1: {
//             color: 'inherit', // <- inherits based on theme
//         },
//         subtitle1: {
//             color: 'inherit',
//         },
//     },


//     shape: {
//         borderRadius: 12,
//     },
//     components: {
//         MuiAppBar: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#ffffff',
//                     color: '#214FC6',
//                     boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
//                 },
//             },
//         },
//         MuiButton: {
//             variants: [
//                 {
//                     props: { variant: 'google' },
//                     style: {
//                         color: '#ffffff',
//                         border: '1px solid #ffffff55',
//                         textTransform: 'none',
//                         '&:hover': {
//                             borderColor: '#ffffff',
//                             backgroundColor: 'rgba(255,255,255,0.05)',
//                         },
//                     },
//                 },
//                 {
//                     props: { variant: 'whiteOutlined' },  // <-- specify props here
//                     style: {
//                         color: '#ffffff',
//                         border: '1px solid #ffffff55',
//                         backgroundColor: '#0f2437',
//                         textTransform: 'none',
//                         '&:hover': {
//                             borderColor: '#ffffff',
//                             backgroundColor: 'rgba(110, 106, 106, 0.57)',
//                         },
//                     },
//                 },
//             ],
//             styleOverrides: {
//                 root: {
//                     borderRadius: 8,
//                     textTransform: 'none',
//                     fontWeight: 500,
//                 },
//                 containedPrimary: {
//                     backgroundColor: '#214FC6',
//                     '&:hover': {
//                         backgroundColor: '#193aa1',
//                     },
//                 },
//                 outlined: {
//                     borderColor: '#ffffff88',
//                     color: '#ffffff',
//                 },
//             },
//         },


//         MuiDivider: {
//             styleOverrides: {
//                 root: {
//                     borderColor: '#ffffff22',
//                 },
//             },
//         },
//         MuiInputLabel: {
//             styleOverrides: {
//                 root: {
//                     color: '#ffffff',
//                 },
//             },
//         },

//         MuiInputLabel: {
//             styleOverrides: {
//                 root: {
//                     color: '#1a1a1a', // Default black
//                     '&.Mui-focused': {
//                         color: '#214FC6',
//                     },
//                 },
//             },
//         },
//         MuiOutlinedInput: {
//             styleOverrides: {
//                 root: {
//                     color: '#1a1a1a',
//                     backgroundColor: '#fff',
//                     '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#ccc',
//                     },
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#214FC6',
//                     },
//                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: '#214FC6',
//                     },
//                 },
//                 input: {
//                     color: '#1a1a1a',
//                 },
//             },
//         },
//         MuiTypography: {
//             styleOverrides: {
//                 root: {

//                 },
//             },
//         },
//         MuiTable: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#ffffff',
//                     borderRadius: 8,
//                 },
//             },
//         },
//         MuiTableHead: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: '#f0f0f0',
//                     '& .MuiTableCell-root': {
//                         color: '#1a1a1a',
//                         fontWeight: 600,
//                         fontSize: '0.95rem',
//                         borderBottom: '1px solid #e0e0e0',
//                     },
//                 },
//             },
//         },
//         MuiTableRow: {
//             styleOverrides: {
//                 root: {
//                     '&:hover': {
//                         backgroundColor: '#f5f5f5',
//                     },
//                 },
//             },
//         },
//         MuiTableCell: {
//             styleOverrides: {
//                 root: {
//                     color: '#1a1a1a',
//                     fontSize: '0.9rem',
//                     borderBottom: '1px solid #e0e0e0',
//                 },
//                 head: {
//                     backgroundColor: '#f9f9f9',
//                 },
//                 body: {
//                     backgroundColor: '#ffffff',
//                 },
//             },
//         },
//         MuiTableContainer: {
//             styleOverrides: {
//                 root: {
//                     boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
//                     borderRadius: 8,
//                 },
//             },
//         },

//     },
// });

// export default theme;



import { createTheme } from '@mui/material/styles';

const brandMain = '#0f2437';
const brandLight = '#25405a';
const brandDark = '#0a1824';
const bodyBg = '#f7fafd';
const accent = '#7895b2';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: brandMain, light: brandLight, dark: brandDark, contrastText: '#fff' },
    secondary: { main: accent, contrastText: '#fff' },
    background: {
      default: bodyBg, // main body background
      paper: '#fff',  // cards, tables, etc.
      nav: brandMain, // custom key for nav/sidebar
      navHover: brandLight, // hover/active for nav/sidebar
    },
    text: {
      primary: brandMain,
      secondary: '#4a5a6a',
      onNav: '#fff', // text/icons on nav/sidebar
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', sans-serif`,
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: brandMain,
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: brandMain,
          color: '#fff',
          '&:hover': {
            backgroundColor: brandLight,
          },
        },
        outlined: {
          borderColor: brandMain,
          color: brandMain,
          '&:hover': {
            backgroundColor: '#e9eef3',
            borderColor: brandLight,
          },
        },
      },
    },
  },
});

export default theme;
