import React from 'react';
import DayCard from './DayCard.jsx';

function CalendarGrid(props) {
  // Recibimos todas las funciones del padre (App.jsx)
  const { 
    weekData, 
    onAddTask, 
    onDeleteTask, 
    onToggleTask, 
    onUpdateTaskText, 
    onResetDay, 
    onUpdateTaskAssignee // <-- Nos aseguramos de recibirla
  } = props;

  return (
    <div className="calendar-grid">
      {weekData.map((day) => (
        <DayCard 
          key={day.id} 
          dayData={day}
          onAddTask={() => onAddTask(day.id)}
          onDeleteTask={(taskId) => onDeleteTask(taskId)}
          onToggleTask={(taskId, status) => onToggleTask(taskId, status)}
          onUpdateTaskText={(taskId, text) => onUpdateTaskText(taskId, text)}
          onResetDay={() => onResetDay(day.id)}
          onUpdateTaskAssignee={onUpdateTaskAssignee} // <-- Y la pasamos al siguiente componente
        />
      ))}
    </div>
  );
}

export default CalendarGrid;