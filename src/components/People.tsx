import { useEffect, useState } from 'react';
import { getAllUsers } from '../../utils/function';
import { PeopleTable } from './PeopleTable';

export const People = () => {
    const [error , setError] = useState('')
    const  [loader ,  setLoader] = useState(false)
    const [persons, setPersons] = useState([]);
  useEffect(() => {
    setLoader(true);
    getAllUsers
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

    console.log(loader)
    return (
      <>
        <h1 className="title">People Page</h1>
        <PeopleTable persons={persons} error={error} loader={loader} />
      </>
    );
};
