


import { Card, CardBody, Button, CardHeader, Heading, Stack, StackDivider, Box, UnorderedList, ListItem, Flex} from '@chakra-ui/react'
import { useUserContext } from "../ctx/UserContext"
import React, {useState} from "react"




export default function PlantSearch ({search}) {

  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
 

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
      {search?.map(function (plant){
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
                <img style={img} src={plant.image} alt='Searched Plant'/>
              </Box>
              <Box>
                <UnorderedList>
                  <ListItem><span key= {plant.type} style={bold}>Type: </span>{plant.type}</ListItem>
                  <ListItem><span key= {plant.sowSpace} style={bold}>Sow Space: </span>{plant.sowSpace}</ListItem>
                  <ListItem><span key= {plant.climbing} style={bold}>Climbing: </span>{plant.climbing}</ListItem>
                  <ListItem><span key= {plant.sun} style={bold}>Sun: </span>{plant.sun}</ListItem>
                  <ListItem><span key= {plant.zone} style={bold}>Grow Zone: </span>{plant.zone}</ListItem>
                  <ListItem><span key= {plant.maturity} style={bold}>Maturity: </span>{plant.maturity}</ListItem>
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
    // <Flex width={"100vw"} height={"90vh"} alignContent={"center"} justifyContent={"center"}>
    //       <Card style={card}>
    //       <CardHeader>
    //         <Heading size='md'>Showing Results for <span>{search.name}</span>...</Heading>
    //       </CardHeader>
    //       <CardBody>
    //         <Stack divider={<StackDivider />} spacing='4'>
    //           <Box>
    //             <Heading size='s' textTransform='uppercase'> {search.name} </Heading>
    //           </Box>
    //           <Box>
    //             <img style={img} src={search.image} alt='Searched Plant'/>
    //           </Box>
    //           <Box>
    //             <UnorderedList>
    //               <ListItem><span key= 'type' style={bold}>Type: </span>{search.type}</ListItem>
    //               <ListItem><span key= 'sow' style={bold}>Sow Space: </span>{search.sowSpace}</ListItem>
    //               <ListItem><span key= 'climbing' style={bold}>Climbing: </span>{search.climbing}</ListItem>
    //               <ListItem><span key= 'sun' style={bold}>Sun: </span>{search.sun}</ListItem>
    //               <ListItem><span key= 'zone' style={bold}>Grow Zone: </span>{search.zone}</ListItem>
    //               <ListItem><span key= 'maturity' style={bold}>Maturity: </span>{search.maturity}</ListItem>
    //             </UnorderedList>
    //           </Box>
    //         </Stack>
    //         <div>
    //           <Button style={button} colorScheme='orange'>Add to Favorites</Button>
    //           <Button style={button} colorScheme='orange'>Add to Garden</Button>
    //         </div>
    //       </CardBody>
    //     </Card>
  

    // </Flex>   
    
    )
}

