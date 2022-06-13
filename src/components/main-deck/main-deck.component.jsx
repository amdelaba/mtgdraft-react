import { useContext } from 'react';
import { DraftContext } from '../../context/draft.context';
import Card from '../card/card.component';
import './main-deck.styles.scss'

const MainDeck = () => {

  const { mainDeck, moveToSideboardFromMaindeck } = useContext(DraftContext);

  return(
    <div className='main-deck-container'>
      {
        mainDeck.length > 0 && 
        mainDeck.map( (card) => <Card key={card.id} card={card} onClickHandler={() => moveToSideboardFromMaindeck(card)}/> )
      }
    </div>
  );

};

export default MainDeck;