import React from 'react'
import Meta from '@/components/Meta'

export const metadata = {
  ...Meta({
    title: 'Signup',
  }),
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
