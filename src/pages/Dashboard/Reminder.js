import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import ReminderDataService from "./Reminder.service";

const Reminder = ({ id, setReminderId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const [status, setStatus] = useState(false);
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || description === "" || reminderDate === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newReminder = {
      title,
      description,
      reminderDate,
      status: false,
    };
    console.log(newReminder);

    try {
      if (id !== undefined && id !== "") {
        await ReminderDataService.updateReminder(id, newReminder);
        setReminderId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await ReminderDataService.addReminder(newReminder);
        setMessage({ error: false, msg: "New Reminder added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setDescription("");
    setReminderDate("");
  };
  const docSnaps = ReminderDataService.getAllReminder();
  console.log(
    "🚀 ~ file: Reminder.js ~ line 47 ~ Reminder ~ docSnaps",
    docSnaps
  );
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ReminderDataService.getReminder(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setDescription(docSnap.data().description);
      setReminderDate(docSnap.data().reminderDate);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box container">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="reminderTitle">
            <InputGroup>
              <InputGroup.Text id="reminderTitle">Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reminderDescription">
            <InputGroup>
              <InputGroup.Text id="reminderDescription">
                Description
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="reminderData">
            <InputGroup>
              <InputGroup.Text id="reminderData">Reminder Date</InputGroup.Text>
              <Form.Control
                type="date"
                placeholder="Reminder Date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {/* <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup> */}
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" className="text-white+">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Reminder;
