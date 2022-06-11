import styled from 'styled-components/macro'

type StatusDotProps = {
    available: 'available' | 'unavailable'
}

export  const Dot = styled.div<StatusDotProps>`
  height: 20px;
  width: 20px;
  background-image: ${(props) => {
        /* Case1 : no data from merchant */
        if (props.available === 'available') {
            return 'linear-gradient(315deg, #a4e0c6 0%, #03a05d 74%)'
        }  else {
            /* Case3 : received data from merchant and verified */
            return 'linear-gradient(315deg, #e6b0b0 0%, red 74%)'
        }
    }};
  border-radius: 50%;
  display: inline-block;
`