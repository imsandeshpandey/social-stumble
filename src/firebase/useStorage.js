import { useEffect, useState } from "react";
import { database, storage } from "./config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  // const acceptedFileTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState();
  const [url, setUrl] = useState();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();
  console.log(currentUser.uid);
  const [uploadState, setUploadState] = useState(null);
  const uploadFile = (data) => {
    setPost(data);
  };

  useEffect(() => {
    const postsRef = collection(database, "posts");
    const userRef = doc(database, "users", currentUser.uid);
    const storageRef = ref(storage, "posts/" + post?.file.name);

    const uploadTask = uploadBytesResumable(storageRef, post?.file);
    post &&
      uploadTask.on(
        "state_changed",
        (snap) => {
          // task progress
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);

          switch (snap.state) {
            case "paused":
              setUploadState("Upload is paused");
              break;
            case "running":
              setUploadState("Upload is running");
              break;
          }
        },
        (err) => {
          // error handling with error code
          switch (err.code) {
            case "storage/unauthorized":
              setError("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              setError("User canceled the upload");
              break;

            case "storage/unknown":
              setError("Unknown error occurred, inspect error.serverResponse");
              break;
            default:
              setError(err);
          }
        },
        async () => {
          // Upload Successful
          try {
            getDownloadURL(uploadTask.snapshot.ref).then((link) => {
              setUrl(link);
              const createdAt = Timestamp.now();
              console.log(post.description);
              addDoc(postsRef, {
                author: currentUser.uid,
                description: post.description,
                link,
                createdAt,
                likes: 0,
                shares: 0,
                comments: [],
              }).then(async (d) =>
                updateDoc(userRef, { posts: arrayUnion(d.id) })
              );
              setProgress(0);
            });
          } catch (err) {
            return setError(err);
          }
        }
      );
  }, [post]);

  return { progress, error, url, uploadFile, uploadState };
};
export default useStorage;
