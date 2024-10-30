import './App.scss';
import '@fontsource/manrope';
import '@fontsource/manrope/400.css'; // Specify weight
import BootstrapRoutes from './routes';
// import { ThemeProvider } from '@mui/material';

function App() {
  return (
    // Use ThemeProvider to provide custom theme
    // <ThemeProvider>
    <BootstrapRoutes />
    // </ThemeProvider>
  );
}

export default App;
