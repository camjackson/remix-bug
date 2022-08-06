# Remix bug

Demonstrating a bug, or at the very least, a gotcha, in remix.

## Running it

```sh
git clone git@github.com:camjackson/remix-bug.git
cd remix-bug
npm i
npm run dev
```

## The app

It's a simple list of people, with a form to update the name of each one.

The routes are:

- `/` : Just shows a link to the people list
  - `/people` : Shows the list of people, with an `<Outlet />`
    - `/people/$personId` : Shows a form to edit the given person, alongside the list

The form has no submit button. Instead it uses `useSubmit` to auto-save on every blur event.

The 'database' is just a local JSON file for simplicity.

## The bug / gotcha

The following interaction works just fine

1. Select a person
2. Click into the text input and edit the name
3. Blur out of the input by clicking a **_blank spot on the page_**
4. UI behaves correctly!
   1. ✅ In the form: name updates
   2. ✅ In the list: name updates
5. In the console:
   1. ✅ action has run
   2. ✅ loader has run for the person component
   3. ✅ loader has run for the people component

The following interaction does **not** work:

1. Select a person
2. Click into the text input and edit the name
3. Blur out of the input by clicking a **_different person in the list_**
4. UI bugs out!
   1. ✅ In the form: name changes to the newly selected person
   2. ❌ In the list: name does not update at all
5. In the console:
   1. ✅ action has run
   2. ✅ loader has run for the person component
   3. ❌ loader has **not** run for the people component

## What causes it?

It appears that if a remix `<Form>` triggers an action, but unmounts before
the action finishes, then page's loaders are not refreshed as they should be. To
make the bug reproduce more reliably, there is an artificial delay in the DB
save function. If you take this out, the bug only occurs some of the time.

## Bug video for the time-poor

[bug.webm](https://user-images.githubusercontent.com/1930451/183237729-9a84b88f-8e0d-4496-9e8d-b1ed0daaadb9.webm)

