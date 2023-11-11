import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const lightTheme = createTheme({ palette: { mode: 'light' } });

function Tasks(props){
    const {task, DeleteTask, EditTask, index} = props
    
    const [status, setStatus] = React.useState(task.status);

    const handleChange = (event) => {
      setStatus(event.target.value);
      const formData = new FormData();
      formData.append('attachment', {...task.attachment});
      formData.append('title', task.title);
      formData.append('description', task.description);
      formData.append('status', event.target.value);
      EditTask(task.id, formData)
    };
    return(
        <div  className="task" style={{ display:'flex', justifyContent: index%2? 'end': 'start', textAlign: 'left', color: 'black',}}>
         <ThemeProvider theme={lightTheme}>
             <div style={{backgroundColor: 'yellow',width: "85%", marginTop: 10,  padding:'0px 10px 0px 10px'}}>
          <h4 style={{textAlign:'center'}}>{task.title}</h4>
            <p style={{textDecoration: 'underline'}}>{task.description}</p>
            <div style={{display: 'flex', alignItems: 'center' }}>
                <p>Status: </p>
                <FormControl  variant="standard" sx={{ ml:1, minWidth: 120, }}>
                   
                    <Select
                    value={task.status}
                    onChange={handleChange}
                    >
                    <MenuItem value="todo">To do</MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                    </Select>
      </FormControl>
            </div>
            
            {task.attachment && (
              <a href={task.attachment} target="_blank" rel="noreferrer">View attachment</a>
            )}
            <button style={{margin: 8}} onClick={() => DeleteTask(task.id)}>Delete</button>
          
          </div>
         </ThemeProvider>
         
           </div>
    )
}
export default Tasks