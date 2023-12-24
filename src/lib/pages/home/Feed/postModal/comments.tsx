import React, { useEffect, useState, } from 'react';
import { Box, Text, Image, Flex, Button, Tooltip } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import useAuthUser from '../../api/useAuthUser';
import voteOnContent from '../../api/voting';

import * as Types from '../types'; 

import CommentBox from './commentBox';

const Comment: React.FC<Types.CommentProps> = ({ author, body, created, net_votes, permlink  }) => {
    const avatarUrl = `https://images.ecency.com/webp/u/${author}/avatar/small`;
    const { user } = useAuthUser();
    const [localNetVotes, setNetVotes] = useState(net_votes);
    
    const handleVote = async () => {
        if (!user || !user.name) {
          console.error("Username is missing");
          return;
        }
      
        try {
          // Perform the vote operation
          await voteOnContent(user.name, permlink, author, 10000);
      
          if (author) {
            const author_alert = author;
            alert("You just voted on " + author_alert + "'s comment! 🛹");
          }
      
          // Update the net_votes only if the vote operation is successful
          setNetVotes(net_votes + 1);
        } catch (error:any) {
          console.error("Error voting:", error);
      
          // Check if the error code is -32003 and handle it differently
          if (error.code === -32003) {
            // Handle this specific error case (optional)
            // You can add custom logic here if needed
            await voteOnContent(user.name, permlink, author, 0);
            setNetVotes(localNetVotes-1);
          } else {
            // Handle other errors (if any)
            // You can add custom error handling logic here
          }
        }
    };

    return (
        <Box border="1px solid #60D0C6" borderRadius="10px" padding="15px" margin="10px">
            <Flex padding="5px" alignItems="center">
                <Image src={avatarUrl} borderRadius="full" boxSize="40px" mr="3" border={"2px solid black"}/>
                <Text color={"black"} >@{author}</Text>
            </Flex>
            <ReactMarkdown 
                children={body}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ node, alt, src, title, ...props }) => (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img {...props} alt={alt} src={src} title={title} style={{ maxWidth: '100%', height: 'auto', borderRadius:"10px", border:'1px solid #60D0C6' }} />
                        </div>
                    ),
                    a: ({node, children, ...props}) => <a {...props} style={{ color: 'red' }}>{children}</a>,
                    p: ({node, children, ...props}) => <p {...props} style={{ color: 'black' }}>{children}</p>,
                    h1: ({node, children, ...props}) => <h1 {...props} style={{ fontWeight: 'bold',color: '#60D0C6', fontSize: '24px' }}>{children}</h1>,
                    h2: ({node, children, ...props}) => <h2 {...props} style={{ fontWeight: 'bold',color: '#60D0C6', fontSize: '20px' }}>{children}</h2>,
                    h3: ({node, children, ...props}) => <h3 {...props} style={{ fontWeight: 'bold',color: '#60D0C6', fontSize: '18px' }}>{children}</h3>,
                    blockquote: ({node, children, ...props}) => <blockquote {...props} style={{ borderLeft: '3px solid #d7a917', paddingLeft: '10px', fontStyle: 'italic' }}>{children}</blockquote>,
                    ol: ({node, children, ...props}) => <ol {...props} style={{ paddingLeft: '20px' }}>{children}</ol>,
                    ul: ({node, children, ...props}) => <ul {...props} style={{ paddingLeft: '20px' }}>{children}</ul>,
                }}
            />
            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="sm">{new Date(created).toLocaleString()}</Text>
                <Button leftIcon={<span></span>} variant="outline" size="sm" onClick={handleVote} border={"1px solid red"}>
                    <img
                        src="/assets/somaskate2.ico"
                        alt="Vote"
                        style={{
                            maxWidth: '24px', // Set a maximum width for the image
                            maxHeight: '24px', // Set a maximum height for the image
                            marginRight: '5px', // Add some spacing between the image and text
                        }}
                    />
                    <p>{localNetVotes}</p>
                </Button>
            </Flex>
        </Box>
    );
};

const Comments: React.FC<Types.CommentsProps> = ({ comments, commentPosted, blockedUser }) => {
  const [localComments, setLocalComments] = useState<Types.CommentProps[]>(comments);
  const blockedUsersList = Array.isArray(blockedUser) ? blockedUser : [blockedUser]; // Convert to an array if it's not already

  useEffect(() => {
      if (commentPosted) {
          // Logic to re- comments when a new one is posted
          // For now, I'm just simulating a re- by setting the local state
          // Replace this with your actual  logic
          setLocalComments(comments);
      }
  }, [commentPosted, comments]);

  const filterBlockedUserComments = (comments: Types.CommentProps[], blockedUsers: string[]): Types.CommentProps[] => {
    const filteredComments = comments.filter((comment: Types.CommentProps) => !blockedUsers.includes(comment.author));
    return filteredComments;
};

  // Filter comments based on blockedUser
  const filteredComments = filterBlockedUserComments(localComments, blockedUsersList);

  return (
      <Box>
          {filteredComments.map((comment, index) => (
              <Comment key={index} {...comment} />
          ))}
      </Box>
  );
};


export default Comments;