import Card from '../card/card.component';
import './pack-viewer.styles.scss'

import CARD_SET  from "../../card-set.json";
import { useContext, useEffect } from 'react';
import { DraftContext } from '../../context/draft.context';


const PackViewer = () => {
  
  const {currentPack, setCurrentPack, selectCard, generateRandomBooster} = useContext(DraftContext);

  // useEffect(() => {
  //   console.log({currentPack})
  //   console.log({mainDeck});
  // }, [mainDeck, currentPack]);

  // Create a 15 card booster pack on mounting
  // TODO: fix this dependencie (just adding)
  useEffect(() => {
    const randomlyGeneratedBooster = generateRandomBooster(CARD_SET);
    setCurrentPack(randomlyGeneratedBooster);
  }, [setCurrentPack]);

  return(
    <div className='pack-container'>
      {
        currentPack.length > 0 && 
        currentPack.map( (card) => <Card key={card.id} card={card} onClickHandler={() => selectCard(card)}/> )
      }
    </div>
  )

};

export default PackViewer;