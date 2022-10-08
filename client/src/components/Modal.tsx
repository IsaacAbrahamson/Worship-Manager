import { ReactNode, useEffect } from 'react'
import '../styles/modal.scss'

interface Props {
  show: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSave: () => void
}

export default function Modal(props: Props) {
  // Esc functionality
  const { onClose } = props
  useEffect(() => {
    function closeOnEsc(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.body.addEventListener('keydown', closeOnEsc)
    return () => {
      document.body.removeEventListener('keydown', closeOnEsc)
    }
  }, [onClose])

  if (!props.show) return null

  return (
    <div className="modal">
      <div className="modal-close" onClick={props.onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{props.title}</p>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={props.onClose}>Close</button>
          <button className="btn btn-primary" onClick={props.onSave}>Save</button>
        </div>
      </div>
    </div>
  )
}