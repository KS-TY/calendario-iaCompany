import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

function ProjectHeader({ weekData, currentMember, onMemberSelect }) {
  const [isCronogramaVisible, setIsCronogramaVisible] = useState(false);

  const allTasks = weekData.flatMap(day => day.tasks);
  const completedTasks = allTasks.filter(task => task.completed).length;
  const totalTasks = allTasks.length;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    // 👇 ESTE DIV CONTENEDOR ES LA SOLUCIÓN 👇
    <div className="project-header-container">
      <div className="calendar-viewer">
        <h2>📊 Cronograma del Proyecto</h2>
        <button 
          className="calendar-toggle-btn" 
          onClick={() => setIsCronogramaVisible(!isCronogramaVisible)}
        >
          <i className="fas fa-calendar-alt"></i>
          <span>{isCronogramaVisible ? 'Cerrar Cronograma' : 'Abrir Cronograma'}</span>
        </button>
        <div className={`calendar-image-container ${isCronogramaVisible ? 'visible' : ''}`}>
          <button 
            className="close-calendar-btn" 
            onClick={() => setIsCronogramaVisible(false)}
          >
            ✕
          </button>
          <img src="/cronograma.jpg" alt="Cronograma del Proyecto" className="calendar-image" />
        </div>
      </div>

      <div className="header-section">
        <div className="week-progress">
          <h2>📊 Progreso Semanal del Equipo</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
          </div>
          <div className="stats" style={{display:'flex', gap:'1rem'}}>
            <span>{completedTasks} tareas completadas</span>
            <span>{totalTasks} tareas totales</span>
          </div>
        </div>
        <TeamSelector currentMember={currentMember} onMemberSelect={onMemberSelect} />
      </div>
    </div> // 👈 CERRAMOS EL DIV CONTENEDOR
  );
}

export default ProjectHeader;