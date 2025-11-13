// import { 
//   IonButton, 
//   IonCard, 
//   IonCardContent, 
//   IonContent, 
//   IonHeader, 
//   IonIcon, 
//   IonInput, 
//   IonPage, 
//   IonTitle, 
//   IonToolbar, 
//   useIonRouter,
//   IonLoading,
//   useIonToast,
//   IonText,
//   IonButtons,
//   IonBackButton;
// } from '@ionic/react';
// import React, { useState } from 'react';
// import { 
//   personCircleOutline, 
//   eyeOffOutline, 
//   eyeOutline, 
//   logoGoogle,
//   checkmarkCircleOutline
// } from 'ionicons/icons';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithPopup,
//   User 
// } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db, googleProvider } from '../firebase/config';

// // Define types for additional user data
// interface AdditionalUserData {
//   displayName?: string;
//   photoURL?: string;
//   [key: string]: any;
// }

// const Register: React.FC = () => {
//   const router = useIonRouter();
//   const [present] = useIonToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [authMethod, setAuthMethod] = useState<'email' | 'google' | null>(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     displayName: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     displayName: ''
//   });

//   const validateForm = (): boolean => {
//     const newErrors = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       displayName: ''
//     };

//     // First Name validation
//     if (!formData.firstName) {
//       newErrors.firstName = 'First name is required';
//     }

//     // Last Name validation
//     if (!formData.lastName) {
//       newErrors.lastName = 'Last name is required';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Display name validation (optional, can be generated from first + last name)
//     if (!formData.displayName) {
//       // Auto-generate display name from first and last name
//       formData.displayName = `${formData.firstName} ${formData.lastName}`.trim();
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return !newErrors.firstName && !newErrors.lastName && !newErrors.email && 
//            !newErrors.password && !newErrors.confirmPassword;
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[field as keyof typeof errors]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }

//     // Auto-generate display name when first and last name are filled
//     if ((field === 'firstName' || field === 'lastName') && formData.firstName && formData.lastName) {
//       setFormData(prev => ({
//         ...prev,
//         displayName: `${formData.firstName} ${formData.lastName}`
//       }));
//     }
//   };

//   // Function to store user data in Firestore with proper typing
//   const storeUserData = async (user: User, method: string, additionalData: AdditionalUserData = {}) => {
//     try {
//       const userRef = doc(db, 'users', user.uid);
      
//       // Use display name from form or generated from first + last name
//       const displayName = additionalData.displayName || formData.displayName || `${formData.firstName} ${formData.lastName}`;
      
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: user.email,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         displayName: displayName,
//         photoURL: user.photoURL || additionalData.photoURL || '',
//         authMethod: method,
//         createdAt: new Date(),
//         lastLoginAt: new Date(),
//         role: 'user',
//         ...additionalData
//       });
//       console.log('User data stored in Firestore with method:', method);
//     } catch (error) {
//       console.error('Error storing user data:', error);
//       throw error;
//     }
//   };

//   // Email/Password Registration
//   const doRegister = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     if (!validateForm()) {
//       await present({
//         message: 'Please fix the errors in the form',
//         duration: 2000,
//         color: 'danger',
//         position: 'top'
//       });
//       return;
//     }

//     setIsLoading(true);
//     setAuthMethod('email');

//     try {
//       console.log('Attempting registration with:', formData.email);
      
//       // Create user with Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       );
      
//       const user = userCredential.user;
//       console.log('Email registration successful, user:', user.uid);
      
//       // Store additional user data in Firestore
//       await storeUserData(user, 'email');
      
//       // Navigate to home page
//       router.push('/home', 'root');
      
//       await present({
//         message: 'Registration successful! Welcome!',
//         duration: 2000,
//         color: 'success',
//         position: 'top'
//       });
      
//     } catch (error: any) {
//       console.error('Registration error:', error);
      
//       let errorMessage = 'Registration failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'This email is already registered.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'Password is too weak. Please use at least 6 characters.';
//           break;
//         case 'auth/operation-not-allowed':
//           errorMessage = 'Email/password accounts are not enabled. Please contact support.';
//           break;
//         default:
//           errorMessage = error.message || 'Registration failed. Please try again.';
//       }
      
//       await present({
//         message: errorMessage,
//         duration: 3000,
//         color: 'danger',
//         position: 'top'
//       });
//     } finally {
//       setIsLoading(false);
//       setAuthMethod(null);
//     }
//   };

//   // Google Sign-Up
//   const signUpWithGoogle = async () => {
//     setIsLoading(true);
//     setAuthMethod('google');

//     try {
//       console.log('Attempting Google sign-up');
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
      
//       console.log('Google sign-up successful, user:', user.uid);
      
//       // Store user data in Firestore
//       const userRef = doc(db, 'users', user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: user.email,
//         firstName: user.displayName?.split(' ')[0] || '',
//         lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
//         displayName: user.displayName,
//         photoURL: user.photoURL || '',
//         authMethod: 'google',
//         createdAt: new Date(),
//         lastLoginAt: new Date(),
//         role: 'user'
//       }, { merge: true });
      
