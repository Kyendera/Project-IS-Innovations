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
//   IonText
// } from '@ionic/react';
// import React, { useState } from 'react';
// import { 
//   logInOutline, 
//   personCircleOutline, 
//   eyeOffOutline, 
//   eyeOutline,
//   logoGoogle,
//   personOutline
// } from 'ionicons/icons';
// import pic1 from '../assets/pic1.jpg';
// import { 
//   signInWithEmailAndPassword, 
//   signInWithPopup, 
//   signInAnonymously,
//   GoogleAuthProvider
// } from 'firebase/auth';
// import { auth } from '../firebase/config';

// const Login: React.FC = () => {
//   const router = useIonRouter();
//   const [present] = useIonToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [authMethod, setAuthMethod] = useState<'email' | 'google' | 'anonymous' | null>(null);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({
//     email: '',
//     password: ''
//   });

//   const validateForm = (): boolean => {
//     const newErrors = {
//       email: '',
//       password: ''
//     };

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return !newErrors.email && !newErrors.password;
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
//   };

//   // Email/Password Login
//   const doLogin = async (event: React.FormEvent) => {
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
//       console.log('Attempting email login with:', formData.email);
//       const userCredential = await signInWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       );
      
//       const user = userCredential.user;
//       console.log('Email login successful, user:', user.uid);
      
//       // Navigate to home page
//       router.push('/home', 'root');
      
//       await present({
//         message: 'Login successful!',
//         duration: 2000,
//         color: 'success',
//         position: 'top'
//       });
      
//     } catch (error: any) {
//       console.error('Login error:', error);
      
//       let errorMessage = 'Login failed. Please try again.';
      
//       // Handle specific Firebase auth errors
//       switch (error.code) {
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email.';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password. Please try again.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/user-disabled':
//           errorMessage = 'This account has been disabled.';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Please try again later.';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed. Please try again.';
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

//   // Google Sign-In
//   const signInWithGoogle = async () => {
//     setIsLoading(true);
//     setAuthMethod('google');

//     try {
//       console.log('Attempting Google sign-in');
      
//       // Create Google Auth Provider directly
//       const googleProvider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
      
//       console.log('Google sign-in successful, user:', user.uid);
      
//       // Navigate to home page
//       router.push('/home', 'root');
      
//       await present({
//         message: 'Google login successful!',
//         duration: 2000,
//         color: 'success',
//         position: 'top'
//       });
      
//     } catch (error: any) {
//       console.error('Google sign-in error:', error);
      
//       let errorMessage = 'Google sign-in failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/popup-closed-by-user':
//           errorMessage = 'Sign-in was cancelled.';
//           break;
//         case 'auth/popup-blocked':
//           errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
//           break;
//         default:
//           errorMessage = error.message || 'Google sign-in failed. Please try again.';
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

//   // Anonymous Sign-In
//   const signInAnonymouslyUser = async () => {
//     setIsLoading(true);
//     setAuthMethod('anonymous');

//     try {
//       console.log('Attempting anonymous sign-in');
//       const userCredential = await signInAnonymously(auth);
//       const user = userCredential.user;
      
//       console.log('Anonymous sign-in successful, user:', user.uid);
      
//       // Navigate to home page
//       router.push('/home', 'root');
      
//       await present({
//         message: 'Welcome! You are now signed in anonymously.',
//         duration: 2000,
//         color: 'success',
//         position: 'top'
//       });
      
//     } catch (error: any) {
//       console.error('Anonymous sign-in error:', error);
      
//       await present({
//         message: 'Anonymous sign-in failed. Please try again.',
//         duration: 3000,
//         color: 'danger',
//         position: 'top'
//       });
//     } finally {
//       setIsLoading(false);
//       setAuthMethod(null);
//     }
//   };

//   const handleForgotPassword = () => {
//     // Navigate to forgot password page or show modal
//     console.log('Forgot password clicked');
//     // For now, show a message that this feature is not implemented
//     present({
//       message: 'Password reset feature coming soon!',
//       duration: 2000,
//       color: 'warning',
//       position: 'top'
//     });
//     // router.push('/forgot-password');
//   };

//   return ( 
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Login Page</IonTitle>
//         </IonToolbar>
//       </IonHeader>
      
//       <IonContent scrollY={false} fullscreen>
//         <div className='ion-text-center ion-padding'>
//           <img src={pic1} alt='TourismGuid Logo' width="20%" />
//         </div>
        
//         <IonCard>
//           <IonCardContent>
//             {/* Email/Password Login Form */}
//             <form onSubmit={doLogin}>
//               <IonInput
//                 fill="outline"
//                 labelPlacement="floating"
//                 label="Email"
//                 type="email"
//                 placeholder="abcd@gmail.com"
//                 value={formData.email}
//                 onIonInput={(e) => handleInputChange('email', e.detail.value!)}
//                 className={errors.email ? 'ion-invalid' : ''}
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
              
