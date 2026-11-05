import { Link } from 'react-router-dom'
import './App.css'

function Home() {
  const stays = [
    {
      id: 'nature-cottage',
      name: 'Nature Cottage',
      description: 'Enjoy a peaceful stay surrounded by nature.',
      image: '/cottage.jpg'
    },
    {
      id: 'luxury-farm-stay',
      name: 'Luxury Farm Stay',
      description: 'Experience comfort and luxury in a natural setting.',
      image: '/luxuryyy-farmm.jpg'
    },
    {
      id: 'wooden-cottage',
      name: 'Wooden Cottage',
      description: 'Relax in a beautiful and cozy wooden cottage.',
      image: '/wooden.jpg'
    }
  ]

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3">
        <Link className="navbar-brand fw-bold" to="/">
          AVOTHAR <span>FARMS & STAYS</span>
        </Link>
        <div className="ms-auto d-flex gap-4">
          <a href="#home">Home</a>
          <a href="#stays">Our Stays</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <span>WELCOME TO AVOTHAR</span>
          <h1>Escape to Nature.<br />Experience Comfort.</h1>
          <p>Discover peaceful stays surrounded by natural beauty.</p>
          <a href="#stays" className="view-details-btn">Explore Our Stays</a>
        </div>
      </section>

      <section className="stays-section" id="stays">
        <h2 className="stays-heading">Explore Our Stays</h2>
        <div className="stays-container">
          {stays.map((stay) => (
            <div className="stay-card" key={stay.id}>
              <img src={stay.image} alt={stay.name} />
              <h3>{stay.name}</h3>
              <p>{stay.description}</p>
              <Link
                to="/stay-details"
                state={{ stayId: stay.id }}
                className="view-details-btn"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 text-center" id="about">
        <div className="container">
          <h2>About Avothar Farms & Stays</h2>
          <p>Experience a peaceful getaway with comfortable accommodation and the beauty of nature.</p>
        </div>
      </section>

      <footer className="text-center py-4" id="contact">
        <h4>AVOTHAR FARMS & STAYS</h4>
        <p>Relax. Refresh. Reconnect with Nature.</p>
        <p>© 2026 Avothar Farms & Stays. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Home
