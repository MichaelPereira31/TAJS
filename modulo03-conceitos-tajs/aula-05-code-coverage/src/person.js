export function mapPerson(personStr){
  const {name, age} = JSON.parse(personStr);
  const person = {
    name,
    age,
    createdAt: new Date(),
  };

  return person
}
