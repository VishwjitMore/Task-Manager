import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css'
import Tasks from './components/Tasks';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Tasks/>}/>
        <Route path='/tasks' element={<Create/>}/>
        <Route path='/tasks/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
