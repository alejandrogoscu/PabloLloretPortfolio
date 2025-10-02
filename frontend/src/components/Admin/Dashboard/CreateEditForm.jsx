import { useState } from 'react';
import './createEditForm.css';

const CreateEditForm = ({ category, initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    type: initialData.type || '',
    role: initialData.role || '',
    img: initialData.img || '',
    width: initialData.width || '',
    link: initialData.link || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, category);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        {initialData._id ? 'Editar' : 'Crear'} {category === 'fiction' ? 'Ficción' : 'Publicidad'}
      </h3>

      <div className="form-group">
        <label className="form-label">
          Título
          <input className="form-input" name="title" value={form.title} onChange={handleChange} type="text" required />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Categoría
          <input className="form-input" name="type" value={form.type} onChange={handleChange} type="text" required />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Rol
          <input className="form-input" name="role" value={form.role} onChange={handleChange} type="text" required />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Imagen (URL)
          <input className="form-input" name="img" value={form.img} onChange={handleChange} type="url" required />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Tamaño
          <select className="form-select" name="width" value={form.width} onChange={handleChange} required>
            <option value="">Seleccionar tamaño</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="full">Full</option>
          </select>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Link (Opcional)
          <input className="form-input" name="link" value={form.link} onChange={handleChange} type="url" />
        </label>
      </div>

      <div className="form-actions">
        <button className="submit-btn" type="submit">
          {initialData._id ? 'Guardar cambios' : 'Crear proyecto'}
        </button>
        <button className="cancel-btn" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateEditForm;
