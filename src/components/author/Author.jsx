import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import dbService from "../../appwrite/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMainData } from "../../features";
import {removeDollarSign, formateDistance as useFormateDistanceDate} from "../../common-methods";
import { Oval } from "react-loader-spinner";

const Author = ({
  authorId,
  $id,
  authorName,
  readTime,
  $createdAt,
  className = "",
  iconWidth = "w-12",
  iconHeight = "h-12",
  nameFontSize = "text-lg",
  dateFontSize = "text-xs",
  followBtn = true,
}) => {
  const [updating, setUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  const { userMainData } = useSelector((store) => store.auth);

  const handleClick = async () => {
    try {
      setUpdating(true);
      // get user all main data when app is starting
      const res = await dbService.getAllUserDataByUserId(authorId);
      if (res.documents.length) {
        if (!isFollowing) {
          // follow
          // update author user data
          const prepareData = removeDollarSign(res.documents[0]);
          prepareData.followers = [
            ...prepareData.followers,
            userMainData.userId,
          ];
          await dbService.updateUserData(res.documents[0].$id, prepareData);
          // update own main data
          const myData = removeDollarSign(userMainData);
          myData.following = [...myData.following, authorId];
          const myRes = await dbService.updateUserData(
            userMainData.$id,
            myData
          );
          if (myRes) {
            dispatch(updateUserMainData(myRes));
          }
        } else {
          // unfollow
          console.log("unfollow");
          const prepareData = removeDollarSign(res.documents[0]);
          prepareData.followers = prepareData.followers.filter(
            (follower) => follower !== userMainData.userId
          );
          await dbService.updateUserData(res.documents.$id, prepareData);
          // update own main data
          const myData = removeDollarSign(userMainData);
          myData.following = myData.following.filter(
            (follower) => follower !== authorId
          );
          const myRes = await dbService.updateUserData(
            userMainData.$id,
            myData
          );
          if (myRes) {
            dispatch(updateUserMainData(myRes));
          }
        }
      }
    } catch (error) {
      console.error("Error from following segment : " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    // setIsFollowing(userMainData.following.find(userId => userId === authorId))
    const followingUser = userMainData.following.find(
      (userId) => userId === authorId
    );
    if (followingUser) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userMainData.following.length]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${iconWidth} ${iconHeight} rounded-full border flex items-center justify-center`}
      >
        <FaUser />
      </div>
      <div>
        <div>
          <div className={`flex gap-3 ${nameFontSize}`}>
            <p>{authorName}</p>
            {followBtn && (
              <button
                className={`w-24 text-sm bg-blue-800/50 py-1 rounded-full text-white transition-all flex items-center justify-center`}
                onClick={handleClick}
              >
                {!updating ? (
                  <span className="active:scale-95 transition-all">
                    {isFollowing ? "Following" : "Follow"}
                  </span>
                ) : (
                  <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 mt-auto text-sm text-zinc-500">
            {readTime && (
              <>
                <p>{readTime}</p>
                <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
              </>
            )}
            <p className={`${dateFontSize}`}>
              {$createdAt && useFormateDistanceDate($createdAt)}
            </p>
            {/* <span className="w-1 h-1 bg-zinc-500 rounded-full"></span> */}
            <p className="hidden">200 follower</p>
          </div>
        </div>
        <button type="button" className="hidden">
          button
        </button>
      </div>
    </div>
  );
};

export default Author;
