// import { getRedirectResult } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGoogleRedirect, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email : '',
  password : ''
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit', {formFields})

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {

      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('No User associated for this email')
          break;
        default:
          console.error('Error during Sign In', error)
          break;
      }
        
    }

  };

  const signInWithGoogle = async() => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
    // console.log(userDocRef);
  };

  // Code for Redirect Google SignIn (Not really needed)
  // Will run when component first mounts, AND
  // after redirect from Google SignIn
  // useEffect(() => {
  //   async function getUserFromRedirect(){
  //     const response = await getRedirectResult(auth);
  //     console.log({'user from redirect': response.user})
  //     if (response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //       // console.log(userDocRef);
  //     }
  //   }
  //   getUserFromRedirect();
  // }, []);


  return(

    <div className="sign-in-form-container">

      <h2>I already have an account</h2>
      <span>Sign in with email and password </span>

      <form onSubmit={handleSubmit}>

        <FormInput 
          label='Email'
          type={'email'} 
          required 
          onChange={handleChange} 
          name='email' 
          value={email}
        />

        <FormInput 
          label='Password'
          type={'password'} 
          required 
          onChange={handleChange} 
          name='password' 
          value={password}
        />

        <div className='buttons-container'>
          <Button type="submit"> Sign In </Button>
          {/* buttons are submit by default, so we need type='button' to prevent form*/}
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>

        {/* <Button onClick={signInWithGoogleRedirect} buttonType='google'>Sign In with Google Redirect</Button> */}
      
      </form>
    </div>

  );

};


export default SignInForm;