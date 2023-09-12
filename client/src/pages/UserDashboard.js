import React from "react";
import CardContainer from "../components/CardContainer";
import TimelineContainer from "../components/TimelineContainer";
import {Card, Stack, CardBody, Heading, Text, Button} from '@chakra-ui/react'
import { useUserContext } from "../ctx/UserContext"; 

const App = () => {
  const margin = {
    marginBottom: "10px"
  }

  const { currUser } = useUserContext();
  const username = currUser?.data?.username;

  return (
    <div className="dash-container">
      <h1>Welcome to Your Dashboard, {username}</h1>
      <CardContainer className="cardcont"/>
      <Card className="timeline-content" style={margin}direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Stack>
          <CardBody>
            <Heading>{TimelineContainer}</Heading>
            <Text py='2'>Timeline will go here!</Text>
            <Button>Timeline</Button>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
};

export default App;
