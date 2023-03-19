import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Post from './pages/Post';
import Auth from './pages/Auth';
import Header from './components/header';
import RequireAdmin from './context/Auth/RequireAdmin'
import './App.css'

function App() { 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Header />}>

          <Route path="/" element={<Home />} /> {/*View All Post*/}

          <Route path="/text/:IdText" element={<Post />} /> {/*View Post*/}

          <Route path="/auth" element={<Auth><Home/></Auth>} />
          
          <Route path="/post" element={<RequireAdmin><Home/></RequireAdmin>} /> Text

        </Route>


      </Routes>
    </div>
  )
}

export default App
