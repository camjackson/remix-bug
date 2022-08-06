import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import type { ChangeEvent } from "react";
import db from "~/db/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  console.log("in person loader");
  return json({ person: db.getPerson(params.personId!)! });
};

export const action = async ({ request, params }: ActionArgs) => {
  console.log("in person action");
  const formData = await request.formData();

  const newName = formData.get("name") as string;

  await db.savePerson(params.personId!, newName);

  return null;
};

export default function Person() {
  const { person } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const autoSave = (e: ChangeEvent<HTMLFormElement>) => {
    submit(e.currentTarget, { replace: true });
  };

  return (
    <>
      <h2>
        Person {person.id}: {person.name}
      </h2>
      <Form key={person.id} method="post" onBlur={autoSave}>
        <label>
          Person name:
          <input type="text" name="name" defaultValue={person?.name} />
        </label>
      </Form>
    </>
  );
}
