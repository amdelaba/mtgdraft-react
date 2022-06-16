import Card from '../card/card.component';
import './pack-viewer.styles.scss'

import { useContext } from 'react';
import { DraftContext } from '../../context/draft.context';


const PackViewer = () => {
  
  const {
    currentPackIndex, 
    currentDraftingPacks,
    selectCard
  } = useContext(DraftContext);

  return(
    <div className='pack-container'>
      {
        currentDraftingPacks && 
        currentDraftingPacks[currentPackIndex] &&
        currentDraftingPacks[currentPackIndex].map( (card) => <Card key={card.id} card={card} onClickHandler={() => selectCard(card)}/> )
      }
    </div>
  );

};

export default PackViewer;