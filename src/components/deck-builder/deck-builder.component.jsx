import MainDeck from '../main-deck/main-deck.component';
import Sideboard from '../sideboard/sideboard.component';
import './deck-builder.styles.scss'

const DeckBuilder = () => {
  return(
    <div className='deck-builder-container'>
      <h2> Main Deck </h2>
      <MainDeck/>
      <h2> Sideboard </h2>
      <Sideboard/>
    </div>
  );
};

export default DeckBuilder;