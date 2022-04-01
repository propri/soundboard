import { useState } from 'react';
import {
  Card,
  Grid,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import {
  VolumeUp,
  VolumeDown,
} from '@mui/icons-material'
import Player from './components/Player'

import fingariel from './fingariel.json'
import miau from './miau.json'

function App() {
  const [volume, setVolume] = useState<number>(100)
  const [tab, setTab] = useState<number>(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const boardSounds = [
    {
      name: "Fingariel",
      sounds: fingariel,
    },
    {
      name: "Rant",
      sounds: miau,
    },
  ]

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
      <Grid item xs={12}>
        <Tabs value={tab} onChange={handleTabChange}>
          {boardSounds.map(({ name }) => (
            <Tab label={name} key={name} />
          ))}
        </Tabs>
      </Grid>
      {boardSounds.map(({ name, sounds }, idx) => {
        return sounds.map((sound) => (
          <Grid item xs={4} key={sound.file} hidden={tab !== idx}>
            <Player
              volume={volume / 100}
              src={sound.file}
              name={sound.description}
            />
          </Grid>
        ))
      })}
    </Grid>
  )
}

export default App;
