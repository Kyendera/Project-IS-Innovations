import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonListHeader,
  IonBackButton,
  IonButtons,
  IonAlert,
  IonRadioGroup,
  IonRadio,
  IonNote
} from '@ionic/react';
import {
  arrowBack,
  personCircle,
  lockClosed,
  moon,
  language,
  download,
  notifications,
  mail,
  helpCircle,
  documentText,
  shieldCheckmark,
  informationCircle,
  logOut,
  colorPalette,
  location,
  trash,
  warning,
  globe,
  cash,
  thermometer,
  resize,
  eye,
  analytics,
  text,
  megaphone
} from 'ionicons/icons';
import './settings.css';

// Define proper TypeScript interfaces
interface NotificationSettings {
  travelAlerts: boolean;
  newDestinations: boolean;
  promotional: boolean;
  tripReminders: boolean;
}

interface PrivacySettings {
  shareLocation: boolean;
  publicProfile: boolean;
  dataCollection: boolean;
}

interface AppPreferences {
  language: string;
  currency: string;
  temperatureUnit: string;
  distanceUnit: string;
}

interface OfflineData {
  downloadedMaps: number;
  downloadedGuides: number;
}

const Settings: React.FC = () => {
  // State for all settings with proper typing
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    travelAlerts: true,
    newDestinations: true,
    promotional: false,
    tripReminders: true
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    shareLocation: true,
    publicProfile: false,
    dataCollection: true
  });
  const [appPreferences, setAppPreferences] = useState<AppPreferences>({
    language: 'english',
    currency: 'USD',
    temperatureUnit: 'C',
    distanceUnit: 'km'
  });
  const [offlineData, setOfflineData] = useState<OfflineData>({
    downloadedMaps: 2.3,
    downloadedGuides: 150
  });
  const [showLogoutAlert, setShowLogoutAlert] = useState<boolean>(false);
  const [showResetAlert, setShowResetAlert] = useState<boolean>(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
    if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark', systemPrefersDark);
    } else {
      document.body.classList.toggle('dark', selectedTheme === 'dark');
    }
    localStorage.setItem('theme', selectedTheme);
  };

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle privacy toggle
  const handlePrivacyToggle = (key: keyof PrivacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle app preference change
  const handleAppPreferenceChange = (key: keyof AppPreferences, value: string) => {
    setAppPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('theme');
    window.location.href = '/'; // Redirect to login
  };

  // Handle clear cache
  const handleClearCache = () => {
    setOfflineData({
      downloadedMaps: 0,
      downloadedGuides: 0
    });
    // In a real app, you would clear actual cached data here
  };

  // Handle reset settings
  const handleResetSettings = () => {
    setTheme('system');
    setNotificationSettings({
      travelAlerts: true,
      newDestinations: true,
      promotional: false,
      tripReminders: true
    });
    setPrivacySettings({
      shareLocation: true,
      publicProfile: false,
      dataCollection: true
    });
    setAppPreferences({
      language: 'english',
      currency: 'USD',
      temperatureUnit: 'C',
      distanceUnit: 'km'
    });
    applyTheme('system');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" text="Back" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="settings-content">
        {/* Appearance Section */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Appearance</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon icon={colorPalette} slot="start" />
            <IonLabel>Theme</IonLabel>
            <IonSelect 
              value={theme} 
              onIonChange={e => handleThemeChange(e.detail.value)}
              interface="action-sheet"
            >
              <IonSelectOption value="light">Light</IonSelectOption>
              <IonSelectOption value="dark">Dark</IonSelectOption>
              <IonSelectOption value="system">System Default</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonIcon icon={text} slot="start" />
            <IonLabel>Font Size</IonLabel>
            <IonSelect 
              value="medium" 
              interface="action-sheet"
            >
              <IonSelectOption value="small">Small</IonSelectOption>
              <IonSelectOption value="medium">Medium</IonSelectOption>
              <IonSelectOption value="large">Large</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        {/* Account Section */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Account</IonLabel>
          </IonListHeader>
          
          <IonItem button routerLink="/UserInformationAccount">
            <IonIcon icon={personCircle} slot="start" />
            <IonLabel>Edit Profile</IonLabel>
          </IonItem>
          
          <IonItem button>
            <IonIcon icon={lockClosed} slot="start" />
            <IonLabel>Change Password</IonLabel>
          </IonItem>

          <IonItem button>
            <IonIcon icon={mail} slot="start" />
            <IonLabel>Email Preferences</IonLabel>
          </IonItem>
        </IonList>

        {/* Notifications Section */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Notifications</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon icon={notifications} slot="start" />
            <IonLabel>Push Notifications</IonLabel>
            <IonToggle 
              slot="end" 
              checked={notificationSettings.travelAlerts}
              onIonChange={() => handleNotificationToggle('travelAlerts')}
            />
          </IonItem>
          
          <IonItem>
            <IonIcon icon={location} slot="start" />
            <IonLabel>Travel Alerts</IonLabel>
            <IonToggle 
              slot="end" 
              checked={notificationSettings.tripReminders}
              onIonChange={() => handleNotificationToggle('tripReminders')}
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={globe} slot="start" />
            <IonLabel>New Destinations</IonLabel>
            <IonToggle 
              slot="end" 
              checked={notificationSettings.newDestinations}
              onIonChange={() => handleNotificationToggle('newDestinations')}
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={megaphone} slot="start" />
            <IonLabel>Promotional Offers</IonLabel>
            <IonToggle 
              slot="end" 
              checked={notificationSettings.promotional}
              onIonChange={() => handleNotificationToggle('promotional')}
            />
          </IonItem>
        </IonList>

        {/* App Preferences */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Preferences</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon icon={language} slot="start" />
            <IonLabel>Language</IonLabel>
            <IonSelect 
              value={appPreferences.language}
              onIonChange={e => handleAppPreferenceChange('language', e.detail.value)}
              interface="action-sheet"
            >
              <IonSelectOption value="english">English</IonSelectOption>
              <IonSelectOption value="spanish">Spanish</IonSelectOption>
              <IonSelectOption value="french">French</IonSelectOption>
              <IonSelectOption value="german">German</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonIcon icon={cash} slot="start" />
            <IonLabel>Currency</IonLabel>
            <IonSelect 
              value={appPreferences.currency}
              onIonChange={e => handleAppPreferenceChange('currency', e.detail.value)}
              interface="action-sheet"
            >
              <IonSelectOption value="USD">USD ($)</IonSelectOption>
              <IonSelectOption value="EUR">EUR (€)</IonSelectOption>
              <IonSelectOption value="GBP">GBP (£)</IonSelectOption>
              <IonSelectOption value="UGX">UGX (USh)</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonIcon icon={thermometer} slot="start" />
            <IonLabel>Temperature Unit</IonLabel>
            <IonRadioGroup 
              value={appPreferences.temperatureUnit}
              onIonChange={e => handleAppPreferenceChange('temperatureUnit', e.detail.value)}
            >
              <IonItem lines="none">
                <IonRadio value="C" labelPlacement="end">Celsius (°C)</IonRadio>
              </IonItem>
              <IonItem lines="none">
                <IonRadio value="F" labelPlacement="end">Fahrenheit (°F)</IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonItem>

          <IonItem>
            <IonIcon icon={resize} slot="start" />
            <IonLabel>Distance Unit</IonLabel>
            <IonRadioGroup 
              value={appPreferences.distanceUnit}
              onIonChange={e => handleAppPreferenceChange('distanceUnit', e.detail.value)}
            >
              <IonItem lines="none">
                <IonRadio value="km" labelPlacement="end">Kilometers (km)</IonRadio>
              </IonItem>
              <IonItem lines="none">
                <IonRadio value="mi" labelPlacement="end">Miles (mi)</IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonItem>
        </IonList>

        {/* Offline Content */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Offline Content</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonIcon icon={download} slot="start" />
            <IonLabel>
              <h3>Downloaded Maps</h3>
              <p>{offlineData.downloadedMaps.toFixed(1)} GB used</p>
            </IonLabel>
            <IonButton fill="outline" size="small">
              Manage
            </IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={documentText} slot="start" />
            <IonLabel>
              <h3>Travel Guides</h3>
              <p>{offlineData.downloadedGuides} MB used</p>
            </IonLabel>
            <IonButton fill="outline" size="small">
              Manage
            </IonButton>
          </IonItem>

          <IonItem button onClick={handleClearCache}>
            <IonIcon icon={trash} slot="start" color="danger" />
            <IonLabel color="danger">Clear All Offline Data</IonLabel>
          </IonItem>
        </IonList>

        {/* Privacy & Security */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Privacy & Security</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonIcon icon={location} slot="start" />
            <IonLabel>Share Location</IonLabel>
            <IonToggle 
              slot="end" 
              checked={privacySettings.shareLocation}
              onIonChange={() => handlePrivacyToggle('shareLocation')}
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={eye} slot="start" />
            <IonLabel>Public Profile</IonLabel>
            <IonToggle 
              slot="end" 
              checked={privacySettings.publicProfile}
              onIonChange={() => handlePrivacyToggle('publicProfile')}
            />
          </IonItem>

          <IonItem>
            <IonIcon icon={analytics} slot="start" />
            <IonLabel>Usage Data Collection</IonLabel>
            <IonToggle 
              slot="end" 
              checked={privacySettings.dataCollection}
              onIonChange={() => handlePrivacyToggle('dataCollection')}
            />
          </IonItem>

          <IonItem button>
            <IonIcon icon={shieldCheckmark} slot="start" />
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
        </IonList>

        {/* Support */}
        <IonList inset={true}>
          <IonListHeader>
            <IonLabel>Support</IonLabel>
          </IonListHeader>
          
          <IonItem button>
            <IonIcon icon={helpCircle} slot="start" />
            <IonLabel>Help & Support</IonLabel>
          </IonItem>
          
          <IonItem button>
            <IonIcon icon={documentText} slot="start" />
            <IonLabel>Terms & Conditions</IonLabel>
          </IonItem>
          
          <IonItem button>
            <IonIcon icon={shieldCheckmark} slot="start" />
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={informationCircle} slot="start" />
            <IonLabel>App Version</IonLabel>
            <IonNote slot="end">1.0.0</IonNote>
          </IonItem>
        </IonList>

        {/* Actions */}
        <div className="actions-section">
          <IonButton 
            expand="block" 
            fill="outline" 
            color="medium"
            onClick={() => setShowResetAlert(true)}
          >
            Reset to Defaults
          </IonButton>

          <IonButton 
            expand="block" 
            color="danger"
            onClick={() => setShowLogoutAlert(true)}
          >
            <IonIcon icon={logOut} slot="start" />
            Log Out
          </IonButton>
        </div>

        {/* Alerts */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header={'Log Out'}
          message={'Are you sure you want to log out?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Log Out',
              role: 'confirm',
              handler: handleLogout
            }
          ]}
        />

        <IonAlert
          isOpen={showResetAlert}
          onDidDismiss={() => setShowResetAlert(false)}
          header={'Reset Settings'}
          message={'This will reset all settings to their default values. This action cannot be undone.'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Reset',
              role: 'confirm',
              handler: handleResetSettings
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;