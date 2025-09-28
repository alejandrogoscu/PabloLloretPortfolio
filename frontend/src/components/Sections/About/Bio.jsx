import './Bio.css';

const Bio = () => {
  return (
    <section className="bio-section" id="biografia">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Biografía</h2>
        <div className="title-line"></div>
      </div>

      <div className="bio-grid">
        {/* Primera fila - ocupa ambas columnas */}
        <div className="bio-intro">
          <p>
            ¡Hola! Como ya habrás visto si has llegado hasta aquí, me llamo <span>Pablo Lloret</span> y soy{' '}
            <span>montador</span>. Para mi, <span>la edición conforma la esencia misma del cine</span>, ya que nos ayuda
            a comprender y a relacionar planos que por si mismos tienen un significado, pero que uniéndolos a otros
            conforman algo más grande.
          </p>
        </div>

        {/* Segunda fila - primera columna (imagen) */}
        <div className="bio-image">
          <img src="/images/others/fotoPerfil.webp" alt="Pablo Lloret" />
        </div>

        {/* Segunda fila - segunda columna (texto adicional) */}
        <div className="bio-description">
          <p>
            Me considero una persona súper <span>proactiva y colaborativa</span>, ya que para mi forma de ver el arte es
            indispensable que haya diferentes miradas y varios filtros que ayuden a conformar la obra final.{' '}
            <span>Soy lo más organizado que puedo</span> (sigo en ello, pero progreso adecuadamente) y probablemente{' '}
            <span>la persona más perfeccionista que encontrarás</span>, me tiraría horas para arreglar un trim que no me
            convence.
          </p>
        </div>
        <div className="bio-footer">
          <p>¡ Espero que pronto podamos contar historias juntos !</p>
        </div>
      </div>
    </section>
  );
};

export default Bio;
