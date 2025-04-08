import { Loader } from './Loader';
import { Person } from '../types';
import { NavLink, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
interface PeopleTable {
  persons: Person[];
  error: string;
  loader : boolean
}

export const PeopleTable: React.FC<PeopleTable> = ({ persons, error , loader }) => {
  const { slug } = useParams<{ slug: string }>();

  const getParentLink = (name: string | null, persons: Person[]) => {
    const parent = persons.find(p => p.name === name);
    return parent ? (
      <NavLink to={`../${parent.slug}`}>{parent.name || '-'}</NavLink>
    ) : (
      name || '-'
    );
  };

  return (
    <div className="block">
      <div className="box table-container">
        {loader && (
          <Loader />
        )}

        {error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : persons.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {persons.map(person => (
                <tr
                  data-cy="person"
                  className={classNames(
                    person.slug === slug ? 'has-background-warning' : '',
                  )}
                >
                  <td>
                    <NavLink to={`../${person.slug}`}>{person.name}</NavLink>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>{getParentLink(person.motherName, persons)}</td>

                  <td>{getParentLink(person.fatherName, persons)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
