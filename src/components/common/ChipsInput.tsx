import {
  Chip,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';

interface ExperienceChipsInputProps {
  name: string;
  maxChips?: number;
  defaultChips?: string[];
  register: any;
  setValue: any;
}

const ChipsInput: React.FC<ExperienceChipsInputProps> = ({
  name,
  maxChips = 3,
  defaultChips = [],
  register,
  setValue,
}) => {
  const [chips, setChips] = useState<string[]>(defaultChips);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    register(name);
    setValue(name, chips);
  }, [chips, name, register, setValue]);

  const handleChip = () => {
    if (inputRef.current && chips.length < maxChips) {
      const newChip = inputRef.current.value;
      if (!_.isEmpty(newChip)) {
        const updated = [...chips, newChip];
        setChips(updated);
        inputRef.current.value = '';
      }
    }
  };

  const handleDelete = (index: number) => {
    const updated = chips.filter((_, i) => i !== index);
    setChips(updated);
    setValue(name, updated);
  };

  return (
    <>
      <FormGroup>
        <FormControl variant="outlined" fullWidth>
          <Input
            disableUnderline
            inputRef={inputRef}
            type="text"
            placeholder={`${_.capitalize(name)} (Only ${maxChips})`}
            className="form-control alder-form-control"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleChip}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </FormGroup>
      <div className="mt-2">
        {chips?.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            className="mx-2 rounded-xl"
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ChipsInput;
