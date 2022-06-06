import { useState } from 'react'
import styled from 'styled-components'
import headerIcon from '../images/acc-login.png'
import { useNavigate } from 'react-router-dom'

import Popover from '@mui/material/Popover'
import Text from '../ui-kit/Text'
import { useAuth } from '../sg-context/AuthContext'

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const PopoverContent = styled.div`
  width: 200px;
  max-height: 500px;
  height: auto;
  border-radius: 10px;
  font-size: 12px;
  font-family: LexendDeca;
  color: #000000;
`
const SignOutButtonWrapper = styled.div`
  padding: 15px;
  border-radius: 2px;
  background-color: #fff;
  width: 100%;
  display: flex;
  &:hover {
    background: #eff1ff;
    cursor: pointer;
  }
`

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate();
  const { currentUser, logout} = useAuth()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = () => {
    logout().then(function() {
      navigate('/')
    }).catch(function(error) {
      // An error happened.
    });
  }

  const signOutFailure = () => {
    alert('Failed to Logout')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <img src={headerIcon} alt="Header Icon" width="29" height="29" />
        <Text
          size={1}
          weight={400}
          family="LexendDeca"
          padding="0px 10px 0px 10px"
        >
          {currentUser?.email}
        </Text>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
        <SignOutButtonWrapper
                  onClick={(e) => signOut()}
                >
                  <Text size={0.8} weight={400} family="LexendDeca">
                    Logout
                  </Text>
                </SignOutButtonWrapper>
        </PopoverContent>
      </Popover>
    </div>
  )
}
