// react imports
import React from 'react';
import { useState, useEffect } from 'react';
import Upload from '../components/Uploader';

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
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/react'




export default function Forum () {

  // code for getting all forum posts, useState used and fetch request from api used to bring all forum posts from api and turned into array of objects we can map over and display on page
  const [results, setResults] = useState([]);
  
  const searchForum = async () => {
    const response = await fetch("/api/forum");
    const data = await response.json()
    setResults(data.payload);
  }
  useEffect(() => {
    searchForum();
  }, []);
  
  
  
  //code for modals, one for forum post one for reply, this makes the two buttons open different models
  const { isOpen: isForumOpen , onOpen: onForumOpen, onClose: onForumClose } = useDisclosure()
  const { isOpen: isReplyOpen , onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure() 


  // monitors what is being typed in new forum post form
  const [form, setForm] = useState({title: "", content: ""});
  let handleInputChange = (e) => {
    if(e.target.name === "forumTitle"){
      setForm({...form, title: e.target.value})
    } else {
      setForm({...form, content: e.target.value})
    }
  }
  
  // code for submitting new forum post, text from modal input fields is turned into object and posted to api/forum with the rest of the forum posts. Has to be stringified
  const [value, setValue] = React.useState('')
  
  const onSubmit = async () => {
    try {
      let response = await fetch('/api/forum', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify( {title: form.title, content: form.content, image: "https://upcdn.io/W142hJk/thumbnail/demo/4mB638K545.jpg.crop"} )
      })
      console.log("success")
    } catch (error) {
      console.log(error)
      
    }
  }

  // monitors what is being typed in reply modal form
  const [reply, setReply] = useState({text: ""});
  let handleReplyInputChange = (e) => {
    if(e.target.name === "replyText"){
      setReply({...reply, text: e.target.value})
    } 
  }

  // code for post reply to forum post
  const onReply = async (postId) => {
    try {
      let response = await fetch(`/api/comment/${postId}`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: reply.text
      })
      console.log(reply)
      console.log(postId)
      console.log("success")
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
        <Grid className="forum-content"
        h='700px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        
        <GridItem colSpan={1}>
          <h2>My Forum Posts:</h2>
         
          <Button onClick={onForumOpen}>Add a New Forum Post</Button>

          <Modal isOpen={isForumOpen} onClose={onForumClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Forum Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <FormControl>
                <FormLabel>Forum Post Title:</FormLabel>
                <Input type='text' value={form.title} onChange={handleInputChange} name="forumTitle"/>
              </FormControl>
              <FormControl>
              <Text mb='8px'>Forum Post Content:</Text>
              <Textarea
                value={form.content}
                onChange={handleInputChange}
                placeholder='Enter Post Content Here'
                size='lg'
                name="forumContent"
              />
              </FormControl>
                {/* <Lorem count={2} /> */}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onSubmit}>
                  Submit
                </Button>
                <Upload />
              </ModalFooter>
            </ModalContent>
          </Modal>
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
                <Button onClick={onReplyOpen}>Reply to Forum Post</Button>
                <Modal isOpen={isReplyOpen} onClose={onReplyClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Reply to Forum Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                    <Text mb='8px'>Reply to Post Here:</Text>
                    <Textarea
                      value={reply.text}
                      onChange={handleReplyInputChange}
                      placeholder='Enter Reply Here'
                      size='lg'
                      name="replyText"
                    />
                    </FormControl>
                      {/* <Lorem count={2} /> */}
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={() => onReply(data._id)}>
                        Submit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </AccordionPanel>
            </AccordionItem>
            ))}
          </Accordion>
        </GridItem>
      </Grid>
    </>
  )
}