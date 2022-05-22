import MainDeck from '../main-deck/main-deck.component';
import Sideboard from '../sideboard/sideboard.component';
import './deck-builder.styles.scss'

const DeckBuilder = () => {
  return(
    <div className='deck-builder-container'>
      <MainDeck/>
      <Sideboard/>
    </div>
  );
};

export default DeckBuilder;