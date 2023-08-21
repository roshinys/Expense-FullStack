import React, { useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";
import styles from "./UserEdit.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserEdit() {
  const token = useSelector((state) => state.auth.token);
  const nameRef = useRef("");
  const profileRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetail() {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_APIKEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application-json",
          },
        }
      );
      if (!response.ok) {
        console.log("failed to fetch user detail");
        return;
      }
      const data = await response.json();
      if (data.users && data.users.length > 0) {
        nameRef.current.value = data.users[0].displayName
          ? data.users[0].displayName
          : "";
        profileRef.current.value = data.users[0].photoUrl
          ? data.users[0].photoUrl
          : "";
      }
    }
    getUserDetail();
  });

  const cancelClickHandler = () => {
    nameRef.current.value = "";
    profileRef.current.value = "";
    navigate(-1);
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const imageUrl = profileRef.current.value;
    const name = nameRef.current.value;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_APIKEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          photoUrl: imageUrl,
          displayName: name,
        }),
        headers: {
          "Content-Type": "application-json",
        },
      }
    );
    if (!response.ok) {
      alert("Failed to update user details");
      return;
    }
    const data = await response.json();
    console.log(data);
    alert("Successfully updated user details");
  };

  return (
    <div className={styles.contactContainer}>
      <h3>Contact Details</h3>
      <button className={styles.cancelButton} onClick={cancelClickHandler}>
        Cancel
      </button>
      <form onSubmit={updateUserHandler} className={styles.formUpdate}>
        <div className={styles.formdiv}>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" placeholder="Full Name" ref={nameRef} />
        </div>
        <div className={styles.formdiv}>
          <label htmlFor="profilePic">Profile Picture Url:</label>
          <input
            type="text"
            id="profilePic"
            placeholder="Profile Picture Url"
            ref={profileRef}
          />
        </div>
        <Button type="submit">"Update Details"</Button>
      </form>
    </div>
  );
}

export default UserEdit;
