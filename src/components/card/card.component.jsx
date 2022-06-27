import './card.styles.scss'

const Card = ({card, onClickHandler}) => {

  const { name } = card;

  const { imageUrl } = card;
  // const imageUrl = card.image_uris['border_crop'];
  

  return(
    <div className='card' onClick={onClickHandler}>
      <img src={imageUrl} alt={name}/>
      <span>{card.quantity}</span>
    </div>
  );

};

export default Card;