//               <p className="ion-text-center ion-margin-top">
//                 <a 
//                   href="#" 
//                   style={{ textDecoration: "none" }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleForgotPassword();
//                   }}
//                 >
//                   Forgot Password?
//                 </a>
//               </p>
                       
//               <IonButton 
//                 color={'secondary'} 
//                 type="submit" 
//                 expand="block" 
//                 className="ion-margin-top"
//                 disabled={isLoading && authMethod !== 'email'}
//               >
//                 {isLoading && authMethod === 'email' ? 'Logging in...' : 'Login with Email'}
//                 <IonIcon icon={logInOutline} slot="end" />
//               </IonButton>
//             </form>

//             {/* Divider */}
//             <div className="ion-text-center ion-margin">
//               <IonText color="medium">OR</IonText>
//             </div>

//             {/* Google Sign-In Button */}
//             <IonButton 
//               color={'light'} 
//               expand="block" 
//               className="ion-margin-top"
//               onClick={signInWithGoogle}
//               disabled={isLoading && authMethod !== 'google'}
//             >
//               <IonIcon icon={logoGoogle} slot="start" />
//               {isLoading && authMethod === 'google' ? 'Signing in with Google...' : 'Continue with Google'}
//             </IonButton>

//             {/* Anonymous Sign-In Button */}
//             <IonButton 
//               color={'medium'} 
//               expand="block" 
//               className="ion-margin-top"
//               onClick={signInAnonymouslyUser}
//               disabled={isLoading && authMethod !== 'anonymous'}
//               fill="outline"
//             >
//               <IonIcon icon={personOutline} slot="start" />
//               {isLoading && authMethod === 'anonymous' ? 'Signing in...' : 'Continue as Guest'}
//             </IonButton>

//             {/* Register Button */}
//             <IonButton 
//               routerLink='/Register'
//               color={'primary'} 
//               type='button'
//               expand='block' 
//               className='ion-margin-top'
//               fill="clear"
//             >
//               Create Account
//               <IonIcon icon={personCircleOutline} slot="end" />
//             </IonButton>
//           </IonCardContent>
//         </IonCard>

