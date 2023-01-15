import React from "react";
import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://meetup-91c83-default-rtdb.firebaseio.com/meetups.json").then(
    (response) => {
      return response.json();
    })
    .then((data) => {
        setIsLoading(false);
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setLoadedMeetups(meetups);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
