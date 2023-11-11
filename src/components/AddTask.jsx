import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Input = styled('input')({
    display: 'none',
  });
export default function AddNewTask({AddTask}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(event.target.elements.attachment.files[0])
    const newTask = {
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      attachment: event.target.elements.attachment.files[0],
      status: 'todo'
    };
  
    const formData = new FormData();
    formData.append('attachment', newTask.attachment);
    formData.append('title', newTask.title);
    formData.append('description', newTask.description);
    formData.append('status', newTask.status);
    AddTask(event, formData)
    handleClose()
  }

  return (
    <>
  
      <Fab style={{marginTop: 10}} color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
               
      <form onSubmit={handleSubmit}>
       
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          
   <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name='title'
            variant="standard"
            required
          />
       
        <textarea name="description" placeholder="Description" cols="70" rows={4} required></textarea>
        <label htmlFor="contained-button-file">
  <Input id="contained-button-file" multiple type="file" name='attachment' />
  <Button variant="contained" component="span">
    Upload
  </Button>
</label>
        
     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}