//         <IonLoading
//           isOpen={isLoading}
//           message={
//             authMethod === 'email' ? 'Logging in...' :
//             authMethod === 'google' ? 'Signing in with Google...' :
//             authMethod === 'anonymous' ? 'Signing in as Guest...' :
//             'Signing in...'
//           }
//         />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Login;
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
  IonRouterLink,
  IonCheckbox,
  IonItem,
  IonLabel
} from '@ionic/react';
import React, { useState } from 'react';
import { 
  logInOutline, 
  personCircleOutline, 
  eyeOffOutline, 
  eyeOutline,
  logoGoogle,
  personOutline
} from 'ionicons/icons';
import pic1 from '../assets/pic1.jpg';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'google' | 'anonymous' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState<number | null>(null);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('at least 8 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('one special character');
    }
    
    return errors;
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      password: ''
    };

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
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain: ${passwordErrors.join(', ')}`;
      }
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
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
  };

  // Email/Password Login
  const doLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (lastAttemptTime && now - lastAttemptTime < 30000 && loginAttempts >= 5) {
      await present({
        message: 'Too many attempts. Please wait 30 seconds.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      return;
    }

    // Reset attempts after 30 seconds
    if (lastAttemptTime && now - lastAttemptTime > 30000) {
      setLoginAttempts(0);
    }

    if (!validateForm()) {
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(now);
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
      console.log('Attempting email login with:', formData.email);
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      console.log('Email login successful, user:', user.uid);
      
      // Reset login attempts on successful login
      setLoginAttempts(0);
      setLastAttemptTime(null);
      
      // Navigate to home page
      router.push('/home', 'root');
      
      await present({
        message: 'Login successful!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(Date.now());
      
      let errorMessage = 'Login failed. Please try again.';
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'Login failed. Please try again.';
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

  // Google Sign-In
  const signInWithGoogle = async () => {
    setIsLoading(true);
    setAuthMethod('google');

    try {
      console.log('Attempting Google sign-in');
      
      // Create Google Auth Provider directly
      const googleProvider = new GoogleAuthProvider();
      // Add scopes if needed
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('Google sign-in successful, user:', user.uid);
      
      // Navigate to home page
      router.push('/home', 'root');
      
      await present({
        message: 'Google login successful!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'This domain is not authorized for Google sign-in.';
          break;
        default:
          errorMessage = error.message || 'Google sign-in failed. Please try again.';
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

  // Anonymous Sign-In
  const signInAnonymouslyUser = async () => {
    setIsLoading(true);
    setAuthMethod('anonymous');

    try {
      console.log('Attempting anonymous sign-in');
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      console.log('Anonymous sign-in successful, user:', user.uid);
      
      // Navigate to home page
      router.push('/home', 'root');
      
      await present({
        message: 'Welcome! You are now signed in anonymously.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      
    } catch (error: any) {
      console.error('Anonymous sign-in error:', error);
      
      await present({
        message: 'Anonymous sign-in failed. Please try again.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
      setAuthMethod(null);
    }
  };

  // Password Reset
  const handleResetPassword = async () => {
    if (!formData.email) {
      await present({
        message: 'Please enter your email address to reset password',
        duration: 3000,
        color: 'warning',
        position: 'top'
      });
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, formData.email);
      await present({
        message: 'Password reset email sent! Check your inbox.',
        duration: 4000,
        color: 'success',
        position: 'top'
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/missing-email':
          errorMessage = 'Please enter your email address.';
          break;
      }
      
      await present({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent scrollY={false} fullscreen>
        <div className='ion-text-center ion-padding'>
          <img src={pic1} alt='TourismGuid Logo' width="20%" />
        </div>
        
        <IonCard>
          <IonCardContent>
            {/* Email/Password Login Form */}
            <form onSubmit={doLogin}>
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Email"
                type="email"
                placeholder="abcd@gmail.com"
                value={formData.email}
                onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                className={errors.email ? 'ion-invalid' : ''}
                errorText={errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                disabled={isLoading}
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
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={!!errors.password}
                disabled={isLoading}
              >
                <IonIcon
                  slot="end"
                  icon={showPassword ? eyeOffOutline : eyeOutline}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                />
              </IonInput>

              {/* Remember Me Checkbox */}
              <IonItem lines="none" className="ion-margin-top">
                <IonCheckbox 
                  checked={rememberMe} 
                  onIonChange={e => setRememberMe(e.detail.checked)}
                  slot="start"
                  disabled={isLoading}
                />
                <IonLabel>Remember me</IonLabel>
              </IonItem>
              
              <p className="ion-text-center ion-margin-top">
                <a 
                  href="#" 
                  style={{ textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetPassword();
                  }}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleResetPassword();
                    }
                  }}
                >
                  Forgot Password?
                </a>
              </p>
                       
              <IonButton 
                color={'secondary'} 
                type="submit" 
                expand="block" 
                className="ion-margin-top"
                disabled={isLoading && authMethod !== 'email'}
                aria-label={isLoading && authMethod === 'email' ? 'Logging in' : 'Login with Email'}
              >
                {isLoading && authMethod === 'email' ? 'Logging in...' : 'Login with Email'}
                <IonIcon icon={logInOutline} slot="end" aria-hidden="true" />
              </IonButton>
            </form>

            {/* Divider */}
            <div className="ion-text-center ion-margin">
              <IonText color="medium">OR</IonText>
            </div>

            {/* Google Sign-In Button */}
            <IonButton 
              color={'light'} 
              expand="block" 
              className="ion-margin-top"
              onClick={signInWithGoogle}
              disabled={isLoading && authMethod !== 'google'}
              aria-label={isLoading && authMethod === 'google' ? 'Signing in with Google' : 'Continue with Google'}
            >
              <IonIcon icon={logoGoogle} slot="start" aria-hidden="true" />
              {isLoading && authMethod === 'google' ? 'Signing in with Google...' : 'Continue with Google'}
            </IonButton>

            {/* Anonymous Sign-In Button */}
            <IonButton 
              color={'medium'} 
              expand="block" 
              className="ion-margin-top"
              onClick={signInAnonymouslyUser}
              disabled={isLoading && authMethod !== 'anonymous'}
              fill="outline"
              aria-label={isLoading && authMethod === 'anonymous' ? 'Signing in as guest' : 'Continue as Guest'}
            >
              <IonIcon icon={personOutline} slot="start" aria-hidden="true" />
              {isLoading && authMethod === 'anonymous' ? 'Signing in...' : 'Continue as Guest'}
            </IonButton>

            {/* Create Account Section */}
            <div className="ion-text-center ion-margin-top ion-padding-top">
              <IonText color="medium">
                Don't have an account?{' '}
              </IonText>
              <IonRouterLink 
                routerLink='/register' 
                style={{ textDecoration: 'none', fontWeight: 'bold' }}
                aria-label="Create new account"
              >
                Create Account
              </IonRouterLink>
            </div>

            {/* Alternative Create Account Button */}
            <IonButton 
              routerLink='/register'
              color={'primary'} 
              type='button'
              expand='block' 
              className='ion-margin-top'
              fill="clear"
              disabled={isLoading}
              aria-label="Create new account"
            >
              Create New Account
              <IonIcon icon={personCircleOutline} slot="end" aria-hidden="true" />
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonLoading
          isOpen={isLoading}
          message={
            authMethod === 'email' ? 'Logging in...' :
            authMethod === 'google' ? 'Signing in with Google...' :
            authMethod === 'anonymous' ? 'Signing in as Guest...' :
            'Signing in...'
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;