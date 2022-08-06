import fs from "fs";

type Person = {
  id: string;
  name: string;
};

const path = "db.json";

export default {
  getPeople(): Person[] {
    const people = JSON.parse(fs.readFileSync(path).toString());

    return people;
  },

  getPerson(id: string): Person | undefined {
    const people = this.getPeople();
    const person = people.find((person) => person.id === id);

    return person;
  },

  async savePerson(id: string, name: string) {
    await new Promise((res) => setTimeout(res, 500));
    const people = this.getPeople();
    const person = people.find((person) => person.id === id)!;

    person.name = name;

    fs.writeFileSync(path, JSON.stringify(people, null, 2));
  },
};
