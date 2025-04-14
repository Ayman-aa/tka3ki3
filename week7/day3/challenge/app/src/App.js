import { useState, useRef } from 'react';
import './VotingApp.css'; // Make sure to import the CSS file

export default function App() {
  const [languages, setLanguages] = useState([
    {name: "Php", votes: 0},
    {name: "Python", votes: 0},
    {name: "JavaSript", votes: 0},
    {name: "Java", votes: 0}
  ]);
  
  // Refs to track which language was voted for animation
  const resultRefs = useRef(languages.map(() => null));

  const handleVote = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      votes: updatedLanguages[index].votes + 1
    };
    setLanguages(updatedLanguages);
    
    if (resultRefs.current[index]) {
      resultRefs.current[index].classList.add('vote-changed');
      setTimeout(() => {
        if (resultRefs.current[index]) {
          resultRefs.current[index].classList.remove('vote-changed');
        }
      }, 500);
    }
  };

  // Get the maximum votes for percentage calculation
  const maxVotes = Math.max(...languages.map(lang => lang.votes), 1);

  return (
    <div className="voting-container">
      <h1 className="app-title">Programming Language Voting App</h1>
      
      <div>
        {languages.map((language, index) => (
          <div key={index} className="language-card">
            <span className="language-name">{language.name}</span>
            <div className="vote-info">
              <span className="vote-count">
                {language.votes} vote{language.votes !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => handleVote(index)}
                className="vote-button"
              >
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="results-section">
        <h2 className="results-title">Results</h2>
        {languages.map((language, index) => (
          <div key={index} className="result-item" ref={el => resultRefs.current[index] = el}>
            <div className="result-header">
              <span>{language.name}</span>
              <span>{language.votes} vote{language.votes !== 1 ? 's' : ''}</span>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${language.votes === 0 ? 0 : Math.max(5, (language.votes / maxVotes) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}