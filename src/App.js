import './App.css';
import DeckBuilder from './components/deck-builder/deck-builder.component';
import PackViewer from './components/pack-viewer/pack-viewer.component';

const App = () => {
  return (
    <div className='draft-container'>
      <PackViewer />
      <br/>
      <DeckBuilder />
    </div>
  );
}

export default App;
