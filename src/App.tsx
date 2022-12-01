import { useRoutes } from 'react-router-dom';

import { routes } from 'config/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'config/store';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
/* import { createMuiTheme, ThemeProvider } from '@mui/material/styles'; */


function App() {

  const theme = createTheme({
    typography: {
     "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
     "fontSize": 12,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

  const auth = useSelector((state: RootState) => state.auth);
  const element = useRoutes(routes);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {element}
      </div>
    </ThemeProvider>
    
	);
}

export default App
