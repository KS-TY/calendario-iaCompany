import React from 'react';
import TaskItem from './TaskItem.jsx';

function DayCard({ dayData, onToggleTask, onUpdateTaskText, onAddTask, onDeleteTask, onResetDay, onUpdateTaskAssignee }) {
  
  const completedTasks = dayData.tasks.filter(task => task.completed).length;
  const totalTasks = dayData.tasks.length;
  const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="day-card">
      <div className="day-number">{dayData.number}</div>
      <input 
        type="text" 
        className="objective-input" 
        placeholder={`Objetivo del ${dayData.name}...`}
        defaultValue={dayData.objective}
      />
      <div className="checklist">
        {dayData.tasks && dayData.tasks.map((task) => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id, task.completed)}
            onUpdateText={(newText) => onUpdateTaskText(task.id, newText)}
            onDelete={() => onDeleteTask(task.id)}
            // Le pasamos la función al hijo final (TaskItem)
            onUpdateTaskAssignee={(newAssignee) => onUpdateTaskAssignee(task.id, newAssignee)}
          />
        ))}
      </div>
      <div className="card-actions">
        <button className="add-task-btn" onClick={onAddTask}>+ Agregar Tarea</button>
        <button className="reset-day-btn" onClick={onResetDay}>🔄 Reiniciar</button>
      </div>
      <div className="day-progress">
        <div className="day-progress-bar">
          <div className="day-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="day-progress-text">{completedTasks}/{totalTasks} completadas</div>
      </div>
    </div>
  );
}

export default DayCard;