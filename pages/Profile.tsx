// // pages/Profile.tsx

// import React from 'react';
// import {
//   IonContent,
//   IonHeader,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonItem,
//   IonLabel,
//   IonAvatar,
//   IonList,
//   IonButton,
//   IonIcon,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardTitle
// } from '@ionic/react';
// import { person, settings, logOut, heart, location } from 'ionicons/icons';

// const Profile: React.FC = () => {
//   // Example user data - in a real app, this would come from a context or state management
//   const user = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     profilePicture: 'https://via.placeholder.com/150',
//     savedDestinations: [
//       { id: 1, name: 'Paris, France' },
//       { id: 2, name: 'Tokyo, Japan' },
//       { id: 3, name: 'New York, USA' }
//     ],
//     preferences: {
//       language: 'English',
//       currency: 'USD',
//       interests: ['Historical', 'Adventure']
//     }
//   };

//   const handleLogout = () => {
//     // Implement logout logic here
//     console.log('Logout clicked');
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Profile</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent fullscreen>
//         <IonGrid>
//           <IonRow className="ion-justify-content-center ion-padding">
//             <IonCol size="auto">
//               <IonAvatar style={{ width: '100px', height: '100px' }}>
//                 <img src={user.profilePicture} alt="Profile" />
//               </IonAvatar>
//             </IonCol>
//           </IonRow>
//           <IonRow className="ion-justify-content-center">
//             <IonCol size="auto">
//               <IonLabel>
//                 <h2>{user.name}</h2>
//               </IonLabel>
//             </IonCol>
//           </IonRow>
//           <IonRow className="ion-justify-content-center">
//             <IonCol size="auto">
//               <IonLabel>
//                 <p>{user.email}</p>
//               </IonLabel>
//             </IonCol>
//           </IonRow>

//           {/* Saved Destinations */}
//           <IonRow>
//             <IonCol>
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>
//                     <IonIcon icon={heart} /> Saved Destinations
//                   </IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent>
//                   <IonList>
//                     {user.savedDestinations.map(destination => (
//                       <IonItem key={destination.id}>
//                         <IonIcon icon={location} slot="start" />
//                         <IonLabel>{destination.name}</IonLabel>
//                       </IonItem>
//                     ))}
//                   </IonList>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* Preferences */}
//           <IonRow>
//             <IonCol>
//               <IonCard>
//                 <IonCardHeader>
//                   <IonCardTitle>Preferences</IonCardTitle>
//                 </IonCardHeader>
//                 <IonCardContent>
//                   <IonList>
//                     <IonItem>
//                       <IonLabel>Language</IonLabel>
//                       <IonLabel slot="end">{user.preferences.language}</IonLabel>
//                     </IonItem>
//                     <IonItem>
//                       <IonLabel>Currency</IonLabel>
//                       <IonLabel slot="end">{user.preferences.currency}</IonLabel>
//                     </IonItem>
//                     <IonItem>
//                       <IonLabel>Interests</IonLabel>
//                       <IonLabel slot="end">{user.preferences.interests.join(', ')}</IonLabel>
//                     </IonItem>
//                   </IonList>
//                 </IonCardContent>
//               </IonCard>
//             </IonCol>
//           </IonRow>

//           {/* Settings and Logout */}
//           <IonRow>
//             <IonCol>
//               <IonList>
//                 <IonItem button>
//                   <IonIcon icon={settings} slot="start" />
//                   <IonLabel >Settings</IonLabel>
//                 </IonItem>
//                 <IonItem button onClick={handleLogout}>
//                   <IonIcon icon={logOut} slot="start" />
//                   <IonLabel>Logout</IonLabel>
//                 </IonItem>
//               </IonList>
//             </IonCol>
//           </IonRow>
//         </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Profile;
// pages/Profile.tsx

