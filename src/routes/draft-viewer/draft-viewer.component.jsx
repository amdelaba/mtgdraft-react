import { useContext, useEffect } from 'react';
import Button from '../../components/button/button.component';
import DeckBuilder from '../../components/deck-builder/deck-builder.component';
import PackViewer from '../../components/pack-viewer/pack-viewer.component';
import { CardSetContext } from '../../context/card-set.context';
import { DraftContext } from '../../context/draft.context';
import './draft-viewer.styles.scss'

const DraftViewer = () => {

  const {
    currentPackIndex,
    currentDraftingPacks,
    startDraft,
    bots,
    draftIsOver
  } = useContext(DraftContext);

  const {
    cardSet
  } = useContext(CardSetContext)
  
  useEffect(() => {
    // console.log({currentDraftingPacks}); 
    // console.log({bots});
  }, [currentDraftingPacks, currentPackIndex, bots]);

  
  // Create collection of packs
  // TODO: fix this dependencie? (just adding function does not work)
  // useEffect(() => {
  //   console.log({cardSet});
  //   startDraft(cardSet);  
  // }, []);

  return (
    <div className='draft-container'>
      <Button type='button' onClick={() => startDraft(cardSet)}>Start Draft</Button>
      
      <h2>Pick a Card</h2>
      <PackViewer />
      <br/>
      <DeckBuilder />

      {
        draftIsOver &&
        <Button type='button' onClick={() => alert('Export Deck')}>Export Deck</Button>
      }

    </div>
  );
};

export default DraftViewer