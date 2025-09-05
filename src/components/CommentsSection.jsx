import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config.js';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// 1. Nos aseguramos de que el componente reciba "currentMember"
function CommentsSection({ currentMember }) {
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newCommentTitle, setNewCommentTitle] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCategory, setNewCommentCategory] = useState('general');

  const commentsCollectionId = "comentarios";

  useEffect(() => {
    const q = query(collection(db, commentsCollectionId), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(newComments);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveComment = async () => {
    if (newCommentTitle.trim() === '' || newCommentText.trim() === '') {
      alert('Por favor, completa el título y el texto del comentario.');
      return;
    }
    try {
      await addDoc(collection(db, commentsCollectionId), {
        title: newCommentTitle,
        text: newCommentText,
        category: newCommentCategory,
        author: currentMember, // 2. Usamos el 'currentMember' recibido para el autor
        timestamp: new Date()
      });
      setNewCommentTitle('');
      setNewCommentText('');
      setNewCommentCategory('general');
    } catch (error) {
      console.error("Error al guardar comentario: ", error);
      alert("No se pudo guardar el comentario.");
    }
  };

  // 3. Añadimos try...catch a la función de borrar para manejar errores
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("¿Seguro que quieres eliminar este comentario?")) {
      try {
        await deleteDoc(doc(db, commentsCollectionId, commentId));
        console.log("Comentario eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el comentario: ", error);
        alert("No se pudo eliminar el comentario.");
      }
    }
  };

  return (
    <div className={`comments-section ${isExpanded ? 'expanded' : ''}`}>
      <div className="comments-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 style={{margin:0, fontSize:'1rem'}}>📝 Comentarios y Aportes de la Semana</h2>
        <button className="toggle-comments-btn" title="Expandir/Contraer">
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
        </button>
      </div>

      <div className="comments-panel">
        <div className="comment-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Título del aporte..." 
              className="comment-input"
              value={newCommentTitle}
              onChange={(e) => setNewCommentTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Escribe tu comentario o aporte aquí..." 
              className="comment-textarea"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-actions" style={{display:'flex', gap:'.5rem', alignItems:'center', justifyContent:'space-between'}}>
            <select 
              className="comment-select" 
              style={{maxWidth:'48%'}}
              value={newCommentCategory}
              onChange={(e) => setNewCommentCategory(e.target.value)}
            >
              <option value="general">💬 General</option>
              <option value="problema">⚠️ Problemas</option>
              <option value="mejora">📈 Mejoras</option>
            </select>
            <button className="save-comment-btn" onClick={handleSaveComment}>
              <i className="fas fa-save"></i> Guardar
            </button>
          </div>
        </div>

        <div className="comments-list" style={{marginTop:'.6rem'}}>
          {comments.map(comment => (
            <div key={comment.id} className={`comment-item ${comment.category}`}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div style={{flex: 1}}>
                  <h4 className="comment-title">{comment.title}</h4>
                  <div className="comment-meta">
                    <span className="comment-author">Por: {comment.author}</span>
                    {comment.timestamp && <span className="comment-date">{new Date(comment.timestamp.toDate()).toLocaleString()}</span>}
                  </div>
                  <p style={{marginTop: '0.5rem'}}>{comment.text}</p>
                </div>
                <button 
                  className="delete-comment-btn"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;