//       // Navigate to home page
//       router.push('/home', 'root');
      
//       await present({
//         message: 'Google registration successful!',
//         duration: 2000,
//         color: 'success',
//         position: 'top'
//       });
      
//     } catch (error: any) {
//       console.error('Google sign-up error:', error);
      
//       let errorMessage = 'Google registration failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/popup-closed-by-user':
//           errorMessage = 'Registration was cancelled.';
//           break;
//         case 'auth/popup-blocked':
//           errorMessage = 'Sign-up popup was blocked. Please allow popups for this site.';
//           break;
//         case 'auth/account-exists-with-different-credential':
//           errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
//           break;
//         default:
//           errorMessage = error.message || 'Google registration failed. Please try again.';
//       }
      
//       await present({
//         message: errorMessage,
//         duration: 3000,
//         color: 'danger',
//         position: 'top'
//       });
//     } finally {
//       setIsLoading(false);
//       setAuthMethod(null);
//     }
//   };

//   return ( 
//     <IonPage>
//       <IonHeader>
//         <IonToolbar color={'success'}>
//           <IonButtons slot="start">  
//             <IonBackButton defaultHref='/login'/>
//           </IonButtons> 
//           <IonTitle>Create Account</IonTitle>
//         </IonToolbar>
//       </IonHeader>
      
//       <IonContent scrollY={false}>
//         <IonCard>
//           <IonCardContent>
//             {/* Email/Password Registration Form */}
//             <form onSubmit={doRegister}>
//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="First Name"
//                 type="text"
//                 placeholder="Enter your first name"
//                 value={formData.firstName}
//                 onIonInput={(e) => handleInputChange('firstName', e.detail.value!)}
//                 className={errors.firstName ? 'ion-invalid' : ''}
//                 errorText={errors.firstName}
//               />
              
//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="Last Name"
//                 type="text"
//                 placeholder="Enter your last name"
//                 value={formData.lastName}
//                 onIonInput={(e) => handleInputChange('lastName', e.detail.value!)}
//                 className={`ion-margin-top ${errors.lastName ? 'ion-invalid' : ''}`}
//                 errorText={errors.lastName}
//               />

//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="Email"
//                 type="email"
//                 placeholder="abcd@gmail.com"
//                 value={formData.email}
//                 onIonInput={(e) => handleInputChange('email', e.detail.value!)}
//                 className={`ion-margin-top ${errors.email ? 'ion-invalid' : ''}`}
//                 errorText={errors.email}
//               />
              
//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onIonInput={(e) => handleInputChange('password', e.detail.value!)}
//                 className={`ion-margin-top ${errors.password ? 'ion-invalid' : ''}`}
//                 errorText={errors.password}
//               >
//                 <IonIcon
//                   slot="end"
//                   icon={showPassword ? eyeOffOutline : eyeOutline}
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{ cursor: 'pointer' }}
//                 />
//               </IonInput>

//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="Confirm Password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onIonInput={(e) => handleInputChange('confirmPassword', e.detail.value!)}
//                 className={`ion-margin-top ${errors.confirmPassword ? 'ion-invalid' : ''}`}
//                 errorText={errors.confirmPassword}
//               />
                       
//               <IonButton 
//                 color={'secondary'} 
//                 type="submit" 
//                 expand="block" 
//                 className="ion-margin-top"
//                 disabled={isLoading && authMethod !== 'email'}
//               >
//                 {isLoading && authMethod === 'email' ? 'Creating Account...' : 'Create my account'}
//                 <IonIcon icon={checkmarkCircleOutline} slot="end" />
//               </IonButton>
//             </form>

//             {/* Divider */}
//             <div className="ion-text-center ion-margin">
//               <IonText color="medium">OR</IonText>
//             </div>

//             {/* Google Sign-Up Button */}
//             <IonButton 
//               color={'light'} 
//               expand="block" 
//               className="ion-margin-top"
//               onClick={signUpWithGoogle}
//               disabled={isLoading && authMethod !== 'google'}
//             >
//               <IonIcon icon={logoGoogle} slot="start" />
//               {isLoading && authMethod === 'google' ? 'Signing up with Google...' : 'Sign up with Google'}
//             </IonButton>

//             {/* Login Redirect */}
//             <div className="ion-text-center ion-margin-top">
//               <IonText color="medium">
//                 Already have an account?{' '}
//                 <a 
//                   href="#" 
//                   style={{ textDecoration: 'none' }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     router.push('/login');
//                   }}
//                 >
//                   Login here
//                 </a>
//               </IonText>
//             </div>
//           </IonCardContent>
//         </IonCard>

