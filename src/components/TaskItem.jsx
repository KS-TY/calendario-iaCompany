import React from 'react';

// 1. Recibimos la nueva función "onUpdateTaskAssignee" en las props
function TaskItem({ task, onToggle, onUpdateText, onDelete, onUpdateTaskAssignee }) {
  return (
    <div className={`checklist-item ${task.assignedTo}`}>
      <div className={`assignee-indicator ${task.assignedTo}`}></div>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={onToggle} 
      />
      <input 
        type="text" 
        placeholder='Nueva tarea'
        value={task.text} 
        onChange={(e) => onUpdateText(e.target.value)}
      />
      
      {/* 2. Conectamos el selector para que llame a la función cuando cambie */}
      <select 
        className="task-assignee" 
        value={task.assignedTo} 
        onChange={(e) => onUpdateTaskAssignee(e.target.value)}
      >
        <option value="casti">Casti</option>
        <option value="pipe">Pipe</option>
        <option value="paz">Paz</option>
        <option value="pau">Pau</option>
        <option value="joyce">Joyce</option>
      </select>
      
      <button className="delete-task-btn" onClick={onDelete}>❌</button>
    </div>
  );
}

export default TaskItem;