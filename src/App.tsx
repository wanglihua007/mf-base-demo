import { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useDialog } from '@/hooks'
import { Scoreboard } from '@/components'

function App() {
  const scoreboardModal = useDialog()
  useEffect(() => {
    console.log(`window.electron`, window?.electron)
  }, [])
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => scoreboardModal.open()}
      >
        open
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => scoreboardModal.close()}
      >
        close
      </Button>
      <Scoreboard
        open={scoreboardModal.isOpen}
        onRequestClose={scoreboardModal.close}
      />
    </div>
  )
}

export default App
