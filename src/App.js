import './App.css';
import Login from './components/Login';
import { BrowserRouter,Routes , Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chatPage' element={<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;