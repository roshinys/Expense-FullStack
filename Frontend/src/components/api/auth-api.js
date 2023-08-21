export const verifyEmail = async (token) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_APIKEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application-json",
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
  } catch (err) {
    alert(err);
  }
};

export const emailVerified = async (idToken) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_APIKEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error checking email verification");
    }
    const data = await response.json();
    const user = data.users && data.users.length > 0 ? data.users[0] : null;
    if (user && user.emailVerified) {
      return true;
    } else if (user && !user.emailVerified) {
      return false;
    } else {
      throw new Error("Something went wrong on our side");
    }
  } catch (err) {
    alert(err);
  }
};
