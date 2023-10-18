import { useEffect, useState } from "react";
import { ActionBtn } from "..";
import { useDispatch, useSelector } from "react-redux";
import { addClaps, replaceAllPosts, toggleActionPage } from "../../features";
import dbService from "../../appwrite/databaseService";

const ClapsBtn = () => {
  const [updated, setUpdated] = useState(true);
  const [claps, setClaps] = useState(0);
  const [clapped, setClapped] = useState(false);
  const [whoClaps, setWhoClaps] = useState([]);
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.auth);
  const { currentPost } = useSelector((store) => store.posts);
  const handleClaps = () => {
    dispatch(addClaps({ claps: 1, whoClap: userData.$id }));
  };

  useEffect(() => {
    // console.log("run");
    (async function () {
      try {
        setUpdated(false);
        const { claps, whoClaps, $id } = currentPost;
        setClaps(claps);
        setWhoClaps(whoClaps);
        const prepareData = {};
        for (let key in currentPost) {
          if (key[0] === "$") continue;
          prepareData[key] = currentPost[key];
        }
        const allDocs = await dbService.updatePost($id, prepareData);
        if (allDocs) {
          dispatch(replaceAllPosts(allDocs.documents));
        }
      } catch (error) {
      } finally {
        setUpdated(true);
      }
    })();
  }, [currentPost.claps, claps]);

  useEffect(() => {
    whoClaps.forEach((whoClap) => {
      if (whoClap === userData.$id) {
        setClapped(true);
      }
    });
  }, [whoClaps.length]);

  return (
    <ActionBtn
      actionType="claps"
      claps={claps}
      clapped={clapped}
      whoClaps={whoClaps}
      onClick={handleClaps}
      updated={updated}
      handleClapsPage={() => dispatch(toggleActionPage({ clapsPage: true }))}
    />
  );
};

export default ClapsBtn;
