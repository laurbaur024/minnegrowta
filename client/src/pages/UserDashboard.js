import React from "react";
import CardContainer from "../components/CardContainer";
import TimelineContainer from "../components/TimelineContainer";
import {Card, Stack, CardBody} from '@chakra-ui/react'
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
      <Card className="timeline-content" direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Stack>
          <CardBody className="timeline-container" style={margin}>
              <div>
                <h2 style={{ whiteSpace: 'nowrap' }} className='planner-title'>Your Timeline</h2>
                <div className="dashtimeline">
                <TimelineContainer></TimelineContainer>
                </div>
              </div>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
};

export default App;
