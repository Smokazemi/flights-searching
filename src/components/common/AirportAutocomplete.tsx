'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import { searchAirports } from '@/services/flight';
import { IAirport } from '@/types/IFlight';



interface AirportAutocompleteProps {
  value: IAirport | undefined;
  onChange: (value: IAirport | undefined) => void;
  placeholder: string;
  debounceMs?: number;
}

export default function AirportAutocomplete({
  value,
  onChange,
  placeholder,
  debounceMs = 300
}: AirportAutocompleteProps) {

  const [search, setSearch] = useState<string>('');
  const [options, setOptions] = useState<IAirport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelPreviousRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const fetchAirports = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    setError(null);

    cancelPreviousRequest();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const data = await searchAirports(searchTerm);

      if (abortController.signal.aborted) {
        return;
      }

      setOptions(data);
    } catch (err) {

      if (abortController.signal.aborted) {
        return;
      }

      setError('Failed to fetch airports');
      setOptions([]);
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  }, []);

  const debouncedFetchAirports = useCallback(
    debounce(fetchAirports, debounceMs),
    [debounceMs, fetchAirports]
  );

  useEffect(() => {
    return () => {
      cancelPreviousRequest();
      debouncedFetchAirports.cancel();
    };
  }, [debouncedFetchAirports]);

  const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setSearch(newInputValue);
    debouncedFetchAirports(newInputValue);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string | null) => {
    onChange(options.find(x => x.presentation.title === newValue) || undefined);
  };

  return (
    <Autocomplete
      value={value?.presentation?.title || ''}
      onChange={handleChange}
      inputValue={search}
      onInputChange={handleInputChange}
      options={options.map(x => x.presentation.title)}
      loading={loading}
      filterOptions={(x) => x}
      noOptionsText={error || (search.length < 2 ? 'Type to search' : 'No options')}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
}