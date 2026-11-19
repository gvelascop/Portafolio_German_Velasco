import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import repositorios from './repositorios.json';
import foto from './assets/perfil.jpg';
import './styles.css';

const github = 'https://github.com/gvelascop';
const pageSize = 6;
const destacados = [
  { name: 'horarios-meseros', title: 'Horarios de meseros', visual: 'schedule' },
  { name: 'objetos-perdidos', title: 'Objetos perdidos', visual: 'inventory' },
  { name: 'Cafeteria-app', title: 'Cafetería App', visual: 'menu' },
];

const habilidades = [
  { area: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Diseño adaptable'] },
  { area: 'Backend y datos', skills: ['Lógica de negocio', 'Consumo de APIs', 'Operaciones CRUD', 'Bases de datos relacionales'] },
  { area: 'Desarrollo de software', skills: ['Análisis de requisitos', 'Depuración', 'Git y GitHub'] },
];

function Habilidades() {
  return (
    <section className="skills" aria-labelledby="habilidades">
      <h2 id="habilidades">Habilidades técnicas</h2>
      <div className="skills-grid">
        {habilidades.map(({ area, skills }) => (
          <article key={area} className="panel skill-card">
            <h3>{area}</h3>
            <ul>
              {skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Destacados() {
  return (
    <section className="featured" aria-labelledby="destacados">
      <h2 id="destacados">Proyectos destacados</h2>
      <div className="featured-grid">
        {destacados.map(({ name, title, visual }) => (
          <a key={name} className="featured-card" href={`${github}/${name}`}>
            <div className={`project-art ${visual}`} aria-hidden="true">
              <div className="mini-window">
                <div className="mini-bar"><i /><i /><i /></div>
                <div className="mini-layout">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
              </div>
            </div>
            <div className="featured-caption">
              <h3>{title}</h3>
              <span>Ver repositorio</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function normalize(value) {
  return value.normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[-_]+/g, ' ');
}

function Proyectos() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const search = normalize(query.trim());
  const matches = repositorios.filter(repo => normalize(repo.name).includes(search));
  const visible = expanded ? matches : matches.slice(0, pageSize);

  return (
    <section id="proyectos" className="projects">
      <div className="projects-heading">
        <div>
          <h2>Proyectos en GitHub</h2>
          <p>Explora mis repositorios públicos y consulta su código fuente.</p>
        </div>
        <a href={github}>@gvelascop</a>
      </div>
      <div className="project-tools">
        <label htmlFor="buscar-proyectos">Buscar por nombre</label>
        <div className="search-row">
          <input
            id="buscar-proyectos"
            type="search"
            placeholder="Ej. cafetería"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setExpanded(false);
            }}
          />
          <p role="status">Mostrando {visible.length} de {matches.length}</p>
        </div>
      </div>
      {matches.length === 0 && <p className="panel">No hay proyectos que coincidan con tu búsqueda.</p>}
      <div className="project-grid" id="lista-proyectos">
        {visible.map(repo => <Repositorio key={repo.url} repo={repo} />)}
      </div>
      {matches.length > pageSize && (
        <button
          className="button secondary more-projects"
          type="button"
          aria-controls="lista-proyectos"
          aria-expanded={expanded}
          onClick={() => setExpanded(value => !value)}
        >
          {expanded ? 'Mostrar menos' : `Ver los ${matches.length - pageSize} proyectos restantes`}
        </button>
      )}
    </section>
  );
}

function Repositorio({ repo }) {
  return (
    <article className="panel repository">
      <span className="repository-icon" aria-hidden="true">&lt;/&gt;</span>
      <h3>{repo.name}</h3>
      <a href={repo.url} aria-label={`Ver código de ${repo.name} en GitHub`}>Ver código en GitHub</a>
    </article>
  );
}

function App() {
  return (
    <>
      <a className="skip" href="#contenido">Ir al contenido</a>
      <main id="contenido" className="wrap">
        <header id="inicio" className="hero" aria-labelledby="nombre">
          <div>
            <h1 id="nombre">German Velasco</h1>
            <p className="role">Ingeniero de sistemas · Desarrollador full stack</p>
            <div className="actions">
              <a className="button" href={github}>GitHub</a>
              <a className="button" href="#proyectos">Proyectos</a>
              <a className="button" href="#habilidades">Habilidades</a>
              <a className="button" href="#contacto">Contacto</a>
            </div>
          </div>
          <img src={foto} alt="Retrato de German Velasco" width="184" height="184" />
        </header>
        <section id="perfil" className="about">
          <h2>Sobre mí</h2>
          <p>Convierto problemas que encuentro en mi trabajo en soluciones de software. Mientras curso séptimo semestre de Ingeniería de Sistemas, aplico mi experiencia como desarrollador full stack a necesidades reales del equipo. Una de ellas fue la organización de los turnos de meseros, para la que desarrollé una planilla digital.</p>
        </section>
        <Habilidades />
        <section className="experience" aria-labelledby="experiencia">
          <h2 id="experiencia">Experiencia profesional</h2>
          <article className="panel experience-card">
            <div className="experience-heading">
              <h3>Desarrollo de soluciones para la operación</h3>
              <span className="experience-period">Actualidad</span>
            </div>
            <p>Identifiqué la necesidad de organizar los horarios de meseros y la convertí en una solución digital para planificar los turnos. El proyecto muestra cómo paso de una necesidad del equipo a una herramienta pensada para el trabajo diario.</p>
            <a className="experience-link" href={`${github}/horarios-meseros`}>Ver el código de la planilla en GitHub</a>
          </article>
          <article className="panel experience-card">
            <div className="experience-heading">
              <h3>Desarrollador de software junior</h3>
              <time dateTime="2022">2022</time>
            </div>
            <p>Colombia Telecomunicaciones S.A. E.S.P.</p>
            <p>Participé en el desarrollo de una solución de automatización robótica de procesos (RPA).</p>
            <h4>Etapas del desarrollo de un RPA</h4>
            <ul className="experience-tasks">
              <li><strong>Análisis del proceso.</strong> Documentar el flujo manual e identificar tareas repetitivas, reglas de negocio y excepciones.</li>
              <li><strong>Diseño y desarrollo del robot.</strong> Definir la secuencia de pasos y programar las interacciones con las aplicaciones del proceso.</li>
              <li><strong>Pruebas y validación.</strong> Comprobar los resultados con casos habituales y excepciones, y ajustar el flujo según lo observado.</li>
            </ul>
          </article>
        </section>
        <section className="education" aria-labelledby="formacion">
          <h2 id="formacion">Formación</h2>
          <ol className="education-list">
            <li>
              <h3>Ingeniería de Sistemas</h3>
              <p>Séptimo semestre · En curso</p>
            </li>
            <li>
              <h3>Tecnólogo en Análisis y Desarrollo de Sistemas de Información</h3>
              <p>SENA · <time dateTime="2022">2022</time></p>
            </li>
            <li>
              <h3>Técnico en Programación de Software</h3>
              <p>SENA · <time dateTime="2019">2019</time></p>
            </li>
          </ol>
        </section>
        <Destacados />
        <Proyectos />
        <section className="contact" aria-labelledby="contacto">
          <h2 id="contacto">Contacto</h2>
          <address className="panel contact-details">
            <p>Bogotá, Colombia</p>
            <a href="mailto:gvelascopedreros@gmail.com">gvelascopedreros@gmail.com</a>
            <a href="tel:+573209517898">+57 320 951 7898</a>
          </address>
        </section>
      </main>
      <footer className="wrap footer">
        <span>German Velasco</span>
        <a href="#inicio">Volver al inicio</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
