import './deleteConfirm.css';

const DeleteConfirm = ({ project, category, onDelete, onCancel }) => {
  <div className="modal-delete">
    <h3>¿Seguro que quieres borrar este proyecto?</h3>
    <p>
      <strong>
        {project.title} ({category === 'fiction' ? 'Fiction' : 'Publicidad'})
      </strong>
    </p>
    <div className="modal-actions">
      <button className="detele-btn" onClick={onDelete}>
        Borrar
      </button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </div>;
};

export default DeleteConfirm;
