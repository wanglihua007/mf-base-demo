import {
  SnackbarProvider,
  VariantType,
  useSnackbar,
  OptionsObject,
} from 'notistack'

export interface MessageType {
  text: string
  type: VariantType
}

let add: (notice: MessageType, options?: OptionsObject) => void

const Message = () => {
  const { enqueueSnackbar } = useSnackbar()
  add = (message: MessageType, options?: OptionsObject) => {
    enqueueSnackbar(message.text, {
      variant: message.type,
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'top',
        ...options?.anchorOrigin,
      },
      ...options,
    })
  }
  return <div />
}

export const MessageContainer = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Message />
    </SnackbarProvider>
  )
}

const addMessage =
  (type: VariantType) => (text: string, options?: OptionsObject) => {
    add({ text, type }, options)
  }

export const api = {
  info: addMessage('info'),
  success: addMessage('success'),
  warning: addMessage('warning'),
  error: addMessage('error'),
  default: addMessage('default'),
}
