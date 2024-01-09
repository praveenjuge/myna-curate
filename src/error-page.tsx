import { useRouteError } from "react-router-dom";

interface ErrorObject {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorObject;
  console.error(error);

  return (
    <section
      id="error-page"
      className="flex p-6 flex-col justify-center items-center h-screen gap-4 max-w-sm mx-auto text-center"
    >
      <p className="text-lg font-bold">{error.statusText || error.message}</p>
      <h1 className="text-slate-600">
        There seems to be a error here. We apologize for the inconvenience.
      </h1>
      <p className="text-slate-600">
        Please send a message to @praveenjuge on Twitter for a quick fix.
      </p>
    </section>
  );
}
