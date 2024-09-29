import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_REPOSITORIES } from '../services/apolloService';
import Pagination from './PaginationComponent';
import { Link } from 'react-router-dom';

const RepositoryList: React.FC<{ username: string }> = ({ username }) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [endCursor, setEndCursor] = useState<string | null>(null); // For pagination

  // Query with cursor pagination
  const { data, loading, error, fetchMore } = useQuery(GET_USER_REPOSITORIES, {
    variables: { username, first: pageSize, after: endCursor },
  });

  useEffect(() => {
    if (page > 1 && endCursor) {
      fetchMore({
        variables: {
          after: endCursor, // Pass the cursor to fetch next set of results
        },
      });
    }
  }, [page, endCursor, fetchMore]);

  if (loading) return <p>Loading Repositories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { repositories } = data.user;
  const { pageInfo } = repositories;

  // When next page is clicked, set the endCursor for the next page
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (pageInfo.hasNextPage) {
      setEndCursor(pageInfo.endCursor); // Update the cursor for fetching more data
    }
  };

  return (
    <div className='container mx-auto p-6 justify-center items-center '>
      <h2 className='text-2xl font-bold mb-4'>Repositories <span className='rounded-2xl bg-yellow-300 p-2 text-sm'>{repositories.totalCount}</span></h2>
      <div className='w-100 p-2'>
        {repositories.nodes.map((repo: any) => (
          <div className='flex flex-row' key={repo.name}>
            <Link to={`/${username}/repository/${repo.name}`} className="flex-1 text-xl font-bold hover:underline">
              {repo.name}
            </Link>
              
              <p>⭐ {repo.stargazers.totalCount} stars / 👁️{repo.watchers.totalCount} watching</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(repositories.totalCount / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RepositoryList;
