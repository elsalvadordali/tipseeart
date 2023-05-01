const SuccessToast = () => {
  return (
    <div className='h-40 w-52 absolute z-10 flex flex-col items-center justify-center space-y-5 rounded-lg bg-[#222222] opacity-90'>
      <span className='text-xl text-white'>Registration Complete!</span>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-400 motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  )
}

export default SuccessToast
