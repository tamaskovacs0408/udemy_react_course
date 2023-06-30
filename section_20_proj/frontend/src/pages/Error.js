import { useRouteError } from "react-router-dom"
import PageContent from "../components/PageContent"

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    // Don't have to use the JSON.parse() method, because using the json() method in the Events.js
    message = error?.data?.message;
  }

  if (error.status === 404) {
    title = "Not found"
    message = "Couldn't find resource or page.";
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  )
}

export default ErrorPage