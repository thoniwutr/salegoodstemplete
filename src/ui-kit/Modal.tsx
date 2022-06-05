import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  onClick: () => void
}

export const Modal = styled.div`
  position: fixed;
  z-index: 1300;
  inset: 0px;
`

export const ModalBackground = styled.div`
  z-index: -1;
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`

export const ModalCard = styled.div<{ height?: string }>`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
  background-color: #fff;
  width: 564px;
  ${({ height }) => (height ? `height: ${height};` : `height: 625px;`)}
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Assistant;
  font-size: 14px;
`

export const ModalCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
  border: none;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: LexendDeca;
  font-size: 20px;
`

export const ModalCardBody = styled.div`
  overflow: auto;
  flex-grow: 1;
`

export const ModalCardFooter = styled.div`
  border-top: 1px solid #dbdbdb;
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 24px 20px;
  position: relative;
`

export function ModalCloseButton(props: Props) {
  return (
    <IconButton
    style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      cursor: 'pointer',
    }}
    aria-label="delete"
    onClick={props.onClick}
  >
    <ClearIcon style={{ color: '#6c6c6c' }} />
  </IconButton>

  )
}
