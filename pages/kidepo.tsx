import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { informationCircleOutline, planetOutline } from 'ionicons/icons';
import './Kidepo.css';

// --- Replace these with your real assets ---
import kidepoHero from '../assets/kidepo6.jpg';
import kidepoSavanna from '../assets/kidepo5.jpg';
import kidepoWildlife from '../assets/kidepo5.jpg';
import kidepoBirding from '../assets/kidepo7.jpg';

const kidepoInfo = {
  intro: `Kidepo Valley National Park is Uganda's most remote wildlife park, located in northeastern Uganda near the borders with South Sudan and Kenya. Covering about 1,442 km², it features semi-arid savanna, rugged mountains, rivers, and valleys.`,

  wildlife: `Kidepo is home to abundant wildlife including lions, leopards, cheetahs, elephants, giraffes, zebras, African buffalo, warthogs, oribi, and rare species such as striped hyenas and ostriches. Over 475 bird species have been recorded, making it a birdwatcher's paradise.`,

  activities: `Visitors enjoy game drives, guided nature walks, bird watching, cultural visits to the Karamojong communities, and staying in safari lodges or camping under the stars. The open savanna makes wildlife spotting and photography excellent.`,

  access: `From Kampala: approximately 10–12 hours by road. Small charter flights are available to Kitgum or Kidepo airstrip. The park's remoteness provides a truly adventurous safari experience.`,

  bestTime: `Dry seasons (December–March and June–August) are ideal for game viewing. Wet seasons (April–May and September–November) offer lush scenery, but some roads may be muddy.`,

  conservation: `Kidepo is managed by Uganda Wildlife Authority, with efforts focused on anti-poaching patrols, habitat preservation, and community engagement. Its remote nature helps protect rare species and pristine landscapes.`
};

const Kidepo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kidepo Valley National Park</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Hero Section */}
        <div className="hero">
          <img src={kidepoHero} alt="Kidepo Valley" />
          <div className="hero-overlay">
            <h1 className="hero-title">Discover Kidepo — Uganda’s Remote Wilderness</h1>
          </div>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={kidepoSavanna} alt="Savanna" />
                <IonCardHeader>
                  <IonCardTitle>About Kidepo</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{kidepoInfo.intro}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <img className="section-image" src={kidepoWildlife} alt="Wildlife" />
                <IonCardHeader>
                  <IonCardTitle>Wildlife Highlights</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{kidepoInfo.wildlife}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Activities</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{kidepoInfo.activities}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={kidepoBirding} alt="Birding" />
                <IonCardHeader>
                  <IonCardTitle>Access & Best Time</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{kidepoInfo.access}{"\n\n"}{kidepoInfo.bestTime}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Conservation</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{kidepoInfo.conservation}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Quick Actions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>📍 Location: Northeastern Uganda</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🦁 Famous for remote wilderness and abundant wildlife</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🌿 Semi-arid savanna, rivers, and rugged mountains</IonLabel>
                    </IonItem>
                  </IonList>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <IonButton fill="outline" href="#" onClick={e => e.preventDefault()}>
                      <IonIcon slot="start" icon={informationCircleOutline} /> More info
                    </IonButton>
                    <IonButton color="primary" href="#" onClick={e => e.preventDefault()}>
                      <IonIcon slot="start" icon={planetOutline} /> Plan trip
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Kidepo;
