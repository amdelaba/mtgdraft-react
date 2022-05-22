import Card from '../card/card.component';
import './pack-viewer.styles.scss'

const PackViewer = () => {

  const packs = [
    {
      id: 1,
      name: 'Card 1'
    },
    {
      id: 2,
      name: 'Card 2'
    }

  ];


  return(
    <div className='pack-container'>
      <h2>Pick a Card</h2>
      <div className='cards-container'>
      {packs.map((card)=>{
        return( <Card key={card.id} name={card.name}  /> )
      })}

      </div>
    </div>
  )

};

export default PackViewer;