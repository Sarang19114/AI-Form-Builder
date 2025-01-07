
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

const Dashboard = () => {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex  justify-center">
    <div className='p-10'>
        <h2 className='font-bold text-3xl flex items-center justify-between'>
            Dashboard
            <CreateForm />
        </h2>
        <FormList />
    </div>
    </div>
  )
}

export default Dashboard