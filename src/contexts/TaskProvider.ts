import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { Task } from "../types";

const useTaskContext = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [pollingTime, setPollingTime] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, // Ideally should be received after validation
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Task data fetching error");
          }
        })
        .then((response) => setTasks(response))
        .catch((error) => {
          console.log(error);
        });
    };
    void fetchData();
    const interval = setInterval(() => {
      setPollingTime(Date.now());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [pollingTime]);

  return { tasks };
};

export default createContainer(useTaskContext);