import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonAvatar,
  IonList,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  IonLoading,
  useIonToast,
  IonBadge,
  IonChip,
  IonActionSheet,
  IonModal,
  IonInput,
  IonTextarea,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { 
  person, 
  settings, 
  logOut, 
  heart, 
  location, 
  pencil,
  camera,
  close,
  save,
  globe,
  cash,
  star
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { signOut, onAuthStateChanged, updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  bio?: string;
  preferences: {
    language: string;
    currency: string;
    interests: string[];
  };
}

const Profile: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    email: ''
  });

  // Example saved destinations (hardcoded for now)
  const [savedDestinations] = useState([
    { id: 1, name: 'Paris, France', type: 'City' },
    { id: 2, name: 'Tokyo, Japan', type: 'City' },
    { id: 3, name: 'Bali, Indonesia', type: 'Island' }
  ]);

  // Fetch user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Use Firebase Auth data directly
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || 'https://via.placeholder.com/150',
            bio: 'Add your bio here',
            preferences: {
              language: 'English',
              currency: 'USD',
              interests: ['Historical', 'Adventure']
            }
          });
          setEditForm({
            name: firebaseUser.displayName || 'User',
            bio: 'Add your bio here',
            email: firebaseUser.email || ''
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          await present({
            message: 'Error loading profile data',
            duration: 3000,
            color: 'danger',
            position: 'top'
          });
        }
      } else {
        // No user logged in, redirect to login
        router.push('/login', 'root');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      await present({
        message: 'Logged out successfully',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      router.push('/login', 'root');
    } catch (error) {
      console.error('Logout error:', error);
      await present({
        message: 'Error logging out',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user || !auth.currentUser) return;

    try {
      setIsLoading(true);

      // Update Firebase Auth profile
      if (editForm.name !== user.name) {
        await updateProfile(auth.currentUser, {
          displayName: editForm.name
        });
      }

      if (editForm.email !== user.email) {
        await updateEmail(auth.currentUser, editForm.email);
      }

      // Update local state
      setUser(prev => prev ? {
        ...prev,
        name: editForm.name,
        bio: editForm.bio,
        email: editForm.email
      } : null);

      setShowEditModal(false);
      
      await present({
        message: 'Profile updated successfully!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });

    } catch (error: any) {
      console.error('Error updating profile:', error);
      
      let errorMessage = 'Failed to update profile';
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please re-authenticate to update your email';
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

  if (isLoading && !user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLoading isOpen={true} message="Loading profile..." />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        {user ? (
          <IonGrid>
            {/* Profile Header */}
            <IonRow className="ion-justify-content-center ion-padding">
              <IonCol size="auto" style={{ position: 'relative' }}>
                <IonAvatar style={{ width: '120px', height: '120px' }}>
                  <img src={user.photoURL} alt="Profile" />
                </IonAvatar>
                <IonButton
                  fill="clear"
                  size="small"
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    '--padding-start': '8px',
                    '--padding-end': '8px'
                  }}
                  onClick={() => setShowActionSheet(true)}
                >
                  <IonIcon icon={camera} />
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-justify-content-center">
              <IonCol size="auto" style={{ textAlign: 'center' }}>
                <IonLabel>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  {user.bio && <p style={{ fontStyle: 'italic', color: '#666' }}>{user.bio}</p>}
                </IonLabel>
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={() => setShowEditModal(true)}
                >
                  <IonIcon icon={pencil} slot="start" />
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>

            {/* Stats Row */}
            <IonRow className="ion-padding">
              <IonCol size="4" className="ion-text-center">
                <IonLabel>
                  <h3 style={{ margin: '0', color: 'var(--ion-color-primary)' }}>
                    {savedDestinations.length}
                  </h3>
                  <p style={{ margin: '0', fontSize: '0.8rem' }}>Saved</p>
                </IonLabel>
              </IonCol>
              <IonCol size="4" className="ion-text-center">
                <IonLabel>
                  <h3 style={{ margin: '0', color: 'var(--ion-color-primary)' }}>0</h3>
                  <p style={{ margin: '0', fontSize: '0.8rem' }}>Visited</p>
                </IonLabel>
              </IonCol>
              <IonCol size="4" className="ion-text-center">
                <IonLabel>
                  <h3 style={{ margin: '0', color: 'var(--ion-color-primary)' }}>0</h3>
                  <p style={{ margin: '0', fontSize: '0.8rem' }}>Reviews</p>
                </IonLabel>
              </IonCol>
            </IonRow>

            {/* Saved Destinations */}
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon icon={heart} color="danger" /> Saved Destinations
                      <IonBadge color="primary" style={{ marginLeft: '8px' }}>
                        {savedDestinations.length}
                      </IonBadge>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      {savedDestinations.map(destination => (
                        <IonItem key={destination.id}>
                          <IonIcon icon={location} slot="start" color="primary" />
                          <IonLabel>
                            <h3>{destination.name}</h3>
                            <p>{destination.type}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Preferences */}
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Preferences</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      <IonItem>
                        <IonIcon icon={globe} slot="start" />
                        <IonLabel>Language</IonLabel>
                        <IonLabel slot="end">{user.preferences.language}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={cash} slot="start" />
                        <IonLabel>Currency</IonLabel>
                        <IonLabel slot="end">{user.preferences.currency}</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={star} slot="start" />
                        <IonLabel>Interests</IonLabel>
                        <div slot="end">
                          {user.preferences.interests.map((interest, index) => (
                            <IonChip 
                              key={index} 
                              color="primary" 
                              outline
                              style={{ margin: '2px', fontSize: '0.8rem' }} // Fixed: removed size prop
                            >
                              {interest}
                            </IonChip>
                          ))}
                        </div>
                      </IonItem>
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Settings and Logout */}
            <IonRow>
              <IonCol>
                <IonList>
                  <IonItem button routerLink="/settings">
                    <IonIcon icon={settings} slot="start" />
                    <IonLabel>Settings</IonLabel>
                  </IonItem>
                  <IonItem button onClick={() => setShowLogoutAlert(true)}>
                    <IonIcon icon={logOut} slot="start" color="danger" />
                    <IonLabel color="danger">Logout</IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <div className="ion-text-center ion-padding">
            <IonLabel>
              <h2>No user data found</h2>
            </IonLabel>
            <IonButton routerLink="/login">Login</IonButton>
          </div>
        )}

        {/* Logout Confirmation Alert */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header={'Logout'}
          message={'Are you sure you want to logout?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Logout',
              role: 'confirm',
              handler: handleLogout
            }
          ]}
        />

        {/* Profile Photo Action Sheet */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Take Photo',
              handler: () => {
                console.log('Take Photo clicked');
              }
            },
            {
              text: 'Choose from Gallery',
              handler: () => {
                console.log('Choose from Gallery clicked');
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]}
        />

        {/* Edit Profile Modal */}
        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowEditModal(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>Edit Profile</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleUpdateProfile} strong={true}>
                  <IonIcon icon={save} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonInput
                  label="Name"
                  labelPlacement="stacked"
                  value={editForm.name}
                  onIonInput={(e) => setEditForm(prev => ({ ...prev, name: e.detail.value! }))}
                  placeholder="Enter your name"
                />
              </IonItem>
              <IonItem>
                <IonInput
                  label="Email"
                  labelPlacement="stacked"
                  type="email"
                  value={editForm.email}
                  onIonInput={(e) => setEditForm(prev => ({ ...prev, email: e.detail.value! }))}
                  placeholder="Enter your email"
                />
              </IonItem>
              <IonItem>
                <IonTextarea
                  label="Bio"
                  labelPlacement="stacked"
                  value={editForm.bio}
                  onIonInput={(e) => setEditForm(prev => ({ ...prev, bio: e.detail.value! }))}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>

        <IonLoading isOpen={isLoading} message={isLoading ? "Loading..." : "Updating..."} />
      </IonContent>
    </IonPage>
  );
};

export default Profile;