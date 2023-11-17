import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h1>Users</h1>
      <div className="card">
        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </>
  )
}

export default App
