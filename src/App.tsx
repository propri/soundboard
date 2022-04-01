import { useState } from 'react';
import {
  Card,
  Grid,
  Slider,
  Stack,
  TextField,
} from '@mui/material'
import {
  VolumeUp,
  VolumeDown,
} from '@mui/icons-material'
import Player from './components/Player'

import sounds from './list.json'

function App() {
  const [volume, setVolume] = useState<number>(100)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

  return (
    <Grid container>
      <Grid item xs={12} sx={{}}>
        <Card sx={{ margin: "1em", padding: '1em' }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider value={volume} onChange={handleChange} />
            <VolumeUp />
            <TextField
              value={volume}
              onChange={(ev) => setVolume(parseInt(ev.target.value))}
              type='number'
              label='Volume'
            />
          </Stack>
        </Card>
      </Grid>
      {/*
      <Grid item xs={6}>
        <Player
          volume={volume / 100}
          src='/music/ave_maria.ogg'
          name='ave maria'
        />
      </Grid>
      <Grid item xs={6}>
        <Player
          volume={volume / 100}
          src='/music/dong.mp3'
          name='dong'
        />
      </Grid>
      */}
      {sounds.map((sound) => (
        <Grid item xs={4} key={sound.file}>
          <Player
            volume={volume / 100}
            src={sound.file}
            name={sound.description}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
