import { useContext, useEffect } from 'react';
import DeckBuilder from '../../components/deck-builder/deck-builder.component';
import PackViewer from '../../components/pack-viewer/pack-viewer.component';
import { DraftContext } from '../../context/draft.context';
import './draft-viewer.styles.scss'
import CARD_SET  from "../../card-set.json";

const DraftViewer = () => {

  const {
    currentPackIndex,
    currentDraftingPacks,
    generateCollectionOfBoosters
  } = useContext(DraftContext);
  
  useEffect(() => {
    console.log({currentDraftingPacks}); 
    console.log({currentPackIndex});
  }, [currentDraftingPacks, currentPackIndex]);

  
  // Create collection of packs
  // TODO: fix this dependencie? (just adding function does not work)
  useEffect(() => {
    generateCollectionOfBoosters(CARD_SET, 8);
  }, []);

  return (
    <div className='draft-container'>
      <h2>Pick a Card</h2>
      <PackViewer />
      <br/>
      <DeckBuilder />
    </div>
  );
};

export default DraftViewer