// import '../styles/global.css'
import Background from '../images/background-img.jpg'
import {Button} from "@chakra-ui/button"

const HomePage = () => {

  const img = {
    marginTop: '-16px',
    marginLeft: '-30px',
    marginBottom: '-40px',
    width: '100%'
  }

  const button = {
    position: 'absoulte'
  }

  

  return (
    <div>
      <div className="home">
        <h1 className="header-text">
          Planting success <br/>
          in the land of 10,000 lakes
          </h1>
      </div>
      <div >
        <img style={img} src={Background} alt='garden'/>
      </div>
      <div>
        <Button className='homeButton' colorScheme='orange' href='https://arb.umn.edu/' target='_blank'>Click for Resources <br/>
        from the Minnesota Arboretum!
        </Button>
      </div>
    </div>
  )
}

export default HomePage