import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments, getCardSet } from '../utils/firebase/firebase.utils'
import SET_DATA from "../card-set.js";

// Actual value you want to access
// gets passed default value (not necessarily the initial value)
export const CardSetContext = createContext({
  cardSet: []
});

// functional component
// Allows children component of UserProvider to access the values of its State
export const CardSetProvider = ({ children }) => {
  const [cardSet, setCardSet] = useState([]);
  
  // One Time Thing, to load SHOP_DATA to firebase
  // useEffect(() => {
  //   addCollectionAndDocuments('SNC_simple', SET_DATA);
  //   console.log('Card Set Provider')
  // }, [])

  // Do this when useEffect calls an async function
  useEffect(() => {
    const retrieveCardSet = async () => {
      const cardSetFromDB = await getCardSet();  // from firebase DB
      setCardSet(cardSetFromDB);
      console.log('done', {cardSetFromDB});
    };
    retrieveCardSet();
  }, []);
  
  const value = { cardSet };
  
  return <CardSetContext.Provider value={value}> {children} </CardSetContext.Provider>
};

