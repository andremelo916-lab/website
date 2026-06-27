import './Entrance.css'

export default function Entrance() {
  return (
    <section className="entrance">
      {/* Background image: add entrance.jpg to /public */}
      <div className="entrance__bg" />
      {/* Subtle dark vignette */}
      <div className="entrance__vignette" />
      <div className="entrance__content">
        <p className="entrance__welcome">Welcome</p>
      </div>
    </section>
  )
}
