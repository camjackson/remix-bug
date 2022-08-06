import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import db from "~/db/db.server";

export const loader = async () => {
  console.log("in people loader");
  return json({ people: db.getPeople() });
};

export default function People() {
  const { people } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>People</h1>
      <ol>
        {people.map((person) => (
          <li key={person.id}>
            <Link to={`/people/${person.id}`}>
              {person.name || "(No name)"}
            </Link>
          </li>
        ))}
      </ol>
      <Outlet />
    </div>
  );
}
