// react imports
import React from 'react';
import { useState, useEffect } from 'react';

// Chackra imports
import {
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';



export default function Forum () {


  
  const [results, setResults] = useState([]);

  const searchForum = async () => {
    const response = await fetch("/api/forum");
    const data = await response.json()
    setResults(data.payload);
    console.log(data)
  }
    useEffect(() => {
    searchForum();

  }, []);



  return (
    <>
        <Grid
        h='700px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        
        <GridItem colSpan={1}>
          <h2>My Forum Posts:</h2>
          {/* <ul className="list-group">
            {users.map((user) => (
            <li className="list-group-item" key={user.login.uuid}>
            {`${user.name.first} ${user.name.last} (${user.login.username})`}
            </li>
            ))}
          </ul> */}
          
        </GridItem>
        <GridItem colSpan={4}>
          <h2>Garden Planner Forum Posts</h2>
          <h6>See other gardener's tips and tricks, or ask a question!</h6>
          <Accordion>
          {results.map((data) => (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {`${data.title}`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div>
                  <img src={`${data.image}`} alt="image of plants" width="500" height="300"></img>
                </div>
                <div>
                  {`${data.content}`}
                </div>
                <Button className='homeButton' colorScheme='orange' href='https://arb.umn.edu/' target='_blank'>Reply to Post
                </Button>
              </AccordionPanel>
            </AccordionItem>
            ))}
          </Accordion>
        </GridItem>
      </Grid>
    </>
  )
}