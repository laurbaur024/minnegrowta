import '../styles/global.css'
import Background from '../images/background-img.jpg'
import { Button } from "@chakra-ui/react";

const HomePage = () => {

  const img = {
    width: '100%'
  }

  const buttonStyles = {
    position: "fixed",
    top: 150,
    right: "6%",
    padding: 2,
    zIndex: 999
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="header-text" style={{ position: "fixed" }}>
          Planting success <br/>
          in the land of 10,000 lakes
          </h1>
      </div>
      <div className="img-container">
        <img className="img" style={img} src={Background} alt='garden'/>
      </div>
      <div className="home-container">
        <div style={{ position: "fixed" }}>
          <Button
            className='homeButton'
            colorScheme="orange"
            onClick={() => {
              window.open("https://arb.umn.edu/", "_blank");
            }}
            style={buttonStyles}
            size="lg"
          >
            Click for Resources <br />
            from the Minnesota Arboretum!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage