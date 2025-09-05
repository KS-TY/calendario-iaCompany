import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, updateDoc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';

import Navbar from './components/Navbar.jsx';
import ProjectHeader from './components/ProjectHeader.jsx';
import CalendarGrid from './components/CalendarGrid.jsx';
import CommentsSection from './components/CommentsSection.jsx';
import Login from './components/Login.jsx';

// --- Componentes Auxiliares ---

// Componente para mostrar mientras se carga
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
    <h2>Cargando...</h2>
  </div>
);

// Componente para mostrar cuando el acceso es denegado
const AccessDenied = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', color: 'white' }}>
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para ver este contenido. Por favor, contacta al administrador.</p>
    </div>
);

// --- Función para Generar la Semana ---
const generateWeekData = () => {
  const week = [];
  const now = new Date();
  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(now.getDate() + diff);
  const dayNames = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const dayNamesDisplay = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  for (let i = 0; i < 5; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i);
    week.push({ id: dayNames[i], name: dayNamesDisplay[i], number: currentDay.getDate(), tasks: [] });
  }
  return week;
};


// --- Componente Principal de la Aplicación ---

function App() {
  const [user, setUser] = useState(null);
  const [weekData, setWeekData] = useState(generateWeekData); // Inicia con la estructura de la semana
  const [objectives, setObjectives] = useState({});
  const [currentMember, setCurrentMember] = useState('casti');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekId = "semana-actual";
  const objectivesId = "objetivos-semana-actual";

  // Efecto para escuchar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Dejamos de cargar una vez que sabemos si hay usuario o no
    });
    return () => unsubscribe();
  }, []);

  // Efecto para escuchar las TAREAS de Firestore
  useEffect(() => {
    if (!user) return; // No hacer nada si no hay usuario
    const unsubscribe = onSnapshot(collection(db, weekId), 
      (snapshot) => {
        const tasksByDay = {};
        snapshot.forEach(doc => {
          const task = { id: doc.id, ...doc.data() };
          if (!tasksByDay[task.dayId]) { tasksByDay[task.dayId] = []; }
          tasksByDay[task.dayId].push(task);
        });
        setWeekData(prev => prev.map(day => ({ ...day, tasks: tasksByDay[day.id] || [] })));
        setError(null); // Si tenemos éxito, nos aseguramos de que no haya errores
      },
      (err) => { // Función de error
        console.error("Error al obtener tareas:", err);
        setError(err);
      }
    );
    return () => unsubscribe();
  }, [user]); // Se activa cuando el usuario cambia

  // Efecto para escuchar los OBJETIVOS de Firestore
  useEffect(() => {
    if (!user) return;
    const objectivesDocRef = doc(db, "objetivos", objectivesId);
    const unsubscribe = onSnapshot(objectivesDocRef, (doc) => {
      if (doc.exists()) {
        setObjectives(doc.data());
      }
    });
    return () => unsubscribe();
  }, [user]);

  // --- Funciones para manipular datos ---
  const handleAddTask = async (dayId) => {
    await addDoc(collection(db, weekId), { text: '', completed: false, assignedTo: currentMember, dayId: dayId });
  };
  const handleDeleteTask = async (taskId) => await deleteDoc(doc(db, weekId, taskId));
  const handleToggleTask = async (taskId, currentStatus) => {
    await updateDoc(doc(db, weekId, taskId), { completed: !currentStatus });
  };
  const handleUpdateTaskText = async (taskId, newText) => {
    await updateDoc(doc(db, weekId, taskId), { text: newText });
  };
  const handleUpdateTaskAssignee = async (taskId, newAssignee) => {
    await updateDoc(doc(db, weekId, taskId), { assignedTo: newAssignee });
  };
  const handleUpdateObjective = async (dayId, newText) => {
    await setDoc(doc(db, "objetivos", objectivesId), { [dayId]: newText }, { merge: true });
  };
  const handleResetDay = async (dayId) => {
    if (window.confirm("¿Seguro?")) {
      const dayTasks = weekData.find(d => d.id === dayId)?.tasks || [];
      for (const task of dayTasks) {
        await deleteDoc(doc(db, weekId, task.id));
      }
    }
  };

  // --- Lógica de Renderizado ---
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Login />;
  }
  if (error) {
    return <AccessDenied />;
  }

  return (
    <div className="app-wrapper">
      <Navbar user={user} />
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
        objectives={objectives}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onUpdateTaskText={handleUpdateTaskText}
        onUpdateTaskAssignee={handleUpdateTaskAssignee}
        onResetDay={handleResetDay}
        onUpdateObjective={handleUpdateObjective}
      />
      <CommentsSection currentMember={currentMember} />
    </div>
  );
}

export default App;