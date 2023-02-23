import React, { useState } from 'react';

const CustomCell = ({value, setData, data, val }) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = event => {
    setEditValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsEditing(false);
    setData({...data, [val]: editValue})
  };

  return (
    <th>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input className='bg-dryGray text-border' type="text" value={editValue} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div onClick={handleEdit}>{value}</div>
      )}
    </th>
  );
};

export default CustomCell;