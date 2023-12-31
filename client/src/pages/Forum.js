// react imports
import React, { useState, useEffect } from 'react';
import Upload from '../components/Uploader';
import {useUserContext} from "../ctx/UserContext";

// Chackra imports
import {Grid, GridItem, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,FormControl, FormLabel, Input, Textarea, Text} from '@chakra-ui/react'

export default function Forum () {
  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  const [comment, setComment] = useState('');
  const isUserVerified = !!id;
  const [results, setResults] = useState([]);
  const [ image, setImage] = useState('')
  const [expandedItem, setExpandedItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({title: "", content: ""});
  const [ forumPosts, setForumPosts ] = useState([]);
  const  [ okToRender, setOkToRender ] = useState(false)
  const [deletePost, setdeletePost] = useState([]);
   // code for getting all forum posts, useState used and fetch request from api used to bring all forum posts from api and turned into array of objects we can map over and display on page
  const searchForum = async () => {
    const response = await fetch("/api/forum");
    const data = await response.json()
    setResults(data.payload);
    // console.log(data.payload)
  }

  useEffect(() => {
    searchForum();
  }, []);



  // code for displaying my forum posts,

  const myForumPosts = async (userId) => {
    try {
      const response1 = await fetch(`/api/user/${userId}`);
      const forumPostsData = await response1.json()
      setForumPosts(forumPostsData.payload.myForums)
      setOkToRender(true);
    } catch (error) {
      console.error('error fetching forum posts', error);
    }
  };
  useEffect(() => {
    if( currUser?.data?._id )
      myForumPosts(currUser?.data?._id) 
  }, [currUser]);

  //code for modals, one for forum post one for reply, this makes the two buttons open different models
  const { isOpen: isForumOpen , onOpen: onForumOpen, onClose: onForumClose } = useDisclosure()
  const { isOpen: isReplyOpen , onOpen: onReplyOpen, onClose: onReplyClose } = useDisclosure()


  // monitors what is being typed in new forum post form
  let handleInputChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
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
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  
  // monitors what is being typed in reply modal form
  const [reply, setReply] = useState({text: "", forumId: ""});
  let handleReplyInputChange = (e) => {
      setReply({...reply, [e.target.name]: e.target.value})
    }


  // handles accordian functionality
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
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }


  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setCurrentUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    searchForum();
  }, []);


  // delete route for users forum posts
  const onDelete = async (event) => {
    try {
      const response = await fetch(`/api/forum/${event.target.id}`, {
        method: "DELETE",
      });
      console.log(response)
      const data = await response.json();
      setCurrentUser(data.user);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const onDeleteComment = async (commentId) => {
    if (commentId) {
      try {
        const response = await fetch(`/api/comment/${commentId}`, {
          method: "DELETE",
        });
  
        if (response.status === 200) {
          const data = await response.json();
          setCurrentUser(data.user);
          window.location.reload();
        } else {
          console.error("Error deleting comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  if( !okToRender ) return <p>Loading...</p>

  return (
    <div className="forumcontainer">
    <>
        <Grid className="forum-content"
        minHeight='300px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        
          <GridItem colSpan={1} className="postgrid">
            <h2 style={{ whiteSpace: 'nowrap' }}>My Posts</h2>
            <Button colorScheme='green' onClick={onForumOpen}>New Post</Button>

            <Modal isOpen={isForumOpen} onClose={onForumClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>New Florum Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl controlId='forumTitle'>
                    <FormLabel>Florum Post Title:</FormLabel>
                    <Input type='text' value={form.title} onChange={handleInputChange} name="title" />
                  </FormControl>
                  <FormControl>
                    <Text mb='8px'>Florum Post Content:</Text>
                    <Textarea
                      value={form.content}
                      onChange={handleInputChange}
                      placeholder='Enter Post Content Here'
                      size='lg'
                      name="content"
                    />
                  </FormControl>

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='green' mr={3} onClick={onSubmit}>
                    Submit
                  </Button>
                  <Upload setImage={setImage} />
                </ModalFooter>
              </ModalContent>
            </Modal>
            <p></p>
            <div>
              {forumPosts.map((index) => (
                <div className="myposts" key={index.title}>
                    <Text isTruncated maxW="16ch" flex="1" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                      "{index.title}"
                    </Text>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button colorScheme='orange' onClick={onDelete} id={index._id}>
                        Delete
                      </Button>
                    </div>
                </div>
              ))}
            </div>



          </GridItem>
        <GridItem className="allpostgrid" colSpan={4}>
          <h2>The Florum</h2>
          <h6>See other gardener's tips and tricks, or ask a question!</h6>
          <Accordion allowToggle>
          {results.map((data, index) => (
            <AccordionItem key={index}>
              <h2 style={{ marginBottom: '0px' }}>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left' id={data._id} key={data.title} onClick={handleAccordianClickChange}>
                    {`${data.title}`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel className="forum-panel" pb={4}>
                <Box maxH="400px" overflowY="auto" border="1px solid lightgrey" borderRadius="8px">
                  <div className="forum-img">
                    <img src={`${data.image}`} alt="image of plants" width="500" height="300"></img>
                  </div>
                  <div className="forum-cnt">
                    {`${data.content}`}
                  </div>
                </Box>
                <div className="replybox">
                <div className="forum-reply">
                  <p>Replies:</p>
                  <Button colorScheme='blue' onClick={onReplyOpen}>Add Reply</Button>
                </div>
                {data.commentId.map((comment, index) => (
                  <div className="replies" key={comment.id}>
                    <span>"{comment.text}"</span>
                    {comment.userId === currUser?.data?._id && (
                      <Button colorScheme='orange' onClick={() => onDeleteComment(comment._id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                ))}
                </div>
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
                      name="text"
                      // key={reply.text}
                    />
                    </FormControl>
                      
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


