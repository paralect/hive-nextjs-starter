import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components'
import * as React from 'react'

interface VerifyAccountProps {
  company: string
  token: string
  clientName: string
  osName: string
  ip: string
  baseUrl?: string
}

export const VerifyAccount = ({
  company,
  token,
  clientName,
  osName,
  ip,
  baseUrl,
}: VerifyAccountProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            primary: 'green',
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Preview>Verification code</Preview>
      <Body className='bg-white'>
        <Container className='px-3 mx-auto font-sans'>
          <Heading className='text-2xl font-bold text-black my-10'>
            Verification code
          </Heading>

          <Text className='mb-4 text-gray-700 my-6'>
            Please verify your account to activate your {company} account.
          </Text>

          <Text className='text-gray-700 font-bold'>
            Click the button below to verify your email and complete account
            setup. This link will expire in 72 minutes.
          </Text>

          <a
            href={baseUrl + '/auth/verification/' + token}
            target='_blank'
            className='bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer no-underline'
          >
            Verify Your Email
          </a>

          <Text className='my-4 text-gray-700'>
            If you did not request to verify this email, you can ignore this
            message. Your account will not be activated until you click the
            verification link.
          </Text>

          <Text className='text-gray-400 mb-5 mt-3'>
            <strong className='text-gray-900 font-bold'>
              Didn&apos;t request this?
            </strong>{' '}
            <br />
            For security, this request was received from {ip} a {osName} device
            using {clientName}. If you did not request a password reset, please
            ignore this email.
          </Text>

          <Img
            height='32'
            src={`https://github.com/ahmedibra28.png`}
            width='32'
            alt="Notion's Logo"
          />

          <Text className='text-gray-400 text-xs mt-3 mb-6'>
            Thanks,
            <br />
            <strong>{company}</strong>
          </Text>

          <br />

          <Text className='text-gray-400 text-xs mt-3 mb-6'>
            If you’re having trouble with the button above, copy and paste the
            URL below into your web browser. <br />
            <a href={baseUrl + '/auth/verification/' + token}>
              {baseUrl}/auth/verification/{token}
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

export default VerifyAccount
