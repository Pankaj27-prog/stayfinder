import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import RoomCard from '../components/RoomCard';
import './Home.css';
import room1 from '../assets/room1.png';
import room2 from '../assets/room2.png';
import room3 from '../assets/room3.png';
import hotel1 from '../assets/hotel1.png';
import hotel2 from '../assets/hotel2.png';

const listings = [
  {
    image: room1,
    title: 'Snooze & Snore 2',
    details: '6 guests, 2 bedrooms, 4 beds, 2 bathrooms'
  },
  {
    image: room2,
    title: 'Otherside By Stayfinder',
    details: '16+ guests, 4 bedrooms, 4 beds, 4 bathrooms'
  },
  {
    image: room3,
    title: 'The Palm Retreat',
    details: '12 guests, 2 bedrooms, 6 beds, 2 bathrooms'
  }
];

function getCurrentUserId() {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user).email;
    } catch {
      return null;
    }
  }
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = 'guest-' + Math.random().toString(36).slice(2, 12);
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
}

const initialFeedbacks = [
  { text: '“Absolutely loved my stay! The rooms were spotless and the staff was incredibly helpful.”', author: 'Priya S.' },
  { text: '“A seamless booking experience and a beautiful property. Will book again!”', author: 'Rahul M.' },
  { text: '“The best vacation I\'ve had in years. Thank you, StayFinder!”', author: 'Anjali K.' },
];

