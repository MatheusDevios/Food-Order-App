import React, { useEffect } from "react";
import useFetch from "../../hooks/use-fetch";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import UserDetails from "./UserDetails";
import classes from "./UserInfo.module.css";

const url = process.env.REACT_APP_FIREBASE_ORDER;

const UserInfo = () => {
  const { data, isLoading, error, sendRequest } = useFetch();
  const authUserId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    sendRequest({
      url: url,
    });
  }, [sendRequest]);

  let content = "";
  let order = [];
  let loadedUsers = [];

  if (error) {
    content = <p>Found no Meals, an error has occured.</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    // console.log("data:", data);
    for (const keyData in data) {
      loadedUsers.push({
        id: data[keyData].userId,
        name: data[keyData].user.name,
        city: data[keyData].user.city,
        street: data[keyData].user.street,
        postalCode: data[keyData].user.postalCode,
        items: data[keyData].orderedItems,
      });
    }
    // console.log("error", error);
    // console.log("data", loadedUsers);
    // console.log("isLoading", isLoading);
    const existingItem = loadedUsers.filter((order) => order.id === authUserId);
    // console.log(existingItem);
    if (existingItem) {
      order = (
        <>
          {existingItem.map((item, index) => (
            <UserDetails
              key={index}
              name={item.name}
              city={item.city}
              street={item.street}
              postalCode={item.postalCode}
              items={item.items}
            />
          ))}
        </>
      );
    }
  }

  return (
    <section className={classes.users}>
      <Card>
        <ul>
          {content}
          {order}
        </ul>
      </Card>
    </section>
  );
};

export default UserInfo;
