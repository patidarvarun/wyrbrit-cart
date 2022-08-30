import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/ firebaseConfig";
import { MainNavbar } from "../components/main-navbar";

const dbInstance = collection(database, "users");

const AccountPage = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");
  const getNotes = async () => {
    getDocs(dbInstance).then((data) => {
      setUserData(data._snapshot.docChanges);
    });
  };
  useEffect(() => {
    getNotes();
    setUser(localStorage.getItem("data"));
  }, []);
  var userDetail = user ? JSON.parse(user) : "";

  return (
    <>
      <MainNavbar />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Account Page</h1>
      <div>
        <p>Id: {userDetail && userDetail.login.user.id}</p>
        <p>Name: {userDetail && userDetail.login.user.name}</p>
        <p>FirstName: {userDetail && userDetail.login.user.firstName}</p>
        <p>TOKEN: {userDetail && userDetail.login.authToken}</p>
      </div>
      <span>
        <h1 style={{ textAlign: "center" }}>Firebase Detail</h1>
        {userData &&
          userData.map((data) => (
            <>
              <hr />
              <p>
                FirstName:{" "}
                {
                  data?.doc?.data?.value?.mapValue?.fields?.firstName
                    ?.stringValue
                }
              </p>
              <p>
                LastName:{" "}
                {
                  data?.doc?.data?.value?.mapValue?.fields?.lastName
                    ?.stringValue
                }
              </p>
              <hr />
            </>
          ))}
      </span>
    </>
  );
};

export default AccountPage;
