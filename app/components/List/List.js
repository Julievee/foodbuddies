import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { createRef, useEffect, useState } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails.js';
import useStyles from './styles.js';

const List = ({ places }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining around you</Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value="test">
              <MenuItem value="restaurants">Restaurants</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value="test2">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref ={elRefs[i]} item key={`item-${i.id}`} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}

          </Grid>
    </div>
  );
};

export default List;
