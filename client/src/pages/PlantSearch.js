


import { Grid, Card, CardBody, Button, CardHeader, Heading, Stack, StackDivider, Box, UnorderedList, ListItem, Flex} from '@chakra-ui/react'
import { useUserContext } from "../ctx/UserContext"
import "../styles/global.css";






export default function PlantSearch ({search}) {

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  
  //css classes
  const bold = {
    fontWeight: 'bold'
  }
  const button = {
    margin: '10px'
  }
  const card = {
    margin: '30px',
    backgroundColor: '#85ae5a',
    color: '#09302f',
    width: '75%',
  }
  const img = {
    borderRadius: '20px'
  }

  //button fetch calls

  const addFavPlant = async (e, plantId) => {
    e.preventDefault();
    console.log(plantId)
    const response = await fetch(`/api/user/${id}/addfavorite/${plantId}`, {
      method: 'PUT',
      body: JSON.stringify({
        _id: id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  }

  
  const addGardenPlant = async (e, plantId) => {
    e.preventDefault();
    const response = await fetch(`./api/user/${id}/addgarden/${plantId}`, {
      method: 'PUT',
      body: JSON.stringify({
        _id: id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  }

  
  return (
    <div className="search-content">
    <Flex width={"100vw"} alignContent={"center"} justifyContent={"center"}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={4}
      >
      {search?.map(function (plant){
        return (
          <Box key={plant._id} width={['100%', '100%', '100%', '100%']}>
          <Card style={card}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='3'>
                <Box>
                  <Heading size='s' textTransform='uppercase'> {plant.name} </Heading>
                </Box>
                <Box>
                  <img style={img} src={plant.image} alt='Searched Plant'/>
                </Box>
                <Box>
                  <UnorderedList>
                    <ListItem><span key= {plant.type} style={bold}>Type: </span>{plant.type}</ListItem>
                    <ListItem><span key= {plant.sowSpace} style={bold}>Sow Space: </span>{plant.sowSpace}</ListItem>
                    <ListItem><span key= {plant.sun} style={bold}>Sun: </span>{plant.sun}</ListItem>
                    <ListItem><span key= {plant.zone} style={bold}>Grow Zone: </span>{plant.zone}</ListItem>
                    <ListItem><span key= {plant.maturity} style={bold}>Maturity: </span>{plant.maturity} days</ListItem>
                  </UnorderedList>
                </Box>
              </Stack>
              <div className="buttonplanner">
                <Button style={button} onClick={(e) => addGardenPlant(e, plant._id)} colorScheme='orange'>Add to Garden</Button>
                <Button style={{ backgroundColor: '#85ae5a' }} onClick= {(e) => addFavPlant(e, plant._id)}><i className="bi bi-star search"></i></Button>
              </div>
            </CardBody>
        </Card>
        </Box>
        )
      })}
      </Grid>
    </Flex>    
    </div>
    )
}

