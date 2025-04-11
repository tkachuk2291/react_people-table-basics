import { Loader } from './Loader';
import { Person } from '../types';
import { NavLink, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { LoaderEnum } from '../types/loader';

interface PeopleTable {
  persons: Person[];
  error: string;
  loader: LoaderEnum;
}

enum Type {
  mother = 'mother',
  father = 'father',
}

enum Sex {
  man = 'm',
  women = 'f',
}

export const PeopleTable: React.FC<PeopleTable> = ({
  persons,
  error,
  loader,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const getParentLink = (
    name: string | null,
    persons: Person[],
    type: Type,
  ) => {
    const parent = persons.find(p => p.name === name);
    return parent ? (
      <NavLink
        to={`/people/${parent.slug}`}
        className={classNames(type === Type.mother ? 'has-text-danger' : '')}
      >
        {parent.name || '-'}
      </NavLink>
    ) : (
      name || '-'
    );
  };

  return (
    <div className="block">
      <div className="box table-container">
        {loader === 'loading' && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {loader === 'loaded' && !persons.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!!persons.length && (
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
                  )}>
                  <td>
                    <NavLink
                      to={`/people/${person.slug}`}
                      className={classNames(
                        person.sex === Sex.women ? 'has-text-danger' : '',
                      )}
                    >
                      {person.name}
                    </NavLink>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {getParentLink(person.motherName, persons, Type.mother)}
                  </td>
                  <td>
                    {getParentLink(person.fatherName, persons, Type.father)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
