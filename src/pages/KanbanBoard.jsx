import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tasks from '../components/Tasks';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AddNewTask from '../components/AddTask';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../components/StrictModeDragable';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: '80vh'
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  const GetTasks =()=>{
    axios.get('http://localhost:3000/todos')
      .then(res => setTasks(res.data))
      .catch(err => console.log('Error fetching tasks', err));
  }
  useEffect(() => {
    GetTasks()
  }, []);

  const AddTask = (event, formData) => {
    
  
    axios.post('http://localhost:3000/todos', formData, {headers: {
      'content-type': 'application/json'
  }})
      .then(res => {
        setTasks(prevState => [...prevState, res.data]);
        event.target.reset();
        
      })
      .catch(err => console.log('Error adding task', err));
  }
  const DeleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/todos/${taskId}`)
      .then(() => {
        setTasks(prevState => prevState.filter(task => task.id !== taskId));
      })
      .catch(err => console.log('Error deleting task', err));
  }
  const EditStatus = (taskId, formData) => {
    axios.put(`http://localhost:3000/todos/${taskId}`, formData, {headers: {
        'content-type': 'application/json'
    }})
    .then(res => {
        setTasks(prevState => prevState.map(task => {
          if (task.id === res.data.id) {
            return res.data;
          } else {
            return task;
          }
        })) 
    
    })
      .catch(err => console.log('Error editing task', err));
  }
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination, draggableId } = result;
  
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    const newTasks = Array.from(tasks);
    const [removedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, {...removedTask, "status":destination.droppableId});
    const formData = new FormData();
    let data = tasks.filter(task => task.id == draggableId)[0]
    setTasks(newTasks)
  

    
    EditStatus(draggableId, {...data, "status":destination.droppableId});
  };

  return (

    <div className="kanban-board" style={{display: 'flex',flexDirection:'row',  width: '90vw', justifyContent: 'space-evenly', minHeight: '80vh'}}>
      <DragDropContext onDragEnd={onDragEnd}>

    
        <ThemeProvider theme={darkTheme}><StrictModeDroppable droppableId="todo">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
            <Item elevation={12}  style={{width:300, padding:20}}>
        <h3>To-Do</h3>
        
        {tasks.filter(task => task.status === 'todo').map((task, index) => (
          <Draggable key={task.id} draggableId={""+task.id} index={tasks.findIndex(el=> el.id === task.id)}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Tasks key={task.id} task={task} index={index} DeleteTask={DeleteTask} EditTask={EditStatus} />
          </div>
                  )}
                </Draggable>

        ))
        }
        
        <AddNewTask AddTask={AddTask} />
      </Item>{provided.placeholder}
      </div>
    )}
  </StrictModeDroppable><StrictModeDroppable droppableId="inProgress">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
      <Item elevation={12}  style={{width:300, padding:20}}>
        <h3>In Progress</h3>
        
        {tasks.filter(task => task.status === 'inProgress').map((task, index) => (
                <Draggable key={task.id} draggableId={""+task.id} index={tasks.findIndex(el=> el.id === task.id)}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Tasks key={task.id} task={task} index={index} DeleteTask={DeleteTask} EditTask={EditStatus} />
          </div>
                  )}
                </Draggable>
        ))}
        
      </Item> {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable droppableId="done">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
      <Item elevation={12}  style={{width:300, padding:20}}>
        <h3>In Progress</h3>
        
        {tasks.filter(task => task.status === 'done').map((task, index) => (
                <Draggable key={task.id} draggableId={""+task.id} index={tasks.findIndex(el=> el.id === task.id)}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Tasks key={task.id} task={task} index={index} DeleteTask={DeleteTask} EditTask={EditStatus} />
          </div>
                  )}
                </Draggable>
        ))}
        
      </Item> {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
        </ThemeProvider>
      
      {/* <form onSubmit={AddTask}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="description" placeholder="Description" required></textarea>
        <input type="file" name="attachment" />
        <button type="submit">Add Task</button>
      </form> */}
        </DragDropContext>
    </div>
  );
}

export default KanbanBoard