import styled from 'styled-components'
import UserMenu from '../ui-kit/UserMenu'


const HeaderWrapper = styled.div`
  padding: 16px;
  justify-content: flex-end;
  display: flex;
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
`

export default function AccountHeader() {
  return (
    <HeaderWrapper>
      <UserMenu />
    </HeaderWrapper>
  )
}
