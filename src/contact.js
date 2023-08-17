import React, { Component } from 'react';



class Contact extends Component{
    state = {
          name: '',
          email: '',
          message: '',
          emailStatus: ''
        
        }
      

      //handleChange

      handleOnChange = input => e => {
        this.setState({
          [input]: e.target.value
        });
      }
      //submit form
      submitForm = (e) =>{

        const { name, email, message} = this.state;
       //console.log(this.state);
       //create a new XMLHTTPRequest
       var xhr = new XMLHttpRequest();

       //get a callback when server responds
       xhr.addEventListener('load', () =>{
           //update the emailStatus with the response
          //console.log(xhr.responseText);
          this.setState({
             emailStatus: xhr.responseText
          });

       });

       xhr.open('GET', 'https://rocketnow.com.au/ReactMail/index.php?sendto=' + email + 
                       '&name='+ name +
                       '&message=' + message);

        // send the request
        xhr.send();


        e.preventDefault();

      }
     

      render() {
        const { name, email, message, emailStatus } = this.state;
         return <div>
                  <div className="App">
                    <header className="App-header">
                    <div className="form">
                        <h2 className='contactformhead'>Contact Form</h2>
                        
                        <form onSubmit={this.submitForm} method="post">
                        <h6 style={{color: "green"}}>{emailStatus ? emailStatus : null}</h6>
                                <div className="mb-3">
                                <label >Full Name:</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={name} onChange={this.handleOnChange('name')}/>
                                </div>
            
                                <div className="mb-3 mt-3">
                                <label>Email:</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={this.handleOnChange('email')}/>
                                </div>
            
                                <div className="mb-3">
                                <label>Message:</label>
                                <textarea className="form-control" rows="5" id="message" name="message" placeholder="Your Message" value={message} onChange={this.handleOnChange('message')}></textarea>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Send Email</button>
            


                            </form>
                    </div>
                    
                    </header>
               </div>
             </div>
         }
}

export default Contact;