const SuccessToast = ({ toastType }) => {
  return (
    <div className='w-full max-w-xs absolute z-10 flex flex-col items-center justify-center space-y-5 rounded-lg bg-[#222222] opacity-90 py-10'>
      <span className='text-xl text-white'>
        {toastType === 'register' && 'Registration Complete!'}
        {toastType === 'login' && 'Login Complete!'}
      </span>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-400 motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      ></div>
    </div>
  )
}

export default SuccessToast
