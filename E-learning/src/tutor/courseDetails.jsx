import React from 'react'


function CourseDetails() {
   
  return (
    <div>
      course details
      <form action="">
      <label className='flex flex-col'>
        Course Name:
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  required/>
      </label>
      <label className='flex flex-col'>
        Description:
        <textarea className="textarea textarea-bordered" placeholder="Bio" required></textarea>
      </label>
      <label className='flex flex-col'>
        Duration:
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
      </label>
      <label className='flex flex-col'>
       Price:
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
      </label>
      <button class="btn">Create course</button>
      </form>
    </div>
  )
}

export default CourseDetails
