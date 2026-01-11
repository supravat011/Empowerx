import React from "react";
import { motion } from "framer-motion";
import "./youtube.css";
// import heroImage from "../assets/mentorship_hero.png"; // Placeholder for now

const Youtube = () => {
  // Curated Courses Data (Women in Blockchain & Entrepreneurship focus)
  const courses = [
    {
      id: 1,
      title: "Blockchain for Business Leaders",
      instructor: "Sarah John, CEP",
      rating: "4.9",
      students: "12k+",
      price: "$49",
      image: "https://img.freepik.com/free-photo/business-woman-working-laptop_1388-91.jpg",
      category: "Blockchain",
      lessons: 24
    },
    {
      id: 2,
      title: "Smart Contract Fundamentals",
      instructor: "Emily Dao, Dev",
      rating: "4.8",
      students: "8.5k+",
      price: "$59",
      image: "https://img.freepik.com/free-photo/coding-man_1098-18084.jpg",
      category: "Development",
      lessons: 18
    },
    {
      id: 3,
      title: "DeFi Investment Strategies",
      instructor: "CryptoKate",
      rating: "5.0",
      students: "5k+",
      price: "$39",
      image: "https://img.freepik.com/free-photo/business-people-shaking-hands-meeting_53876-14392.jpg",
      category: "Finance",
      lessons: 12
    },
    {
      id: 4,
      title: "Web3 Marketing Mastery",
      instructor: "Jane Doe",
      rating: "4.7",
      students: "15k+",
      price: "$45",
      image: "https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063163.jpg",
      category: "Marketing",
      lessons: 30
    },
    {
      id: 5,
      title: "NFT Art & Community Building",
      instructor: "Artist Anna",
      rating: "4.9",
      students: "22k+",
      price: "$35",
      image: "https://img.freepik.com/free-photo/nft-technology-concept_23-2150242699.jpg",
      category: "NFTs",
      lessons: 15
    },
    {
      id: 6,
      title: "Legal Frameworks for DAO",
      instructor: "Lawyer Lisa",
      rating: "4.8",
      students: "3k+",
      price: "$75",
      image: "https://img.freepik.com/free-photo/scales-justice-Icon_23-2151227038.jpg",
      category: "Legal",
      lessons: 10
    }
  ];

  const stats = [
    { number: "850+", label: "Completed Course Modules" },
    { number: "320+", label: "Professional Female Tutors" },
    { number: "10k+", label: "Active Students" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="mentorship-page">
      {/* 1. Hero Section */}
      <section className="mentorship-hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text-block"
          >
            <span className="hero-badge">Blockchain Online Course</span>
            <h1>Upgrade Your Skills For <br /><span className="highlight">Real Success</span></h1>
            <p>Experience a modern learning platform that helps you speak, write, and understand Blockchain & Entrepreneurship with clarity and confidence. Tailored for women leaders.</p>
            <button className="cta-btn">Explore Courses</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-image-block"
          >
            {/* Using a placeholder or local asset if available */}
            <div className="hero-img-wrapper">
              <img src="https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg" alt="Woman Entrepreneur" className="hero-main-img" />

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="floating-card card-1"
              >
                <div className="icon-box check">✓</div>
                <div>
                  <h4>Certified Program</h4>
                  <span>Globally Recognized</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="floating-card card-2"
              >
                <div className="icon-box play">▶</div>
                <div>
                  <h4>Interactive Sessions</h4>
                  <span>Real Practice</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Strip */}
      <section className="features-strip">
        <div className="feature-item">
          <span className="f-icon">📚</span>
          <div>
            <h4>Quick Progress</h4>
            <p>Fast Learning Method</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="f-icon">👥</span>
          <div>
            <h4>Peer Learning</h4>
            <p>Supportive Community</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="f-icon">📝</span>
          <div>
            <h4>Instant Correction</h4>
            <p>Smart Feedback System</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="f-icon">📅</span>
          <div>
            <h4>Guided Routine</h4>
            <p>Consistent Weekly Plan</p>
          </div>
        </div>
      </section>

      {/* 3. Promo / Offer Section */}
      <section className="promo-section">
        <div className="promo-content">
          <div className="promo-text-left">
            <span className="promo-tag">Save Big</span>
            <h2>Learn Blockchain & Business <br />With Special Offer</h2>
            <p>Get exclusive discounts on selected courses this month. Upgrade your skills at a lower price.</p>
            <button className="promo-btn">Claim Discount</button>
          </div>
          <div className="promo-image-right">
            <img src="https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg" alt="Students Learning" />
            <div className="rating-badge">
              <span className="score">4.9/5</span>
              <span className="star">⭐</span>
              <br />
              <span className="label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Course Grid */}
      <section className="courses-section">
        <div className="section-header-left">
          <span className="sub-header-text">Popular Courses</span>
          <h2>Build Blockchain & Business <br />Skills With Expert Lessons</h2>
          <button className="view-all-btn">View All Courses</button>
        </div>

        <div className="courses-grid-container">
          {courses.map((course) => (
            <div key={course.id} className="course-card-modern">
              <div className="course-img-top">
                <img src={course.image} alt={course.title} />
                <span className="category-pill">{course.category}</span>
              </div>
              <div className="course-body">
                <div className="stars-price">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <span className="price">{course.price}</span>
                </div>
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <span>📚 {course.lessons} Lessons</span>
                  <span>👥 {course.students} Students</span>
                </div>
                <button className="enroll-btn-dark">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stats / Empowerment Section */}
      <section className="empowerment-section">
        <div className="empower-container">
          <div className="empower-image">
            <img src="https://img.freepik.com/free-photo/happy-young-man-with-phone_171337-12431.jpg" alt="Happy Student" />
          </div>
          <div className="empower-text">
            <span className="sub-header-text">Who We Are</span>
            <h2>Empowering Women <br />With Better Tech Skills</h2>
            <p>Pretium lectus mauris commodo viverra orci. Ut dapibus vestibulum mollis neque. Rutrum risus duis vulputate phasellus.</p>
            <button className="read-story-btn">Read Our Story</button>

            <div className="stats-grid-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-box-simple">
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Youtube;
