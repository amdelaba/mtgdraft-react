import { useContext, useEffect } from 'react';
import DeckBuilder from '../../components/deck-builder/deck-builder.component';
import PackViewer from '../../components/pack-viewer/pack-viewer.component';
import { DraftContext } from '../../context/draft.context';
import './draft-viewer.styles.scss'

const DraftViewer = () => {

  const {
    currentPackIndex,
    currentDraftingPacks,
    startDraft,
    bots
  } = useContext(DraftContext);
  
  useEffect(() => {
    const packs = currentDraftingPacks.map((pack) => pack.map((card) => ({"name": card.name, "quantity": card.quantity })));
    const my_bots = bots.map((bot) => bot.map((card)  => ({"name": card.name, "quantity": card.quantity }))); 
    console.log({packs}); 
    console.log({my_bots});
  }, [currentDraftingPacks, currentPackIndex, bots]);

  
  // Create collection of packs
  // TODO: fix this dependencie? (just adding function does not work)
  useEffect(() => {
    startDraft();
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