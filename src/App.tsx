import { Button } from '@material-ui/core'
import { useDialog } from '@/hooks'
import { Scoreboard } from '@/components'
import { useEffect, useState } from 'react'
import styles from './App.module.css'
function App() {
  const scoreboardModal = useDialog()
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)
    return () => {
      timer && clearInterval(timer)
    }
  }, [])
  return (
    <div className={styles.root}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => scoreboardModal.open()}
      >
        open
      </Button>
      <div>{count}</div>
      <Scoreboard
        open={scoreboardModal.isOpen}
        onRequestClose={scoreboardModal.close}
      />
    </div>
  )
}

export default App
