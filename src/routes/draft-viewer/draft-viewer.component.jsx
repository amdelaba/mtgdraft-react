import DeckBuilder from '../../components/deck-builder/deck-builder.component';
import PackViewer from '../../components/pack-viewer/pack-viewer.component';
import './draft-viewer.styles.scss'

const DraftViewer = () =>{
  return (
    <div className='draft-container'>
      <PackViewer />
      <br/>
      <DeckBuilder />
    </div>
  );
};

export default DraftViewer