//         <IonLoading
//           isOpen={isLoading}
//           message={
//             authMethod === 'email' ? 'Creating your account...' :
//             authMethod === 'google' ? 'Signing up with Google...' :
//             'Creating account...'
//           }
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Register;
import { 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter,
  IonLoading,
  useIonToast,
  IonText,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import React, { useState } from 'react';
import { 
  personCircleOutline, 
  eyeOffOutline, 
  eyeOutline, 
  logoGoogle,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

const Register: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'google' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !newErrors.firstName && !newErrors.lastName && !newErrors.email && 
           !newErrors.password && !newErrors.confirmPassword;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Auto-generate display name when first and last name are filled
    if ((field === 'firstName' || field === 'lastName') && formData.firstName && formData.lastName) {
      setFormData(prev => ({
        ...prev,
        displayName: `${formData.firstName} ${formData.lastName}`
      }));
    }
  };

  // Email/Password Registration
  const doRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      await present({
        message: 'Please fix the errors in the form',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      return;
    }

    setIsLoading(true);
    setAuthMethod('email');

    try {
      console.log('Attempting registration with:', formData.email);
      
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      console.log('Email registration successful, user:', user.uid);
      
      // Update user profile with display name
      if (formData.firstName && formData.lastName) {
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        });
      }
      
      // Navigate to home page
      router.push('/home', 'root');
      
      await present({
        message: 'Registration successful! Welcome!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        default:
          errorMessage = error.message || 'Registration failed. Please try again.';
      }
      
      await present({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
      setAuthMethod(null);
    }
  };

  // Google Sign-Up
  const signUpWithGoogle = async () => {
    setIsLoading(true);
    setAuthMethod('google');

    try {
      console.log('Attempting Google sign-up');
      
      // Create Google Auth Provider directly
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('Google sign-up successful, user:', user.uid);
      
      // Navigate to home page
      router.push('/home', 'root');
      
      await present({
        message: 'Google registration successful!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      
    } catch (error: any) {
      console.error('Google sign-up error:', error);
      
      let errorMessage = 'Google registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Registration was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Sign-up popup was blocked. Please allow popups for this site.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
          break;
        default:
          errorMessage = error.message || 'Google registration failed. Please try again.';
      }
      
      await present({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
      setAuthMethod(null);
    }
  };

  return ( 
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">  
            <IonBackButton defaultHref='/login'/>
          </IonButtons> 
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent scrollY={false}>
        <IonCard>
          <IonCardContent>
            {/* Email/Password Registration Form */}
            <form onSubmit={doRegister}>
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onIonInput={(e) => handleInputChange('firstName', e.detail.value!)}
                className={errors.firstName ? 'ion-invalid' : ''}
                errorText={errors.firstName}
              />
              
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onIonInput={(e) => handleInputChange('lastName', e.detail.value!)}
                className={`ion-margin-top ${errors.lastName ? 'ion-invalid' : ''}`}
                errorText={errors.lastName}
              />

              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Email"
                type="email"
                placeholder="abcd@gmail.com"
                value={formData.email}
                onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                className={`ion-margin-top ${errors.email ? 'ion-invalid' : ''}`}
                errorText={errors.email}
              />
              
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onIonInput={(e) => handleInputChange('password', e.detail.value!)}
                className={`ion-margin-top ${errors.password ? 'ion-invalid' : ''}`}
                errorText={errors.password}
              >
                <IonIcon
                  slot="end"
                  icon={showPassword ? eyeOffOutline : eyeOutline}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                />
              </IonInput>

              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onIonInput={(e) => handleInputChange('confirmPassword', e.detail.value!)}
                className={`ion-margin-top ${errors.confirmPassword ? 'ion-invalid' : ''}`}
                errorText={errors.confirmPassword}
              />
                       
              <IonButton 
                color={'secondary'} 
                type="submit" 
                expand="block" 
                className="ion-margin-top"
                disabled={isLoading && authMethod !== 'email'}
              >
                {isLoading && authMethod === 'email' ? 'Creating Account...' : 'Create my account'}
                <IonIcon icon={checkmarkCircleOutline} slot="end" />
              </IonButton>
            </form>

            {/* Divider */}
            <div className="ion-text-center ion-margin">
              <IonText color="medium">OR</IonText>
            </div>

            {/* Google Sign-Up Button */}
            <IonButton 
              color={'light'} 
              expand="block" 
              className="ion-margin-top"
              onClick={signUpWithGoogle}
              disabled={isLoading && authMethod !== 'google'}
            >
              <IonIcon icon={logoGoogle} slot="start" />
              {isLoading && authMethod === 'google' ? 'Signing up with Google...' : 'Sign up with Google'}
            </IonButton>

            {/* Login Redirect */}
            <div className="ion-text-center ion-margin-top">
              <IonText color="medium">
                Already have an account?{' '}
                <a 
                  href="#" 
                  style={{ textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/login');
                  }}
                >
                  Login here
                </a>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading
          isOpen={isLoading}
          message={
            authMethod === 'email' ? 'Creating your account...' :
            authMethod === 'google' ? 'Signing up with Google...' :
            'Creating account...'
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;