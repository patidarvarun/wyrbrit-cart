import React, { useEffect } from "react";
import SizeComponent from "./reuseComponent/sizeComponent";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase/ firebaseConfig";

const dbInstance = collection(database, "category_unit");

function inputForm() {
  const getNotes = async () => {
    const data = await getDocs(dbInstance);
    const getData = data.docs.map((doc) => doc.data());
    console.log("@@@@@@@@@@@@", getData);
  };
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <SizeComponent
        label1="Jacket"
        lebel2="Trouser"
        name1="Chest"
        name2="Collar Chart"
      />
    </div>
  );
}

export default inputForm;
