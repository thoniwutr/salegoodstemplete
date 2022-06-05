import styled from 'styled-components/'
import Box from '@mui/material/Box'
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress'

const LoadingWrapper = styled.div`
  padding: 30px;
  background-color: white;
  width: 100%;
  justify-content: center;
  display: flex;
`

export default function Loading(props : any) {
  return (
    <LoadingWrapper>
      <Box>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light' ? '#3049b6' : '#308fe8',
            animationDuration: '550ms',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={40}
          thickness={3}
          {...props}
        />
      </Box>
    </LoadingWrapper>
  )
}
