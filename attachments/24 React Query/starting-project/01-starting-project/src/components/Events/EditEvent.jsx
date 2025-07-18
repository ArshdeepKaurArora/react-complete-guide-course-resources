import { Link, redirect, useNavigate, useParams, useSubmit, useNavigation } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useQuery } from "@tanstack/react-query";
import { editEvent, fetchEvent, queryClient } from "../util/http.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ["events", { id: id }],
    queryFn: () => fetchEvent({ id }),
    staleTime: 10000
  });

  // const {mutate} = useMutation({
  //   mutationFn: editEvent,
  //   onMutate: async( data ) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ["events", { id: id }]
  //     });
  //     const previousData = queryClient.getQueryData(["events", { id: id }]);
  //     queryClient.setQueryData(["events", { id: id }], data.formData);
  //     return {previousData}
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", { id: id }], context.previousData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({queryKey: ["events", { id: id }]});
  //   }
  // })

  function handleSubmit(formData) {
    submit(formData, {method: "PUT"});
  }

  function handleClose() {
    navigate("../");
  }

  let eventForm;

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
        {state === "submitting" ? <p>Submitting updated event....</p> : <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </>}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{eventForm}</Modal>;
}

export function loader({params}) {
  return queryClient.fetchQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: () => fetchEvent({ id: params.id }),
  })
}

export async function action({request, params}) {
  const formData = await request.formData();
  const updatedEvent = Object.fromEntries(formData);
  await editEvent({id: params.id, updatedEvent})
  await queryClient.invalidateQueries({queryKey: ['events']})
  return redirect("../")
}
