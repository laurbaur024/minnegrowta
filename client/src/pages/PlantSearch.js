


import { Card, CardBody, Button, CardHeader, Heading, Stack, StackDivider, Box, UnorderedList, ListItem, Flex} from '@chakra-ui/react'
import { useUserContext } from "../ctx/UserContext"
import React, {useState} from "react"




export default function PlantSearch ({search}) {

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  console.log(id)

  const [favPlant, setFavPlant] = useState([])
  const [gardenPlant, setGardenPlant] = useState([])
  

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

  const addFavPlant = async (e) => {
    e.preventDefault();
    const response = await fetch(`./api/user/${id}/favorites/:plantId`, {
      method: 'POST',
      body: JSON.stringify({
        _id: id,
        plantID: '64fb776ddf07cf20146e2015' //currently hardcoded with a plantId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  }

  
  const addGardenPlant = async (e) => {
    e.preventDefault();
    const response = await fetch(`./api/user/${id}/garden/:plantId`, {
      method: 'POST',
      body: JSON.stringify({
        _id: id,
        plantID: '64fb776ddf07cf20146e2015' //currently hardcoded with a plantId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  }


  
  return (
    <Flex width={"100vw"} height={"90vh"} alignContent={"center"} justifyContent={"center"}>
      {search.map(function (plant){
        return (
          <Card style={card}>
          <CardHeader>
            <Heading size='md'>Showing Results for <span>{plant.name}</span>...</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='s' textTransform='uppercase'> {plant.name} </Heading>
              </Box>
              <Box>
                <img style={img} src='https://hgshydro.com:5001/blog/hgs.19105c12-3b2c-4035-9b68-934641c3f27b_default.jpg' alt='Searched Plant'/>
              </Box>
              <Box>
                <UnorderedList>
                  <ListItem><span style={bold}>Type: </span>{plant.type}</ListItem>
                  <ListItem><span style={bold}>Sow Space: </span>{plant.sowSpace}</ListItem>
                  <ListItem><span style={bold}>Climbing: </span>{plant.climbing}</ListItem>
                  <ListItem><span style={bold}>Sun: </span>{plant.sun}</ListItem>
                  <ListItem><span style={bold}>Grow Zone: </span>{plant.zone}</ListItem>
                  <ListItem><span style={bold}>Maturity: </span>{plant.maturity}</ListItem>
                </UnorderedList>
              </Box>
            </Stack>
            <div>
              <Button style={button} colorScheme='orange'>Add to Favorites</Button>
              <Button style={button} colorScheme='orange'>Add to Garden</Button>
            </div>
          </CardBody>
        </Card>
        )
      })}

    </Flex>    
    )
}

