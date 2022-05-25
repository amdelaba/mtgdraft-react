import { Route, Routes } from 'react-router-dom';
import './App.css';
import DraftViewer from './routes/draft-viewer/draft-viewer.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const App = () => {
  // index property means it matches parent path
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> } >
        <Route index element={ <Home/> } />
        <Route path="/draft" element={ <DraftViewer/> } />
      </Route>
    </Routes>
  );
}

export default App;
