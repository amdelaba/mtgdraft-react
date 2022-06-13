import './card.styles.scss'

const Card = ({card, onClickHandler}) => {

  const ART_STYLE = 'border_crop';

  const {name} = card;
  const imageUrl = card.image_uris[ART_STYLE];

  return(
    <div className='card' onClick={onClickHandler}>
      <img src={imageUrl} alt={name}/>
      <span>{card.quantity}</span>
    </div>
  );

};

export default Card;


