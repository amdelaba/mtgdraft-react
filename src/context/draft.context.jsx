import { createContext, useState } from "react";
// import CARD_SET from '../card-set.json'

export const DraftContext = createContext({
  currentDraftingPacks: [],  // Collection of 8 current booster packs being drafted 
  currentPackIndex: null,
  mainDeck: [],
  sideboard: [],
  
  selectCard: () => {},
  moveToSideboardFromMaindeck: () => {},
  moveToMaindeckFromSideboard: () => {},

  generateRandomBooster: () => {},
  generateCollectionOfBoosters: () => {},
  getNextPack: () => {},     // Sets currentPack to be the next in the Collection in Order
  bots: []                   // 7 arrays, listing cards randomly picked by bots
});

// Removes ALL copies of given card
const removeCard = (cardToRemove, cardList) => {
  return cardList.filter((card) => card.id !== cardToRemove.id);
};

const removeOneCopy = (cardToRemove, cardList) => {
  return cardList
    .map((card) => 
      card.id === cardToRemove.id ? {...card, quantity: card.quantity - 1 } : card)
    .filter((card) => card.quantity > 0);
};

const addCard = (cardToAdd, cardList) => {
  const existingCard = cardList.find((card) => card.id === cardToAdd.id);

  if (existingCard) {
    return cardList.map((card) => 
    card.id === existingCard.id ? { ...card, quantity: card.quantity + 1 } : card)
  }
  return [ ...cardList, {...cardToAdd , quantity: 1 } ]
}


export const DraftProvider = ({ children }) => {

  const [currentPackIndex, setCurrentPackIndex] = useState([]); 

  const [mainDeck, setMainDeck] = useState([]); 
  const [sideboard, setSideboard] = useState([]); 
  const [currentDraftingPacks, setCurrentDraftingPacks] = useState([]); 

  // TODO: Creater Card object with only props that I need and 
  // additional ones such as quantity in deck

  // Add card to maindeck + quantity drafted
  // TODO: create function to add to Sideboard directly
  const selectCard = (cardToSelect) => {

    const updatedCurrentDraftingPacks = [...currentDraftingPacks];

    updatedCurrentDraftingPacks[currentPackIndex] = removeCard(cardToSelect, currentDraftingPacks[currentPackIndex])

    setCurrentDraftingPacks(updatedCurrentDraftingPacks);

    setMainDeck(addCard(cardToSelect, mainDeck));

    // TODO: randomly remove a card from the other packs
    //  to simulate bots
    
  };

  const moveToSideboardFromMaindeck = (cardToMove) => {
    setMainDeck(removeOneCopy(cardToMove, mainDeck))
    setSideboard(addCard(cardToMove, sideboard))
  };

  const moveToMaindeckFromSideboard = (cardToMove) => {
    setSideboard(removeOneCopy(cardToMove, sideboard))
    setMainDeck(addCard(cardToMove, mainDeck))
  };

  // TODO: refactor this function, to make more readable
  const generateRandomBooster = (cardSet) => {
    const BOOSTER_SIZE = 15;
    const cardSetSize = cardSet.data.length;

    // var randomArray = [0,1,2,3,4,5,5,5,5];
    var randomArray = [];
    while(randomArray.length < BOOSTER_SIZE){
        var r = Math.floor(Math.random() * cardSetSize);
        if(randomArray.indexOf(r) === -1) randomArray.push(r);
    }

    return randomArray.map((index) => cardSet.data[index]);
  }

  const generateCollectionOfBoosters = (cardSet, numberOfBoosters) => {
    const generatedBoosters = [];
    while (generatedBoosters.length < numberOfBoosters){
      generatedBoosters.push(generateRandomBooster(cardSet));
    }

    setCurrentDraftingPacks(generatedBoosters);
    setCurrentPackIndex(0);
  };

  const value = { 
    currentPackIndex,
    mainDeck,
    sideboard,
    selectCard,
    moveToSideboardFromMaindeck,
    moveToMaindeckFromSideboard,
    generateRandomBooster,
    generateCollectionOfBoosters,
    currentDraftingPacks
  };

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>

}