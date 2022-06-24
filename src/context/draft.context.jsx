import { createContext, useState } from "react";
import CARD_SET from '../card-set.json'

export const NUM_DRAFTERS = 8;

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
  bots: [],                     // 7 arrays, listing cards randomly picked by bots

  startDraft: () => {},

});

// Returns new array with ALL card copies  removed
const removeCard = (cardToRemove, cardList) => {
  return cardList.filter((card) => card.id !== cardToRemove.id);
};

const removeOneCopy = (cardToRemove, cardList) => {
  return cardList
    .map((card) => 
      card.id === cardToRemove.id ? {...card, quantity: card.quantity - 1 } : card)
    .filter((card) => card.quantity > 0);
};

// Returns new array with 1 copy added of Card
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
  const [bots, setBots] = useState([]); 

  // TODO: Creater Card object with only props that I need and 
  // additional ones such as quantity in deck


  // TODO: create function to add to Sideboard directly

  // NOTE: this func makes bot picks and human pick 
  //  in order to do only one call to 'setCurrentDraftingPacks'
  const selectCard = (cardToSelect) => {

    // Bots select cards from other packs and then Rotate to next pack
    const updatedCurrentDraftingPacks = [...currentDraftingPacks];
    const updatedBots = [...bots]

    console.log({currentPackIndex})

    for (let botIndex = 0; botIndex < bots.length; botIndex++) {

      //bot[0] gets currentDraftingPacks[1] and so on
      let packIndex;
      let potentialIndex = botIndex + currentPackIndex + 1;

      if (potentialIndex >= NUM_DRAFTERS){
        packIndex = potentialIndex - NUM_DRAFTERS
      } else {
        packIndex = potentialIndex;
      }

      const draftingPack = updatedCurrentDraftingPacks[packIndex]; 

      // TODO: Algorithm to determine what card to draft
      //  currently just first card in pack
      const cardToMove = draftingPack[0]; 
      // const cardToRemove = draftingPack[Math.floor(Math.random() * draftingPack.length)]; // Random index from 0 to pac.length
      
      updatedCurrentDraftingPacks[packIndex] = removeCard(cardToMove, draftingPack);

      updatedBots[botIndex] = addCard(cardToMove, bots[botIndex]);
    }
   
    // Remove selected card from corresponding pack
    updatedCurrentDraftingPacks[currentPackIndex] = removeCard(cardToSelect, currentDraftingPacks[currentPackIndex])
        
    setBots(updatedBots)
    setMainDeck(addCard(cardToSelect, mainDeck));
    setCurrentDraftingPacks(updatedCurrentDraftingPacks);

    getNextPack();
    
  };

  const moveToSideboardFromMaindeck = (cardToMove) => {
    setMainDeck(removeOneCopy(cardToMove, mainDeck))
    setSideboard(addCard(cardToMove, sideboard))
  };

  const moveToMaindeckFromSideboard = (cardToMove) => {
    setSideboard(removeOneCopy(cardToMove, sideboard))
    setMainDeck(addCard(cardToMove, mainDeck))
  };

  const startDraft = () => {

    // pull set from DB

    // initialize bots => Each bot (x8) is an empty array
    const botsInitialState = [];
    while(botsInitialState.length < NUM_DRAFTERS - 1){
      botsInitialState.push([])
    };
    setBots(botsInitialState);

    // generateBoosters
    generateCollectionOfBoosters(CARD_SET, NUM_DRAFTERS);
  }

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

  const getNextPack = () => {
    currentPackIndex === NUM_DRAFTERS - 1 ? setCurrentPackIndex(0) : setCurrentPackIndex(currentPackIndex + 1);
    // logic to go to next set of packs
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
    currentDraftingPacks,
    startDraft,
    bots,  // TODO: only exposing bots for logging purposes (remove afterwards)
  };

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>

}