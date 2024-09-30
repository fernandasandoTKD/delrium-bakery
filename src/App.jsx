import { useState } from 'react'
import './styles/custom.css'
import './App.css'
import AppRouter from './routing/AppRouter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className='App'>
        <AppRouter/>
    </div>
    </>
  )
}

export default App
