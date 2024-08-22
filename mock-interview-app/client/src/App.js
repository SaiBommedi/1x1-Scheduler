import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const scheduleInterview = () => {
    axios.post('http://localhost:5000/api/interviews', {
      student_id: studentId,
      mentor_id: mentorId,
      scheduled_at: scheduledAt
    })
    .then(res => {
      setInterviews([...interviews, res.data]);
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Mock Interview Scheduler</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>

      <h2>Schedule Interview</h2>
      <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
      <input type="text" placeholder="Mentor ID" value={mentorId} onChange={e => setMentorId(e.target.value)} />
      <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
      <button onClick={scheduleInterview}>Schedule</button>

      <h2>Scheduled Interviews</h2>
      <ul>
        {interviews.map(interview => (
          <li key={interview.id}>{`Interview ${interview.id} - Scheduled on ${interview.scheduled_at}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
