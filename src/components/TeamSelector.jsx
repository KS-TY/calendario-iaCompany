import React from 'react';

const TEAM_MEMBERS = [
  { id: 'casti', name: 'Casti', color: '🔵' },   // Azul
  { id: 'pipe', name: 'Pipe', color: '🟢' },    // Verde
  { id: 'paz', name: 'Paz', color: '🟡' },     // Amarillo
  { id: 'pau', name: 'Pau', color: '🔴' },    // Rojo
  { id: 'joyce', name: 'Joyce', color: '🟣' },   // Morado
];

function TeamSelector({ currentMember, onMemberSelect }) {
  return (
    <div className="team-selector">
      <h3>👥 Miembros del Equipo</h3>
      {TEAM_MEMBERS.map(member => (
        <div 
          key={member.id} 
          className={`team-member ${currentMember === member.id ? 'active' : ''}`}
          onClick={() => onMemberSelect(member.id)}
        >
          <span>{member.color}</span>
          <span>{member.name}</span>
        </div>
      ))}
    </div>
  );
}

export default TeamSelector;