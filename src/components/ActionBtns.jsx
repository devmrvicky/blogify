import { useEffect, useState } from "react";
import { ActionBtn } from ".";
import { useDispatch, useSelector } from "react-redux";
import { addClaps, replaceAllPosts, toggleClapsPage } from "../features";
import dbService from "../appwrite/databaseService";

const ActionBtns = () => {
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
    <div className="flex items-center gap-3 border-b border-t py-4 px-2">
      <ActionBtn
        actionType="claps"
        claps={claps}
        clapped={clapped}
        whoClaps={whoClaps}
        onClick={handleClaps}
        updated={updated}
        handleClapsPage={() => dispatch(toggleClapsPage(true))}
      />
      <ActionBtn actionType="comment" actionCount="20" />
    </div>
  );
};

export default ActionBtns;
