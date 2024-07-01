'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import useAuthorization from '@/hooks/useAuthorization'
import useApi from '@/hooks/useApi'
import { useRouter } from 'next/navigation'
import Message from '@/components/Message'
import FormView from '@/components/FormView'
import Spinner from '@/components/Spinner'
import type { User as IUser } from '@prisma/client'
import RTable from '@/components/RTable'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import CustomFormField, { MultiSelect } from '@/components/ui/CustomForm'
import { TopLoadingBar } from '@/components/TopLoadingBar'
import { columns } from './columns'
import useDataStore from '@/zustand/dataStore'

const FormSchema = z
  .object({
    name: z.string().refine((value) => value !== '', {
      message: 'Name is required',
    }),
    email: z
      .string()
      .email()
      .refine((value) => value !== '', {
        message: 'Email is required',
      }),
    roleId: z.string().refine((value) => value !== '', {
      message: 'Role is required',
    }),
    confirmed: z.boolean(),
    blocked: z.boolean(),
    password: z.string().refine((val) => val.length === 0 || val.length > 6, {
      message: "Password can't be less than 6 characters",
    }),
    confirmPassword: z
      .string()
      .refine((val) => val.length === 0 || val.length > 6, {
        message: "Confirm password can't be less than 6 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  })

const Page = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [id, setId] = useState<string | null>(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const path = useAuthorization()
  const router = useRouter()

  useEffect(() => {
    if (path) {
      router.push(path)
    }
  }, [path, router])

  const { dialogOpen, setDialogOpen } = useDataStore((state) => state)

  const getApi = useApi({
    key: ['users'],
    method: 'GET',
    url: `users?page=${page}&q=${q}&limit=${limit}`,
  })?.get

  const postApi = useApi({
    key: ['users'],
    method: 'POST',
    url: `users`,
  })?.post

  const updateApi = useApi({
    key: ['users'],
    method: 'PUT',
    url: `users`,
  })?.put

  const deleteApi = useApi({
    key: ['users'],
    method: 'DELETE',
    url: `users`,
  })?.deleteObj

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      roleId: '',
      password: '',
      confirmPassword: '',
      confirmed: false,
      blocked: false,
    },
  })

  useEffect(() => {
    if (postApi?.isSuccess || updateApi?.isSuccess || deleteApi?.isSuccess) {
      getApi?.refetch()
      setDialogOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postApi?.isSuccess, updateApi?.isSuccess, deleteApi?.isSuccess])

  useEffect(() => {
    getApi?.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    getApi?.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  useEffect(() => {
    if (!q) getApi?.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const searchHandler = (e: FormEvent) => {
    e.preventDefault()
    getApi?.refetch()
    setPage(1)
  }

  const editHandler = (item: IUser & { role: { id: string } }) => {
    setId(item.id!)
    setEdit(true)
    form.setValue('blocked', Boolean(item?.blocked))
    form.setValue('confirmed', Boolean(item?.confirmed))
    form.setValue('name', item?.name)
    form.setValue('email', item?.email)
    form.setValue('roleId', item?.role?.id!)
  }

  const deleteHandler = (id: any) => deleteApi?.mutateAsync(id)

  const label = 'User'
  const modal = 'user'

  useEffect(() => {
    if (!dialogOpen) {
      form.reset()
      setEdit(false)
      setId(null)
    }
    // eslint-disable-next-line
  }, [dialogOpen])

  const formFields = (
    <Form {...form}>
      <CustomFormField
        form={form}
        name='name'
        label='Name'
        placeholder='Name'
        type='text'
      />
      <CustomFormField
        form={form}
        name='email'
        label='Email'
        placeholder='Email'
        type='email'
      />
      <CustomFormField
        form={form}
        name='roleId'
        label='Role'
        placeholder='Role'
        fieldType='command'
        data={[]}
        key='roles'
        url='roles?page=1&limit=10'
      />
      <CustomFormField
        form={form}
        name='password'
        label='Password'
        placeholder='Password'
        type='password'
      />
      <CustomFormField
        form={form}
        name='confirmPassword'
        label='Confirm Password'
        placeholder='Confirm password'
        type='password'
      />
      <CustomFormField
        form={form}
        name='confirmed'
        label='Confirmed'
        placeholder='Confirmed'
        fieldType='switch'
      />
      <CustomFormField
        form={form}
        name='blocked'
        label='Blocked'
        placeholder='Blocked'
        fieldType='switch'
      />
    </Form>
  )

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    edit
      ? updateApi?.mutateAsync({
          id: id,
          ...values,
        })
      : postApi?.mutateAsync(values)
  }

  return (
    <>
      {deleteApi?.isSuccess && <Message value={deleteApi?.data?.message} />}
      {deleteApi?.isError && <Message value={deleteApi?.error} />}
      {updateApi?.isSuccess && <Message value={updateApi?.data?.message} />}
      {updateApi?.isError && <Message value={updateApi?.error} />}
      {postApi?.isSuccess && <Message value={postApi?.data?.message} />}
      {postApi?.isError && <Message value={postApi?.error} />}

      <TopLoadingBar isFetching={getApi?.isFetching || getApi?.isPending} />

      <FormView
        form={formFields}
        loading={updateApi?.isPending || postApi?.isPending}
        handleSubmit={form.handleSubmit}
        submitHandler={onSubmit}
        label={label}
        edit={edit}
      />

      {getApi?.isPending ? (
        <Spinner />
      ) : getApi?.isError ? (
        <Message value={getApi?.error} />
      ) : (
        <div className='overflow-x-auto bg-white p-3 mt-2'>
          <RTable
            data={getApi?.data}
            columns={columns({
              editHandler,
              isPending: deleteApi?.isPending || false,
              deleteHandler,
            })}
            setPage={setPage}
            setLimit={setLimit}
            limit={limit}
            q={q}
            setQ={setQ}
            searchHandler={searchHandler}
            modal={modal}
            caption='Users List'
          />
        </div>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(Page), { ssr: false })
