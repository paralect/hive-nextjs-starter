'use client'
import LoadingIcons from 'react-loading-icons'

interface Props {
  height?: string
  stroke?: string
}

const Spinner = (props: Props) => {
  const { height = '3em', stroke = '#41e1ca' } = props
  return (
    <div className='flex justify-center text-center'>
      <div>
        <LoadingIcons.ThreeDots
          stroke={stroke}
          height={height}
          fill='transparent'
        />
        <p className='text-primary-foreground'>Loading...</p>
      </div>
    </div>
  )
}

export default Spinner
