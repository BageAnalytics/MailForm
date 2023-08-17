import React , {useState} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter vaild email').required('Enter email'),
  content: yup.string().required('Message is required'),
 })


function Form() {
 const [emailStatus, setemailStatus] = useState('');
 const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
 });

 const onSubmit = (data,event) => {
       event.preventDefault();
        // console.log('Form Submitted')
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () =>{
          //update the emailStatus with the response
        console.log(xhr.responseText);
        
        setemailStatus(xhr.responseText);
        

        });
        xhr.open('GET', 'https://rocketnow.com.au/ReactMail/index.php?sendto=' + data.email + 
        '&name='+ data.name +
        '&message=' + data.content);

        // send the request
        xhr.send();
 }
//console.log(errors);
  return (
    
               <div>
                  <div className="App">
                    <header className="App-header">
                    <div className="form">
                        <h2 className='contactformhead'>Contact Form</h2>
                        <div>
                           <h6 style={{color: "green"}}>{emailStatus ? emailStatus : null}</h6>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} method="post">
                       
                                <div className="mb-3">
                                <label >Full Name:</label>
                                <input {...register('name')} className="form-control" placeholder="Enter Name" name="name"/>
                                <p style={{color:'red',fontSize:20}}>{errors.name?.message}</p>
                                </div>
            
                                <div className="mb-3 mt-3">
                                <label>Email:</label>
                                <input {...register('email')} className="form-control" placeholder="Enter email" name="email"/>
                                <p style={{color:'red',fontSize:20}}>{errors.email?.message}</p>
                                </div>
            
                                <div className="mb-3">
                                <label>Message:</label>
                                <textarea {...register('content')} className="form-control" rows="5"  name="content" placeholder="Your Message" ></textarea>
                                <p style={{color:'red',fontSize:20}}>{errors.content?.message}</p>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Send Email</button>
            


                          </form>
                    </div>
                    
                    </header>
               </div>
             </div>
  )
}
export default Form;