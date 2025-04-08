import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchFilter = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextField
        fullWidth
        label="Search by name or address"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  );
};

export default SearchFilter;

