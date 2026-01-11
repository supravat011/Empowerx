import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import heroBg from "../assets/hero_bg.png";
import "./EasyLoan.css";

const Counter = ({ from = 0, to, duration = 2, prefix = "", suffix = "" }) => {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 60 });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={nodeRef}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const EasyLoan = () => {
  const formRef = useRef(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    purpose: "",
    loanType: "",
  });
  const [appliedLoans, setAppliedLoans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToForm = (loan) => {
    setSelectedLoan(loan);
    setFormData(prev => ({
      ...prev,
      loanType: loan.title
    }));
    setShowForm(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLoan = {
      ...formData,
      id: Date.now(),
      status: "Pending",
      date: new Date().toLocaleDateString()
    };
    setAppliedLoans(prev => [...prev, newLoan]);
    setShowSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
      purpose: "",
      loanType: ""
    });
    setShowForm(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const validateForm = () => {
    const { name, email, phone, amount, purpose, loanType } = formData;
    return name && email && phone && amount && purpose && loanType;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  /* SVGs for Form Icons */
  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
  const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
  const MoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  /* New SVGs for Cards */
  const BusinessIcon = () => (
    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
  const StartupIcon = () => (
    <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
  const EquipmentIcon = () => (
    <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  const WorkingCapitalIcon = () => (
    <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const initialLoans = [
    {
      id: 1,
      title: "Small Business",
      amount: "₹50k - ₹5L",
      interest: "12%",
      term: "12-24 mos",
      icon: <BusinessIcon />,
      description: "Expand operations or manage cash flow with our most popular option."
    },
    {
      id: 2,
      title: "Startup Capital",
      amount: "₹25k - ₹2.5L",
      interest: "14%",
      term: "12-36 mos",
      icon: <StartupIcon />,
      description: "Fuel your new venture with capital designed for high-growth potential."
    },
    {
      id: 3,
      title: "Equipment",
      amount: "₹1L - ₹10L",
      interest: "13%",
      term: "24-48 mos",
      icon: <EquipmentIcon />,
      description: "Upgrade your machinery and technology with flexible financing."
    },
    {
      id: 4,
      title: "Working Capital",
      amount: "₹1L - ₹20L",
      interest: "11%",
      term: "6-12 mos",
      icon: <WorkingCapitalIcon />,
      description: "Secure quick funds for daily operations and unexpected expenses."
    }
  ];

  return (
    <div className="easyloan-wrapper light-theme">

      {/* 1. Hero Section */}
      <div className="loan-hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content centered-hero"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-subtitle">EMPOWERX</span>
          <h1 className="hero-title">
            Funding & Loans for Women Entrepreneurs
          </h1>
          <p className="hero-text">
            Get the capital you need to start, build, and grow your business with blockchain transparency.
          </p>

          <div className="hero-features-list centered-list">
            <div className="hero-feature">
              <div className="check-icon">✓</div>
              <span>Direct Wallet Transfer</span>
            </div>
            <div className="hero-feature">
              <div className="check-icon">✓</div>
              <span>Pay via Crypto</span>
            </div>
            <div className="hero-feature">
              <div className="check-icon">✓</div>
              <span>100% Secure Blockchain</span>
            </div>
          </div>

          <button className="primary-btn" onClick={() => scrollToForm(initialLoans[0])}>
            Discover More
          </button>
        </motion.div>
      </div>

      {/* 1.5 Stats Section (New) */}
      <div className="stats-section">
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2><Counter to={50} prefix="$" suffix="M+" /></h2>
          <p>Total Liquidity</p>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2><Counter to={15} suffix="k+" /></h2>
          <p>Active Users</p>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2><Counter to={2500} suffix="+" /></h2>
          <p>Loans Disbursed</p>
        </motion.div>
        <motion.div
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2><Counter to={99} suffix="%" /></h2>
          <p>Success Rate</p>
        </motion.div>
      </div>

      {/* 2. Features Grid (Static) */}
      <div className="features-section">
        <div className="features-grid">
          {/* Feature 1 */}
          <motion.div
            className="feature-card-static"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="f-icon-box red-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3>Safe and Secure Payments</h3>
            <p>Duis aute irure dolor lipsum free is simply free text the local markets in reprehenderit.</p>
            <span className="read-more">MORE DETAIL</span>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="feature-card-static"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="f-icon-box red-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
            <h3>Quick Payments Process</h3>
            <p>Duis aute irure dolor lipsum free is simply free text the local markets in reprehenderit.</p>
            <span className="read-more">MORE DETAIL</span>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="feature-card-static"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="f-icon-box red-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>No Prepayment Charges</h3>
            <p>Duis aute irure dolor lipsum free is simply free text the local markets in reprehenderit.</p>
            <span className="read-more">MORE DETAIL</span>
          </motion.div>
        </div>
      </div>

      {/* 2.5 Process Section (New) */}
      <div className="process-section">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="sub-title">|| HOW IT WORKS ||</span>
          <h2>Get your loan in 3 simple steps</h2>
        </motion.div>
        <div className="process-steps">
          <motion.div
            className="step-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="step-number">01</div>
            <h3>Connect Wallet</h3>
            <p>Link your blockchain wallet to verify your identity and credit score instantly.</p>
          </motion.div>
          <div className="step-connector"></div>
          <motion.div
            className="step-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="step-number">02</div>
            <h3>Check Eligibility</h3>
            <p>Our smart contract analyzes your history and approves your limit in seconds.</p>
          </motion.div>
          <div className="step-connector"></div>
          <motion.div
            className="step-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="step-number">03</div>
            <h3>Receive Funds</h3>
            <p>Get instant liquidity transferred directly to your secure wallet.</p>
          </motion.div>
        </div>
      </div>

      {/* 3. Services Section (The Loans) */}
      <div className="services-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="sub-title">|| WHAT WE'RE OFFERING ||</span>
          <h2>We provide best services<br />for your loans</h2>
        </motion.div>

        <div className="services-grid">
          {initialLoans.map((loan, index) => (
            <motion.div
              key={loan.id}
              className="service-card"
              onClick={() => scrollToForm(loan)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-icon-circle">
                {loan.icon}
              </div>
              <h3>{loan.title}</h3>
              <p className="service-info">{loan.description}</p>
              <div className="service-meta">
                <span>{loan.amount}</span>
                <span className="rate">{loan.interest}</span>
              </div>
              <div className="service-footer">
                <button className="arrow-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Testimonials (New) */}
      <div className="testimonials-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="sub-title">|| OUR TESTIMONIALS ||</span>
          <h2>What they're talking about<br />our company</h2>
        </motion.div>
        <div className="testimonials-grid">
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="stars">★★★★★</div>
            <h3>Delia Riley</h3>
            <span className="role">Finance Manager</span>
            <p>"I loved the customer service you guys provided me. That was very nice and patient with questions I had."</p>
          </motion.div>
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="stars">★★★★★</div>
            <h3>Essie Perez</h3>
            <span className="role">Crypto Investor</span>
            <p>"The fastest liquidity I have ever received. The smart contract transparency is a game changer."</p>
          </motion.div>
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="stars">★★★★★</div>
            <h3>Dustin Dunn</h3>
            <span className="role">Startup Founder</span>
            <p>"Secure, fast, and reliable. Helped me scale my business operations without traditional bank hassles."</p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              ref={formRef}
              className="application-form-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button className="close-button" onClick={() => setShowForm(false)}>×</button>
              <div className="form-header">
                <h2>Application Form</h2>
                <p>Applying for: <span className="text-highlight">{selectedLoan?.title}</span></p>
              </div>

              <form onSubmit={handleSubmit} className="loan-form">
                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <UserIcon />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <MailIcon />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <div className="input-wrapper">
                      <PhoneIcon />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" required />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Loan Amount (₹)</label>
                    <div className="input-wrapper">
                      <MoneyIcon />
                      <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} placeholder="50000" required />
                    </div>
                  </div>
                </div>

                <div className="input-group full-width">
                  <label>Purpose of Loan</label>
                  <textarea name="purpose" value={formData.purpose} onChange={handleInputChange} rows="3" placeholder="Describe how you will use the funds..." required></textarea>
                </div>

                <div className="input-group full-width">
                  <label>Loan Type</label>
                  <div className="select-wrapper">
                    <select name="loanType" value={formData.loanType} onChange={handleInputChange} required>
                      <option value="" disabled>Select a loan type</option>
                      {initialLoans.map(l => <option key={l.id} value={l.title}>{l.title}</option>)}
                    </select>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!validateForm()}
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSuccess && (
        <motion.div
          className="success-notification"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="success-icon">✓</div>
          <p>Application Submitted Successfully!</p>
        </motion.div>
      )}
    </div>
  );
};

export default EasyLoan;
