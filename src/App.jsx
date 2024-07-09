import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import Jobs from './components/Jobs'
import Home from './components/Home'
import './App.css'
import BrowseJobDetails from './components/BrowseJobDetails'
const App = () => {
  return(
    <div className='app-bg-container'>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<HomePage/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='jobs' element={<Jobs/>}/>
                    <Route path='/jobs/:id' element={<BrowseJobDetails/>}/>
                </Route>
                
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
export default App