const Home = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('stayfinder_feedbacks');
    return saved ? JSON.parse(saved) : initialFeedbacks;
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const userId = getCurrentUserId();

  useEffect(() => {
    localStorage.setItem('stayfinder_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setFeedbacks([{ text: message, author: name, userId }, ...feedbacks]);
    setName('');
    setMessage('');
  };

  const handleDeleteFeedback = (idx) => {
    setFeedbacks(feedbacks.filter((_, i) => i !== idx));
  };

  return (
    <>
      <HeroSection />
      <div className="listings-section" id="listings-section">
        <h2 className="listings-title">Explore Our Airbnb Listings Across Stunning Locations!</h2>
        <div className="listings-grid">
          {listings.map((listing, idx) => (
            <RoomCard key={idx} {...listing} />
          ))}
        </div>
        <button className="scroll-to-hotel-btn" style={{marginTop: 24, background: '#23272f', color: '#fff', padding: '10px 28px', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer'}}
          onClick={() => document.getElementById('hotel-experience-section').scrollIntoView({ behavior: 'smooth' })}>
          Discover Our Hotels
        </button>
      </div>
      <div className="creative-section">
        <div className="creative-title">Why Book With Stayfinder?</div>
        <div className="creative-desc">
          <b>Handpicked Stays:</b> Only the best, most unique properties.<br/>
          <b>Easy Booking:</b> Seamless, secure, and fast.<br/>
          <b>24/7 Support:</b> We're here for you, always.<br/>
          <br/>
          Ready for your next adventure? Discover, book, and enjoy with Stayfinder!
        </div>
        <button className="creative-cta">Start Exploring Now</button>
      </div>
      <div className="hotel-experience-section" id="hotel-experience-section">
        <div className="hotel-experience-images">
          <img src={hotel1} alt="Hotel Room" className="hotel-main-img" />
          <img src={hotel2} alt="Guest Experience" className="hotel-overlap-img" />
        </div>
        <div className="hotel-experience-content">
          <div className="hotel-experience-label">THE CONVENIENT HOTEL</div>
          <div className="hotel-experience-title">Discover unforgettable experiences with every stay at our Hotels.</div>
          <div className="hotel-experience-text">
            At StayFinder, we believe every stay should be a story worth sharing. Our hotels blend comfort, style, and a touch of magic—so you can wake up inspired, relax in elegance, and create memories that last a lifetime. Whether you're seeking a peaceful retreat or a vibrant city adventure, our handpicked accommodations are designed to delight.<br/><br/>
            <b>Enjoy world-class amenities, personalized service, and a warm welcome every time you book with us.</b>
          </div>
          <div className="hotel-experience-reservation">
            <span className="hotel-experience-icon">📞</span>
            <div>
              <div className="hotel-experience-res-label">Reservation</div>
              <div className="hotel-experience-res-number">+91 7600112210</div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Direct Value Section */}
      <section className="value-section" id="booking-section">
        <div className="value-content">
          <div className="value-left">
            <div className="value-label">OUR VALUE</div>
            <div className="value-title">Book direct our rooms<br/>and get more benefit</div>
            <div className="value-subtitle">Book directly with us and enjoy exclusive benefits, better rates, and personalized services.</div>
            <div className="value-benefits">
              <div className="value-benefit"><span className="value-benefit-icon">⏰</span> <span>Free Late Check-Out*</span></div>
              <div className="value-benefit"><span className="value-benefit-icon">✔️</span> <span>Best Rate Guarantee</span></div>
              <div className="value-benefit"><span className="value-benefit-icon">⬆️</span> <span>Room Upgrade*</span></div>
              <div className="value-benefit"><span className="value-benefit-icon">👑</span> <span>Ophelia Privilege</span></div>
            </div>
          </div>
          <div className="value-right">
            <div className="value-img-wrap">
              <img src={require('../assets/value-room.png')} alt="Room" className="value-img" />
              <div className="value-google-rating">
                <div className="value-google-score">4.8</div>
                <div className="value-google-info">
                  <div className="value-google-reviews">(729 Reviews) <span style={{color:'#fbbf24'}}>★★★★★</span></div>
                  <div className="value-google-label">From Google<br/>Business</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="value-dots"></div>
      </section>

      {/* Testimonials Section */}
      <div className="testimonials-section" id="about-section">
        <h2 className="testimonials-title">What Our Guests Say</h2>
        <form onSubmit={handleFeedbackSubmit} style={{display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
          <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} style={{padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120}} />
          <input type="text" placeholder="Your Feedback" value={message} onChange={e => setMessage(e.target.value)} style={{padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 220, flex: 1}} />
          <button type="submit" style={{background: '#ea580c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer'}}>Submit</button>
        </form>
        <div className="testimonials-list"
          style={{
            display: 'flex',
            gap: 24,
            paddingBottom: 8,
            overflowX: feedbacks.length > 3 ? 'auto' : 'visible',
            flexWrap: feedbacks.length > 3 ? 'nowrap' : 'wrap',
          }}>
          {feedbacks.map((fb, idx) => (
            <div className="testimonial-card" key={idx} style={{minWidth: 320, maxWidth: 340, position: 'relative'}}>
              <div className="testimonial-text">{fb.text}</div>
              <div className="testimonial-author">– {fb.author}</div>
              {fb.userId === userId && (
                <button onClick={() => handleDeleteFeedback(idx)} style={{position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#ea580c', fontWeight: 700, fontSize: 18, cursor: 'pointer'}}>×</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="newsletter-section" id="contact-section">
        <h2 className="newsletter-title">Stay Updated!</h2>
        <div className="newsletter-desc">Subscribe to get the latest deals and updates from StayFinder.</div>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </div>

      {/* Services & Amenities Section */}
      <div className="services-section" id="services-section">
        <div className="services-label">SERVICES & AMENITIES</div>
        <h2 className="services-title">Our Services & Amenities</h2>
        <div className="services-desc">
          Explore a wide range of premium services and amenities designed to enhance your stay. From luxurious accommodations to personalized services, we ensure every detail meets your expectations.
        </div>
        <div className="services-divider">
          <span className="services-line"></span>
          <span className="services-icon">✺</span>
          <span className="services-line"></span>
        </div>
        <div className="services-list">
          <div className="service-card">
            <div className="service-icon">
              {/* 24h Room Service SVG */}
              <svg width="56" height="56" fill="none" stroke="#4b8072" strokeWidth="2.5" viewBox="0 0 56 56"><path d="M12 36c4.5 6.5 12.5 10.5 20.5 8.5 8-2 13.5-9.5 13.5-17.5V24a2 2 0 0 0-2-2h-6"/><path d="M16 28v-8a2 2 0 0 1 2-2h6"/><text x="10" y="32" fontSize="12" fill="#4b8072" fontFamily="monospace">24</text></svg>
            </div>
            <div className="service-title">24 Hrs Room Service</div>
            <div className="service-desc">Enjoy the convenience of 24-hour room service, available whenever you need it for a comfortable and hassle-free stay.</div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              {/* Laundry SVG */}
              <svg width="56" height="56" fill="none" stroke="#4b8072" strokeWidth="2.5" viewBox="0 0 56 56"><rect x="10" y="14" width="36" height="28" rx="3"/><circle cx="28" cy="28" r="8"/><rect x="16" y="8" width="24" height="6" rx="2"/></svg>
            </div>
            <div className="service-title">Laundry Service</div>
            <div className="service-desc">Take advantage of our reliable laundry service, ensuring your clothes are fresh and ready whenever you need them.</div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              {/* WiFi SVG */}
              <svg width="56" height="56" fill="none" stroke="#4b8072" strokeWidth="2.5" viewBox="0 0 56 56"><path d="M12 28c8-8 24-8 32 0"/><path d="M18 34c4-4 12-4 16 0"/><circle cx="28" cy="40" r="2.5"/><text x="20" y="24" fontSize="12" fill="#4b8072" fontFamily="monospace">FREE</text></svg>
            </div>
            <div className="service-title">Full WiFi Access</div>
            <div className="service-desc">Stay connected with full WiFi access throughout the property, ensuring seamless browsing and communication during your stay.</div>
          </div>
          <div className="service-card">
            <div className="service-icon">
              {/* Security SVG */}
              <svg width="56" height="56" fill="none" stroke="#4b8072" strokeWidth="2.5" viewBox="0 0 56 56"><rect x="12" y="24" width="32" height="16" rx="4"/><path d="M28 32v4"/><rect x="36" y="16" width="8" height="8" rx="2" transform="rotate(20 40 20)"/></svg>
            </div>
            <div className="service-title">Hi-Class Security</div>
            <div className="service-desc">Experience peace of mind with our high-class security, ensuring your safety and privacy throughout your stay.</div>
          </div>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <section className="bottom-banner-section">
        <div className="bottom-banner-bg"></div>
        <div className="bottom-banner-content">
          <h2 className="bottom-banner-title">Spend your vacation luxuriously</h2>
          <div className="bottom-banner-subtitle">Indulge in a lavish vacation experience with world-class amenities and exceptional service.</div>
          <div className="bottom-banner-cta-label">BOOK YOUR STAY NOW</div>
          <div className="bottom-banner-phone">
            <span className="bottom-banner-phone-icon">📞</span>
            <span className="bottom-banner-phone-number">+91 760-011-2210</span>
          </div>
        </div>
      </section>

      {/* Creative Footer Section */}
      <footer className="footer-section creative-footer">
        <div className="footer-columns">
          <div className="footer-col footer-col-branding">
            <img src={require('../assets/logo.png')} alt="Stayfinder Logo" className="footer-logo-img" />
            <div className="footer-desc">
              At StayFinder, we are committed to providing exceptional stays and unforgettable experiences. Your comfort and satisfaction are our top priorities, ensuring a perfect getaway every time.
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Hotel</div>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/booking">Booking</a>
            <a href="/blogs">Blogs</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Help Center</div>
            <a href="/contact">Contact Us</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Reach Us</div>
            <div>Stayfinder Holidays Pvt. Ltd.<br/>16 Shetrunjay, Narayan nagar Road, Paldi,<br/>Ahmedabad, GUJ 380007</div>
            <div>+91 760-011-2210</div>
            <div>ceo@stayfinder.in</div>
          </div>
        </div>
        <div className="footer-bottom creative-footer-bottom">
          &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home; 