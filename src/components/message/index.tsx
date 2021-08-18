import ReactDOM from 'react-dom'
import { MessageContainer, api } from './MessageContainer'

const createDiv = () => {
  const div = document.createElement('div')
  div.className = 'message-wrapper'
  div.id = 'message-wrapper'
  document.body.append(div)
  return div
}
ReactDOM.render(
  <MessageContainer />,
  document.querySelector('#message-wrapper') ?? createDiv()
)

export default api
