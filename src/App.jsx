import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from './pages/KanbanBoard';
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <KanbanBoard />
    </div>
  );
}

export default App;
