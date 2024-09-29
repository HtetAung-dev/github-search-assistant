import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_ISSUES } from '../services/apolloService'; // You need to define this query
import { useParams } from 'react-router-dom';
import Pagination from '../components/PaginationComponent';

const Repository: React.FC = () => {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_ISSUES, {
    variables: { owner: username, name: repoName, first: pageSize, after: endCursor },
  });
  console.log(data)

  useEffect(() => {
    if (page > 1 && endCursor) {
      fetchMore({
        variables: { after: endCursor },
      });
    }
    
  }, [page, endCursor, fetchMore]);

  if (loading) return <p>Loading Issues...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { issues } = data.repository;
  const { pageInfo } = issues;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (pageInfo.hasNextPage) {
      setEndCursor(pageInfo.endCursor);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Issues for {issues.totalCount}</h2>
      <ul>
        {issues.nodes.map((issue: any) => (
          <li key={issue.id} className="mb-4">
            <a href={issue.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {issue.title} (#{issue.number})
            </a>
            <p>{issue.body.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(issues.totalCount / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Repository;
