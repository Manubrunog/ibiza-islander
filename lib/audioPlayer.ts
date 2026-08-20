let audio: HTMLAudioElement | null = null
let listeners: (() => void)[] = []

const notify = () => {
  listeners.forEach((listener) => listener())
}

export const AudioPlayer = {
  play: (url: string) => {
    if (!audio) {
      audio = new Audio(url)
      audio.preload = "auto"

      audio.addEventListener("timeupdate", notify)
      audio.addEventListener("loadedmetadata", notify)
      audio.addEventListener("ended", notify)
      audio.addEventListener("play", notify)
      audio.addEventListener("pause", notify)
    } else {
      if (audio.src !== new URL(url, window.location.href).href) {
        audio.src = url
      }
    }

    audio.play().catch((e) => {
      console.log("play blocked", e)
    })

    notify()
  },

  pause: () => {
    audio?.pause()
    notify()
  },

  isPlaying: () => {
    return audio ? !audio.paused : false
  },

  getCurrentTime: () => {
    return audio?.currentTime || 0
  },

  getDuration: () => {
    return audio?.duration || 0
  },

  seek: (time: number) => {
    if (audio) {
      audio.currentTime = time
      notify()
    }
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter((item) => item !== listener)
    }
  },
}