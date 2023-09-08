import { Grid, GridItem } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';



export default function Planner() {
  return (
    <>
      <Grid
        h='700px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={5} bg='tomato'>
          <h1>Insert timeline here</h1>
        </GridItem>
        <GridItem colSpan={1} bg='papayawhip'>
          <h2>Insert form here to add new journal post, maybe a button that opens a modal</h2>
        </GridItem>
        <GridItem colSpan={4} bg='papayawhip'>
          <h2>Get all my journal posts to populate here in chronological order, maybe we should get these to appear on timeline too?</h2>
        </GridItem>
        
      </Grid>
    
    
    
    </>
  )
}