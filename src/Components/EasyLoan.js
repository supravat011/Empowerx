// src/components/EasyLoan.js
import React, { useState } from 'react';
import "./EasyLoan.css";

const EasyLoan = () => {
  const initialLoans = [
    { id: 1, type: 'Small Business Loan', interestRate: 6.0, term: 10 },
    { id: 2, type: 'Startup Loan', interestRate: 7.5, term: 5 },
    { id: 3, type: 'Equipment Financing', interestRate: 4.5, term: 7 },
    { id: 4, type: 'Business Line of Credit', interestRate: 8.0, term: 'Revolving' },
  ];

  const [loans, setLoans] = useState(initialLoans);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [appliedLoans, setAppliedLoans] = useState([]);

  const handleInputChange = (id, field, value) => {
    setLoans(prevLoans =>
      prevLoans.map(loan =>
        loan.id === id ? { ...loan, [field]: value } : loan
      )
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleLoanPurposeChange = (e) => {
    setLoanPurpose(e.target.value);
  };

  const handleApply = (loan) => {
    if (email && loanAmount && loanPurpose) {
      const appliedLoan = {
        ...loan,
        email,
        loanAmount,
        loanPurpose,
      };
      setAppliedLoans(prevAppliedLoans => [...prevAppliedLoans, appliedLoan]);
      alert(`Applied for ${loan.type} with an interest rate of ${loan.interestRate}% and a term of ${loan.term} years.\nLoan Amount: ${loanAmount}\nPurpose: ${loanPurpose}\nEmail: ${email}`);
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="easyloan-container">
      <h1 className='h1-tag'>EasyLoan for Entrepreneurs</h1>
      <p>Welcome to the EasyLoan. Here you can find information about our business loan services for entrepreneurs.</p>
      
      <table className="loan-table">
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Interest Rate (%)</th>
            <th>Term (Years)</th>
            <th>Apply Now</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr key={loan.id}>
              <td><span>{loan.type}</span></td>
              <td><input type="number" value={loan.interestRate} onChange={(e) => handleInputChange(loan.id, 'interestRate', parseFloat(e.target.value))} /></td>
              <td><input type="text" value={loan.term} onChange={(e) => handleInputChange(loan.id, 'term', e.target.value)} /></td>
              <td><button className="apply-button" onClick={() => handleApply(loan)}>Apply</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="additional-info-container">
        <h2>Additional Information</h2>
        <div className="input-group">
          <label htmlFor="loan-amount">Loan Amount</label>
          <input 
            type="number" 
            id="loan-amount" 
            value={loanAmount} 
            onChange={handleLoanAmountChange} 
            placeholder="Enter the loan amount" 
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="loan-purpose">Loan Purpose</label>
          <textarea 
            id="loan-purpose" 
            value={loanPurpose} 
            onChange={handleLoanPurposeChange} 
            placeholder="Describe the purpose of the loan" 
            className="input-field"
          />
        </div>
      </div>

      <div className="email-container">
        <h2>Apply with Your Email</h2>
        <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange} 
          placeholder="Enter your email address" 
          className="email-input"
        />
        <p className="email-note">We will send your application details and further instructions to this email address.</p>
      </div>

      <div className="applied-loans-container">
        <h2>Applied Loans Dashboard</h2>
        <table className="applied-loans-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Interest Rate (%)</th>
              <th>Term (Years)</th>
              <th>Loan Amount</th>
              <th>Purpose</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {appliedLoans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.type}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.term}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.loanPurpose}</td>
                <td>{loan.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EasyLoan;
