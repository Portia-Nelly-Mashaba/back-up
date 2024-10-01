import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';



const AdminOnlyRoute = ({children}) => {
   const userEmail = useSelector(selectEmail)
if (userEmail === 'test@gmail.com'){
   return children
}
return null
}

// const AdminOnlyRoute = ({children}) => {
//     const userEmail = useSelector(selectEmail)
//  if (userEmail === 'test@gmail.com'){
//     return children
//  }
//  return (
//    <section>
//       <div className='container'>
//          <h2 className='text-[20px]'>Permission Denied.</h2>
//          <p>This page can only be viewed by Admin only</p>
//          <br/>
//          <Link to='/book'>
//             <button className='btn btn-sm btn-primary mx-auto rounded'>&larr; Back to Home</button>
//          </Link>
         
//       </div>
//    </section>
//  )
// }

// export const AdminOnlyLink = ({children}) => {
//    const userEmail = useSelector(selectEmail)
// if (userEmail === 'test@gmail.com'){
//    return children
// }
// return null
// }

export default AdminOnlyRoute
