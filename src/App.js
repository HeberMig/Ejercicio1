import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('https://api.github.com/repos/facebook/react/issues');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const handleIssueClick = (htmlUrl) => {
    window.open(htmlUrl, '_blank');
  };

  const filteredIssues = issues.filter(issue => {
    return issue.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <h1>React Issues</h1>
            <div className="search-container">
              <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar issues"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <div>
              <strong>ID:</strong> {issue.id}
            </div>
            <div>
              <strong>Titulo:</strong> {issue.title}
            </div>
            <div>
              <strong>Usuario:</strong> {issue.user.login}
            </div>
            <div>
              <strong>Labels:</strong> {issue.labels.map(label => label.name).join(', ')}
            </div>
            <button onClick={() => handleIssueClick(issue.html_url)}>Ver Issue</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
