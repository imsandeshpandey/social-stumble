import { useEffect, useState } from "react";
import { database, storage } from "./config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  // const acceptedFileTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState();
  const [url, setUrl] = useState();
  const { currentUser } = useAuth();
  const [uploadState, setUploadState] = useState(null);

  const uploadFile = async ({ file, post = false, userPhoto = false }) => {
    const postsRef = collection(database, "posts");
    console.log(file);
    let userRef;
    if (currentUser) {
      userRef = doc(database, "users", currentUser?.uid);
    }
    const storageRef = ref(
      storage,
      (post ? "posts/" : userPhoto ? "userPhotos/" : "other/") + file?.file.name
    );

    const uploadTask = uploadBytesResumable(storageRef, file?.file);

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
            if (post && currentUser) {
              const createdAt = Timestamp.now();
              addDoc(postsRef, {
                author: currentUser.uid,
                description: file.description,
                link,
                createdAt,
                likes: 0,
                shares: 0,
                comments: [],
              }).then(async (d) =>
                updateDoc(userRef, { posts: arrayUnion(d.id) })
              );
            }
            setProgress(0);
            return url;
          });
        } catch (err) {
          return setError(err);
        }
      }
    );
  };

  return { progress, error, url, uploadFile, uploadState };
};
export default useStorage;
