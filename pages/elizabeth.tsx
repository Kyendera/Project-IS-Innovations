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
import './elizabeth.css';

// --- Replace these with your real assets ---
import queenHero from '../assets/elizabeth5.jpg';
import queenSavanna from '../assets/elizabeth2.jpg';
import queenWildlife from '../assets/elizabeth1.jpg';
import queenBirding from '../assets/elizabeth7.jpg';

const queenInfo = {
  intro: `Queen Elizabeth National Park (QENP) is Uganda's most visited wildlife park, located in western Uganda, spanning 1,978 km². The park features a mix of savanna, forest, wetlands, and crater lakes, offering diverse landscapes and habitats for a wide range of animals.`,

  wildlife: `The park is famous for its high diversity of wildlife: elephants, lions, leopards, hippos, buffaloes, Uganda kob, chimpanzees in Kyambura Gorge, and over 600 bird species. The Kazinga Channel is particularly famous for boat safaris and observing hippos and crocodiles.`,

  activities: `Visitors can enjoy game drives, boat cruises along the Kazinga Channel, chimpanzee tracking in Kyambura Gorge, birdwatching, and guided nature walks. Scenic viewpoints and crater lakes add to the park's charm.`,

  access: `From Kampala: approximately 8–10 hours by road. From Entebbe Airport: 7–9 hours. Small charter flights can land at Kasese or Mweya airstrips.`,

  bestTime: `Dry seasons (June–August and December–February) are best for wildlife spotting and game drives. Wet seasons make the landscape greener and quieter, but some trails may be muddy.`,

  conservation: `QENP is a critical conservation area managed by Uganda Wildlife Authority. Ongoing efforts focus on anti-poaching patrols, community engagement, and sustainable tourism to protect wildlife and ecosystems. Revenue from tourism supports local communities and conservation projects.`
};

const QueenElizabeth: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Queen Elizabeth National Park</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Hero Section */}
        <div className="hero">
          <img src={queenHero} alt="Queen Elizabeth NP" />
          <div className="hero-overlay">
            <h1 className="hero-title">Explore Queen Elizabeth National Park</h1>
          </div>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={queenSavanna} alt="Savanna" />
                <IonCardHeader>
                  <IonCardTitle>About QENP</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{queenInfo.intro}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <img className="section-image" src={queenWildlife} alt="Wildlife" />
                <IonCardHeader>
                  <IonCardTitle>Wildlife Highlights</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{queenInfo.wildlife}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Activities</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{queenInfo.activities}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={queenBirding} alt="Birding" />
                <IonCardHeader>
                  <IonCardTitle>Access & Best Time</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{queenInfo.access}{"\n\n"}{queenInfo.bestTime}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Conservation</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{queenInfo.conservation}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Quick Actions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>📍 Location: Western Uganda</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🦁 Famous for diverse wildlife and the Kazinga Channel</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🌿 Mixture of savanna, forests, wetlands, and crater lakes</IonLabel>
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

export default QueenElizabeth;
