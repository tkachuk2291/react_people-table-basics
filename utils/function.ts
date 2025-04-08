
const API =  ' https://mate-academy.github.io/react_people-table/api/people.json'

export const getAllUsers = fetch(API)
  .then((response)=> response.json())

