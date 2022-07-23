import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function Topbar() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(dayjs().format("dddd,MMMM d YYYY , hh:mm:ss A"));
    });
  }, []);

  return (
    <header className="bg-primary p-1">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="mb-0 text-white text-center">{currentTime}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
