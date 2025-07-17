import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { deleteEvent, fetchEvent, queryClient } from "../util/http.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isError, isPending, error } = useQuery({
    queryFn: () => fetchEvent({ id }),
    queryKey: ["events", { id: id }],
  });

  const {
    mutate,
    isPending: isDeletionPending,
    isError: isDeletionError,
    error: deletionError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate("/events");
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
    },
  });

  const handleDelete = () => {
    mutate({ id });
  };

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content">
        <p>Fetching yours event...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content">
        <ErrorBlock title="Error occurred!" message={error.info?.message} />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        {isDeleting && (
          <Modal>
            <h2>Delete Confirmation</h2>
            <p>
              Are you sure you want to delet this event? This is an irreversible
              process.
            </p>

            <div className="form-actions">
              {isDeletionPending && (
                <p>Deleting this event is in progress...</p>
              )}
              {!isDeletionPending && (
                <>
                  <button className="button-text" onClick={handleStopDelete}>
                    Close
                  </button>
                  <button className="button" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>
            {isDeletionError && (
              <ErrorBlock
                title={"Error in Deleting"}
                message={
                  deletionError.info?.message ||
                  "Error occurred in deleting this event"
                }
              />
            )}
          </Modal>
        )}
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
