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
      <h3>
        {initialData._id ? 'Editar' : 'Crear'} {category === 'fiction' ? 'Ficción' : 'Publicidad'}
      </h3>
      <label>
        Titulo
        <input name="title" value={form.title} onChange={handleChange} type="text"></input>
      </label>

      <label>
        Categoría
        <input name="type" value={form.type} onChange={handleChange} type="text"></input>
      </label>

      <label>
        Rol
        <input name="role" value={form.role} onChange={handleChange} type="text"></input>
      </label>

      <label>
        Imagen (URL)
        <input name="img" value={form.img} onChange={handleChange} type="text"></input>
      </label>

      <label>
        Tamaño (single, double, full)
        <input name="width" value={form.width} onChange={handleChange} type="text"></input>
      </label>

      <label>
        Link (opcional)
        <input name="link" value={form.link} onChange={handleChange} type="text"></input>
      </label>

      <div className="modal-actions">
        <button type="submit">{initialData._id ? 'Guardar cambios' : 'Crear'}</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateEditForm;
