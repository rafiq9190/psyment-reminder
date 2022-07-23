import React, { useState } from "react";
import Navbar from "../Frontend/component/Header/Navbar";
import Reminder from "./Reminder";
import ReminderList from "./ReminderList";
import { subscribeUser } from "../../subscription";

function Dashboard() {
  const [reminderId, setReminderId] = useState("");

  const getReminderIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setReminderId(id);
  };
  return (
    <div>
      <button onClick={subscribeUser}>Click Here</button>
      <Navbar />
      <Reminder id={reminderId} setReminderId={setReminderId} />
      <ReminderList getReminderId={getReminderIdHandler} />
    </div>
  );
}

export default Dashboard;
