import './PersonalProjects.css'

const projects = [
  {
    id: 'notebookam',
    title: 'NotebookAM',
    subtitle: 'Note taking app',
    img: '/notebookam.jpg',
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'Travel Vlogs',
    img: '/travel.jpg',
  },
]

export default function PersonalProjects() {
  return (
    <section className="pp" id="personal-projects">
      <div className="pp__header">
        <h2 className="pp__heading section-heading">Personal<br />Projects</h2>
        <p className="pp__sub">Things I build outside of work.</p>
      </div>

      <div className="pp__scroll">
        {projects.map((p) => (
          <div key={p.id} className="pp__card">
            <div
              className="pp__card-img"
              style={{ backgroundImage: `url(${p.img})` }}
              role="img"
              aria-label={p.title}
            />
            <div className="pp__card-info">
              <h3 className="pp__card-title">{p.title}</h3>
              <p className="pp__card-sub">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
