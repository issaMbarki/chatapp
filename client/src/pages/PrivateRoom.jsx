import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import home from '../assets/home.svg'

export default function PrivateRoom() {
  return (
    <>
      <Grid
      container
      spacing={0}
     
      sx={{
        direction:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundImage: `url(${home})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "left",
        minHeight:'90vh',
      }}
    >
      
      <Grid item>
        <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Private Room
          </Typography>
          <Typography variant="body1" gutterBottom>
            Enter the room code below to join an existing room, or create a new room.
          </Typography>
          <TextField label="Room Code" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" sx={{ mt: '1rem', mr:'1rem'}}>
            Join Room
          </Button>
          <Button variant="outlined" color="primary" sx={{ mt: '1rem', }}>
            Create New Room
          </Button>
        </Paper>
      </Grid>
    </Grid>
  
    </>
  );
}
