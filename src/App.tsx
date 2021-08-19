import { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useDialog } from '@/hooks'
import { Scoreboard } from '@/components'

function App() {
  const scoreboardModal = useDialog()
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => scoreboardModal.open()}
      >
        openddd
      </Button>
      <Scoreboard
        open={scoreboardModal.isOpen}
        onRequestClose={scoreboardModal.close}
      />
    </div>
  )
}

export default App
