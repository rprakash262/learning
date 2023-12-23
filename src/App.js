import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useStore } from './store';
import { Layout } from './components/layout';
import { AuthContextProvider, useAuth } from './auth'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#49c6dd',
    },
  },
});

function App() {
  console.log({store: useStore()})

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Layout />
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
