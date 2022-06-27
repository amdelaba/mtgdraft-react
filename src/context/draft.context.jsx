import { createContext, useState } from "react";


export const NUM_DRAFTERS = 8;
const BOOSTER_SIZE = 15;
const SET_OF_PACKS_NUM = 3;


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

  currentSetOfPacksNum: 0,
  currentPickNum: 0, 
  draftIsOver: false

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

  const [currentSetOfPacksNum, setCurrentSetOfPacksNum] = useState(1); 
  const [currentPickNum, setCurrentPickNum] = useState(1); 

  const [currentDraftSet, setCurrentDraftSet] = useState([]);

  const [draftIsOver, setDraftIsOver] = useState(false);




  // TODO: Creater Card object with only props that I need and 
  // additional ones such as quantity in deck


  // TODO: create function to add to Sideboard directly
  //  including drag and drop (main and side)

  // NOTE: this func makes bot picks and human pick 
  //  in order to do only one call to 'setCurrentDraftingPacks'
  const selectCard = (cardToSelect) => {

    // Bots select cards from other packs and then Rotate to next pack
    const updatedCurrentDraftingPacks = [...currentDraftingPacks];
    const updatedBots = [...bots]


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

  const startDraft = (cardSet) => {

    // TODO: clear maindeck and sideboard
    setMainDeck([]);
    setSideboard([]);
    
    setCurrentSetOfPacksNum(1);
    setCurrentPickNum(1);

    setDraftIsOver(false);
    
    // initialize bots => Each bot (x8) is an empty array
    const botsInitialState = [];
    while(botsInitialState.length < NUM_DRAFTERS - 1){
      botsInitialState.push([])
    };
    setBots(botsInitialState);
    
    // generateBoosters
    
    // const cardSetSimplified = simplifySet(CARD_SET.data)
    // generateCollectionOfBoosters(cardSetSimplified, NUM_DRAFTERS);
    
    console.log({cardSet})
    setCurrentDraftSet(cardSet)
    generateCollectionOfBoosters(cardSet, NUM_DRAFTERS);
  }

  // NOT NEEDED ATM
  //  used for simplifying local card set
  // const simplifySet = (set) => {
  //   return set.map((card) => {
  //     return {
  //       id: card.id,
  //       name: card.name,
  //       imageUrl: card.image_uris.border_crop,
  //       colors: card.colors,
  //       rarity: card.rarity
  //     }});
  // };


  const generateRandomBooster = (cardSet) => {
    const cardSetSize = cardSet.length;
    var randomArray = [];
    while(randomArray.length < BOOSTER_SIZE) {
        var r = Math.floor(Math.random() * cardSetSize);
        if(randomArray.indexOf(r) === -1) randomArray.push(r);
    }
    return randomArray.map((index) => cardSet[index]);
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

    if (currentPickNum < BOOSTER_SIZE) {
      setCurrentPickNum(currentPickNum + 1)
    } else if (currentSetOfPacksNum < SET_OF_PACKS_NUM) {
      generateCollectionOfBoosters(currentDraftSet, NUM_DRAFTERS);
      setCurrentPackIndex(0)
      setCurrentSetOfPacksNum(currentSetOfPacksNum + 1)
      setCurrentPickNum(1)
    } else {
      console.log('Draft Ended')
      setDraftIsOver(true);
    }
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
    currentSetOfPacksNum,
    draftIsOver
  };

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>

}