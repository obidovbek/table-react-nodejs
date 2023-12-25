import {Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import Table from './pages/Table/Table';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Table />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
