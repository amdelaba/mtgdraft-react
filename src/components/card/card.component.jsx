import './card.styles.scss'

const Card = ({card}) => {

  const ART_STYLE = 'border_crop';

  const {name} = card;
  const imageUrl = card.image_uris[ART_STYLE];

  return(
    <div className='card'>
      <img src={imageUrl} alt={name}/>
    </div>
  );

};

export default Card;


