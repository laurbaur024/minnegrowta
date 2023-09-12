// react imports
import React from 'react';
import { useState, useEffect } from 'react';
import Upload from '../components/Uploader';
import {useUserContext} from "../ctx/UserContext";

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
  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  const isUserVerified = !!id;
  

  // code for getting all forum posts, useState used and fetch request from api used to bring all forum posts from api and turned into array of objects we can map over and display on page
  const [results, setResults] = useState([]);
  const [ image, setImage] = useState('')
  
  const searchForum = async () => {
    const response = await fetch("/api/forum");
    const data = await response.json()
    setResults(data.payload);
    // console.log(data.payload)
  }
  useEffect(() => {
    searchForum();
  }, []);
  
  // code for displaying my forum posts, gets myforums associated with user if user has been verified, then iterates over array of forum ids to get individual posts
  const [ forumPosts, setForumPosts ] = useState([]);
  const  [ okToRender, setOkToRender ] = useState(false)

  const myForumPosts = async (userId) => {
    console.log("fetching", userId)
    try {
      // if (isUserVerified){
      const response1 = await fetch(`/api/user/${userId}`);
      const forumPostsData = await response1.json()
      setForumPosts(forumPostsData)
      // console.log(forumPostsData.payload.myForums)

      const myPostsId = forumPostsData.payload.myForums 
      const getMyPosts = async(id) => {
        try{
          const response = await fetch(`/api/forum/${id}`);
          const data1 = await response.json();
          // console.log(data1.payload);
          setForumPosts(data1.payload);
          
        } catch (error) {
          console.error('error fetching data for id', error)
        }
      };
      myPostsId.forEach((id) => {
        getMyPosts(id);
      })

      setOkToRender(true)
      // } 
    } catch (error) {
      console.error("Error fetching forum posts:", error);
    }
  };

  useEffect(() => {
    if( currUser?.data?._id )
      myForumPosts(currUser?.data?._id);
  }, [currUser]);
  


console.log(forumPosts)


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
        body: JSON.stringify( {title: form.title, content: form.content, image: image, userId: id} )
      })
      console.log("success")
    } catch (error) {
      console.log(error)
      
    }
  }

  // monitors what is being typed in reply modal form
  const [reply, setReply] = useState({text: "", forumId: ""});
  let handleReplyInputChange = (e) => {
    if(e.target.name === "replyText"){
      setReply({...reply, text: e.target.value})
    } 
  }

  let handleAccordianClickChange = (e) => {
    // console.log(e.target.id)
    setReply({...reply, forumId: e.target.id})
  }

  // code for post reply to forum post
  const onReply = async () => {
    try {
      let response = await fetch(`/api/comment/${reply.forumId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: reply.text, userId: id })      
      })
      console.log(reply)
      console.log("success")
    } catch (error) {
      console.log(error)
    }
  }


  if( !okToRender ) return <p>Loading...</p>
  return (
    <div className="forumcontainer">
    <>
        <Grid className="forum-content"
        h='700px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        
        <GridItem colSpan={1}>
            <h2>My Forum Posts:</h2>
            <div>
              {/* {forumPosts ? (
                forumPosts.map((id) => (
                  <div key={id.title}>
                    {`${id.title}`}
                  </div>
                ))
              ) : (
                <p>Loading forum posts...</p>
              )} */}
            </div>
         
          <Button onClick={onForumOpen}>Add a New Forum Post</Button>

          <Modal isOpen={isForumOpen} onClose={onForumClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Forum Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Forum Post Title:</FormLabel>
                  <Input type='text' value={form.title} key={form.title} onChange={handleInputChange} name="forumTitle"/>
                </FormControl>
                <FormControl>
                <Text mb='8px'>Forum Post Content:</Text>
                <Textarea
                  value={form.content}
                  onChange={handleInputChange}
                  placeholder='Enter Post Content Here'
                  size='lg'
                  name="forumContent"
                  key={form.content}
                />
                </FormControl>
                  {/* <Lorem count={2} /> */}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onSubmit}>
                  Submit
                </Button>
                <Upload setImage={setImage}/>
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
                <AccordionButton >
                  <Box as="span" flex='1' textAlign='left' id={data._id} key={data.title} onClick={handleAccordianClickChange}>
                    {`${data.title}`} 
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div>
                  <img src={`${data.image}`} alt="image of plants" width="500" height="300" key={data.image}></img>
                </div>
                <div key={data.content} >
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
                      key={reply.text}
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
    </div>
  )
}