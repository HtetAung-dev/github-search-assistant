import React, { useState } from 'react';
import UserSearch from '../components/UserSearch';
import RepositoryList from '../components/RepositoryList';

const HomePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div>
      <UserSearch setSelectedUser={setSelectedUser} />
      {selectedUser && <RepositoryList username={selectedUser} />}
    </div>
  );
};

export default HomePage;
