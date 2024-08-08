'use client'
import { useEffect, useState } from 'react'

interface Props {
  position?: string | null
  type?: string | null
  value: string | any
}

import { toast } from 'sonner'

import { Toaster } from './ui/sonner'

const Message = ({ value = 'Internal Server Error!', type = 'message', position = 'top-right' }: Props) => {
  const [alert, setAlert] = useState(true)

  useEffect(() => {
    toast[type](value, {
      // description: DateTime().format('ddd D MMM YYYY HH:mm:ss'),
      position: position,
      action: {
        label: 'Close',
        onClick: () => { },
      },
    })

    const timeId = setTimeout(() => {
      setAlert(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
    // eslint-disable-next-line
  }, [alert])

  return (
    <>
      {alert && (
        <div>
          <Toaster />
        </div>
      )}
    </>
  )
}

export default Message
