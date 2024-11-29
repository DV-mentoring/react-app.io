import {Fragment} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Main = () => {
    return ( 
        <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '10%' }} />
        <Typography variant="h6" component="h2" sx={{color: 'black', fontFamily: 'Roboto',fontSize: 48, fontWeight: '700'}}>
          Today
        </Typography>
        <Typography variant="h6" component="h2" sx={{color: 'rgb(65, 65, 65)', fontFamily: 'Roboto',fontSize: 24, fontWeight: '400'}}>
          4/6 completed 
        </Typography>
      </Container>
    </Fragment>
     );
}

export default Main;