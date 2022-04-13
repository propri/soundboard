import { useState, useRef, useEffect } from 'react'
import {
  Button,
  Card,
  Stack,
  Typography,
} from '@mui/material'
import {
  Pause,
  PlayArrow as Play,
  RestartAlt as Reset,
  KeyboardDoubleArrowDown as FadeOut,
  Stop,
} from '@mui/icons-material'

export default function Player({
  volume,
  src,
  name,
}: { 
  volume: number,
  src: string,
  name: string,
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [canPlay, setCanPlay] = useState<boolean>(false)
  const [localVolume, setLocalVolume] = useState<number>(volume)
  const [useGlobalVolume, setUserGlobalVolume] = useState<boolean>(true)

  useEffect(() => {
    if (useGlobalVolume) {
      setLocalVolume(volume)
    }
  }, [useGlobalVolume, volume])

  useEffect(() => {
    if (audioEl?.current?.volume) {
      audioEl.current.volume = localVolume
    }
  }, [localVolume])

  const audioEl = useRef<HTMLAudioElement>(new Audio(src))
  //audioEl.current = new Audio('/music/ave_maria.ogg')
  audioEl?.current?.addEventListener('canplay', () => {setCanPlay(true)})
  audioEl?.current?.addEventListener('ended', () => {setIsPlaying(false)})

  const handleClick = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audioEl?.current?.pause()
    } else {
      setIsPlaying(true)
      audioEl?.current?.play()
    }
  }

  const stop = () => {
    audioEl?.current?.pause()
    if (audioEl.current) {
      audioEl.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  const fade = () => {
    const iv = setInterval(() => {
    console.log(localVolume)
      setLocalVolume(Math.max(0, localVolume - 0.05))
      if (localVolume === 0) {
        clearInterval(iv)
        stop()
        setLocalVolume(volume)
      }
    }, 50)
  }

  return (
    <Card sx={{ margin: '1em', padding: '1em' }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={!canPlay}
        >
        {isPlaying ? (
            <Pause />
          ) : (
            <Play />
          )}
        </Button>
        <Button
          variant="contained"
          onClick={stop}
          disabled={!canPlay}
        >
          <Stop />
        </Button>
        {/*
        <Button
          variant="contained"
          onClick={() => {}}
        >
          <Reset />
        </Button>
        <Button
          variant="contained"
          onClick={fade}
          title="Fade Out"
        >
          <FadeOut />
        </Button>
        */}
      <Typography>{name}</Typography>
      </Stack>
    </Card>
  )
}
