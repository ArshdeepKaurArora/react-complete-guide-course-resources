import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

const initialState = {
  errors: null,
}

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext);

  async function handleAction(prevState, formData) {

    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');
  
    let errors = [];
  
    if (!userName.trim()) {
      errors.push('Please enter your name');
    }
    if (title.trim().length < 5) {
      errors.push('Please enter a title with at least 5 characters');
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Please enter your opinion between 10 and 300 characters');
    }
  
    if (errors.length > 0) {
      return {
        errors,
        formdata: {
          userName,
          title,
          body,
        }
      }
    }
  
    const enteredOpinionData = {userName, title, body}
  
    await addOpinion(enteredOpinionData)
  
    return {
      errors: null
    }
  }

  const [formState, formAction] = useActionState(handleAction, initialState)
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.formdata?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.formdata?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.formdata?.body}></textarea>
        </p>

        {formState.errors && <ul className="errors">
          {formState.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>}

        <Submit/>
      </form>
    </div>
  );
}
