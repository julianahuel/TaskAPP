import { Container } from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import Home from './components/home';
import Form from './components/form/form';
import NavBar from './components/navBar/navBar';
import TaskList from './components/taskList/taskList';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Container>
        <Routes>
          <Route index path='/task' element={<TaskList/>} />
          <Route path='/task/new' element={<Form/>} />
          <Route path='/task/:id/edit' element={<Form/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
