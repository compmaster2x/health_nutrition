import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MealPlannerPage from './pages/MealPlannerPage.jsx';
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MealPlannerPage/>}/>
        </Routes>
        </Router> 
    </>
  )
}

export default App
