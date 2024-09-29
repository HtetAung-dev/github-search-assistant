import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE } from '../services/apolloService';

interface Props {
  repositoryId: string;
  onClose: () => void;
}

const CreateIssueForm: React.FC<Props> = ({ repositoryId, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createIssue] = useMutation(CREATE_ISSUE);

  const handleSubmit = async () => {
    try {
      await createIssue({ variables: { repositoryId, title, body } });
      alert('Issue created successfully!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <h3>Create a New Issue</h3>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Describe the issue..." 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreateIssueForm;
