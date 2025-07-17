import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editEvent, fetchEvent, queryClient } from "../util/http.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["events", { id: id }],
    queryFn: () => fetchEvent({ id }),
  });

  const {mutate} = useMutation({
    mutationFn: editEvent,
    onMutate: async( data ) => {
      await queryClient.cancelQueries({
        queryKey: ["events", { id: id }]
      });
      const previousData = queryClient.getQueryData(["events", { id: id }]);
      queryClient.setQueryData(["events", { id: id }], data.formData);
      return {previousData}
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", { id: id }], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["events", { id: id }]});
    }
  })

  function handleSubmit(formData) {
    mutate({ id, formData })
    navigate("../")
  }

  function handleClose() {
    navigate("../");
  }

  let eventForm;

  if (isPending) {
    eventForm = <LoadingIndicator />;
  }

  if (isError) {
    eventForm = (
      <>
        <ErrorBlock
          title={"Error occurred!"}
          message={
            error.info?.message || "An error occurred in fetching the event"
          }
        />
        <Link to="../" className="button-text">
          Cancel
        </Link>
      </>
    );
  }

  if (data) {
    eventForm = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{eventForm}</Modal>;
}
