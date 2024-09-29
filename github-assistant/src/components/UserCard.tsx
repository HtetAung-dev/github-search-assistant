// src/components/UserCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../interfaces';

interface UserCardProps {
  user: IUser,
  onSelectUser: (username: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelectUser }) => {
  return (
    <div className='flex flex-col text-center justify-center items-center border rounded-lg shadow-lg shadow-gray-300 w-[120px] h-[150px]' style={{ textAlign: 'center' }} onClick={()=> onSelectUser(user.login)}>
      <img src={user.avatarUrl} alt={user.login} className='w-[100px] h-[100px] rounded-lg'/>
      <Link to={`/user/${user.login}`} className='mt-1 block font-semibold'>
        {user.login}
      </Link>
    </div>
  );
};

export default UserCard;
