import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ReminderDataService from "./Reminder.service";

const ReminderList = ({ getReminderId }) => {
  const [reminder, setReminder] = useState([]);

  useEffect(() => {
    getReminder();
  }, []);

  const getReminder = async () => {
    const data = await ReminderDataService.getAllReminder();

    setReminder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await ReminderDataService.deleteReminder(id);
    getReminder();
  };

  return (
    <>
      <div className="mb-4 container">
        <Button variant="dark edit" onClick={getReminder}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm" className="container">
        <thead>
          <tr>
            <th>#</th>
            <th> Title</th>
            <th>Description</th>
            <th>Reminder Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reminder.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>{doc.reminderDate}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getReminderId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ReminderList;
