import React, { useState, useEffect } from 'react';
import { db } from './firebase/config.js';
import { collection, doc, onSnapshot, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

import Navbar from './components/navbar.jsx';
import ProjectHeader from './components/ProjectHeader.jsx';
import CalendarGrid from './components/CalendarGrid.jsx';
import CommentsSection from './components/CommentsSection.jsx'; 


const initialWeekData = [
  { id: 'lunes', name: 'Lunes', number: 1, tasks: [] },
  { id: 'martes', name: 'Martes', number: 2, tasks: [] },
  { id: 'miercoles', name: 'Miércoles', number: 3, tasks: [] },
  { id: 'jueves', name: 'Jueves', number: 4, tasks: [] },
  { id: 'viernes', name: 'Viernes', number: 5, tasks: [] },
];

function App() {
  const [weekData, setWeekData] = useState(initialWeekData);
  const [currentMember, setCurrentMember] = useState('casti');
  const weekId = "semana-actual";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, weekId), (snapshot) => {
      const daysData = {};
      snapshot.forEach(taskDoc => {
        const task = { id: taskDoc.id, ...taskDoc.data() };
        if (!daysData[task.dayId]) {
          daysData[task.dayId] = [];
        }
        daysData[task.dayId].push(task);
      });
      setWeekData(prev => prev.map(day => ({ ...day, tasks: daysData[day.id] || [] })));
    });
    return () => unsubscribe();
  }, [weekId]);

  const handleAddTask = async (dayId) => {
    await addDoc(collection(db, weekId), {
      text: '',
      completed: false,
      assignedTo: currentMember,
      dayId: dayId
    });
  };

  const handleDeleteTask = async (taskId) => await deleteDoc(doc(db, weekId, taskId));

  const handleToggleTask = async (taskId, currentStatus) => {
    await updateDoc(doc(db, weekId, taskId), { completed: !currentStatus });
  };

  const handleUpdateTaskText = async (taskId, newText) => {
    await updateDoc(doc(db, weekId, taskId), { text: newText });
  };

  // 👇 1. ESTA ES LA FUNCIÓN QUE FALTABA 👇
  const handleUpdateTaskAssignee = async (taskId, newAssignee) => {
    await updateDoc(doc(db, weekId, taskId), { assignedTo: newAssignee });
  };

  const handleResetDay = async (dayId) => {
    if (window.confirm("¿Seguro?")) {
      const dayTasks = weekData.find(d => d.id === dayId)?.tasks || [];
      for (const task of dayTasks) {
        await deleteDoc(doc(db, weekId, task.id));
      }
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="connection-status connected">✅ Conectado</div>
      <div className="container">
        <ProjectHeader 
          weekData={weekData} 
          currentMember={currentMember}
          onMemberSelect={setCurrentMember}
        />
      </div>
      <CalendarGrid 
        weekData={weekData}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onUpdateTaskText={handleUpdateTaskText}
        onResetDay={handleResetDay}
        onUpdateTaskAssignee={handleUpdateTaskAssignee} // 👈 2. Y AQUÍ LA PASAMOS
      />
       <CommentsSection currentMember={currentMember} />
    </div>
  );
}

export default App;