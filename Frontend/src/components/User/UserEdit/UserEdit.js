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
      const response = await fetch(`http://localhost:8000/auth/userDetails/`, {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        console.log("failed to fetch user detail");
        return;
      }
      const data = await response.json();
      if (data?.username && data?.imgUrl) {
        nameRef.current.value = data.username;
        profileRef.current.value = data.imgUrl;
      }
    }
    getUserDetail();
  }, [token]);

  const cancelClickHandler = () => {
    nameRef.current.value = "";
    profileRef.current.value = "";
    navigate(-1);
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    console.log("update user");
    const imageUrl = profileRef.current.value;
    const name = nameRef.current.value;
    const updateDetails = async (imageUrl, name) => {
      const response = await fetch(`http://localhost:8000/auth/updateUser/`, {
        method: "PUT",
        body: JSON.stringify({
          imgUrl: imageUrl,
          username: name,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        alert("Failed to update user details");
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Successfully updated user details");
      } else {
        alert("Failed to update user details");
      }
    };
    await updateDetails(imageUrl, name);
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
        <Button type="submit">Update Details</Button>
      </form>
    </div>
  );
}

export default UserEdit;
