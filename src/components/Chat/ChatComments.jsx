import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import styled from "styled-components";
import axios from "axios";
import { OrangeButton, OrangeInput } from "../../styles/shared";
import { motion, AnimatePresence } from "framer-motion";

const divStyle = {
  scrollBehaviour: "smooth",
  overflowY: "scroll",
  height: "400px",
  backgroundColor: "white",
  boxShadow: "4px 4px 8px rgb(0 0 0 / 10%)",
};

const commentDivStyle = {
  border: "solid 1px",
  borderRadius: "5px",
  borderColor: "rgb(255, 94, 38)",
  padding: "4px",
  margin: "2px",
};

const PostInput = styled(OrangeInput)`
  margin-top: 15px;
  padding: 2px;
`;

export default function ChatComments(props) {
  const [comments, setComments] = React.useState([]);
  const [chat, setChat] = React.useState([""]);
  const [posted, setPosted] = React.useState(1);
  const currentGroupId = useAppSelector((state) => state.currentGroup);
  const currentUserId = useAppSelector((state) => state.currentUser.id);
  const currentUserName = useAppSelector((state) => state.currentUser.first_name);

  const handlePost = (userId, groupId, chat) => {
    // console.log('clicked')
    // Hard code here
    axios
      .post(`/api/comments`, {
        user_id: userId,
        text: chat,
        date: new Date(),
        group_id: groupId,
      })
      .then((res) => {
        // getComments(groupId);
        setPosted(posted + 1);
        setChat("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayMultiComments = (comments) => {
    return (
      <>
        {comments.map((comment, index) => {
          return (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, originX: -0.8 }}
              transition={{ duration: 0.2 }}
              key={index}
            >
              <div className="commentDiv" key={index} style={commentDivStyle}>
                <label type="name">{comment.first_name}</label>
                <br></br>
                <label type="text">{comment.text}</label>
              </div>
            </motion.div>
          );
        })}
      </>
    );
  };

  async function getComments(group_id) {
    const result = await axios.get(`/api/comments?group_id=${group_id}`);
    for (let obj of result.data) {
      const userdata = await axios.get(`/api/users/${obj.user_id}`);
      obj.first_name = userdata.data.first_name;
    }
    setComments(result.data);
  }

  React.useEffect(() => {
    getComments(currentGroupId);
    // getComments(1); // Hard code
    const getNewCommentIn2Secs = setTimeout(() => {
      setPosted(posted + 1);
    }, 2000);
    return () => clearTimeout(getNewCommentIn2Secs);
  }, [posted]);

  return (
    <div className="chatComments">
      <form style={divStyle}>
        <AnimatePresence>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
            {displayMultiComments(comments)}
          </motion.div>
        </AnimatePresence>
      </form>
      <PostInput
        type="text"
        placeholder="Comment here"
        value={chat}
        onChange={(e) => {
          setChat(e.target.value);
        }}
      ></PostInput>
      <br></br>
      <OrangeButton
        type="submit"
        onClick={(e) => (e.preventDefault(), handlePost(currentUserId, currentGroupId, chat))}
      >
        Post
      </OrangeButton>
    </div>
  );
}
