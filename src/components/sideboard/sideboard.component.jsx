import { useContext } from 'react';
import { DraftContext } from '../../context/draft.context';
import Card from '../card/card.component';
import './sideboard.styles.scss'

const Sideboard = () => {

  const { sideboard, moveToMaindeckFromSideboard } = useContext(DraftContext);

  return(
    <div className='sideboard-container'>
      {
        sideboard.length > 0 && 
        sideboard.map( (card) => <Card key={card.id} card={card} onClickHandler={() => moveToMaindeckFromSideboard(card)}/> )
      }
    </div>
  );

};

export default Sideboard;