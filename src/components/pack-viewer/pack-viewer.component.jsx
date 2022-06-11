import Card from '../card/card.component';
import './pack-viewer.styles.scss'

import CARD_SET  from "../../card-set.json";
import { useEffect, useState } from 'react';

const generateRandomBooster = (cardSet) => {
  const BOOSTER_SIZE = 15;
  const cardSetSize = cardSet.data.length;

  var randomArray = [];
  while(randomArray.length < BOOSTER_SIZE){
      var r = Math.floor(Math.random() * cardSetSize);
      if(randomArray.indexOf(r) === -1) randomArray.push(r);
  }

  return randomArray.map((index) => cardSet.data[index]);
}

const PackViewer = () => {

  const [boosterPack, setBoosterPack] = useState([])

  // Create a 15 card booster pack on mounting
  useEffect(() => {
    const randomlyGeneratedBooster = generateRandomBooster(CARD_SET);
    setBoosterPack(randomlyGeneratedBooster);
  }, []);


  return(
    <div className='pack-container'>
      {
        boosterPack.length > 0 && 
        boosterPack.map( (card) => <Card key={card.id} card={card} /> )
      }
    </div>
  )

};

export default PackViewer;