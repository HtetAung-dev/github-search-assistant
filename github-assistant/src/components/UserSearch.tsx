// src/components/UserSearch.tsx
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../services/apolloService';
import UserCard from './UserCard';

interface UserSearchProps {
  setSelectedUser: (username: string) => void; // Added prop for updating selected user
}

const UserSearch: React.FC<UserSearchProps> = ({ setSelectedUser }) => {
  const [query, setQuery] = useState('');
  const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS);

  const handleSearch = () => {
    searchUsers({ variables: { query } });
  };

  return (
    <div className='container p-6 mx-auto justify-center m-10 items-center'>
      {/* Search bar */}
      <div className='flex mb-2 justify-center items-center '>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔎 Search Users..."
          className='border border-black p-1 m-1'
        />
        <button className='m-1 p-1 border rounded-md bg-green-300 w-[80px] text-center justify-center font-bold hover:bg-green-600' onClick={handleSearch}>Search</button>
      </div>

      {/* Display users */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Users</h2>
        <div className='flex flex-row max-w-[1200px]'>

          {data &&
            data.search.edges.map((user: any) => (
              <UserCard
                key={user.id}
                user={user.node}
                onSelectUser={setSelectedUser} // Pass the function to update selected user
              />
            ))}
        </div>
      </div>

    </div>
  );
};

export default UserSearch;
