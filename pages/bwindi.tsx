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
import './bwindi.css';

// --- Replace these with your real assets ---
import bwindiHero from '../assets/bwindi1.jpg';
import bwindiForest from '../assets/bwindi2.jpg';
import bwindiWildlife from '../assets/bwindi 3.jpg';
import bwindiBirding from '../assets/bwindi4.jpg';

const bwindiInfo = {
  intro: `Bwindi Impenetrable Forest National Park is a UNESCO World Heritage Site located in southwestern Uganda. It covers about 321 km² of dense rainforest, known as one of the oldest forests on Earth and called \"Impenetrable\" due to its thick vegetation and rugged terrain.`,

  gorillas: `Bwindi is home to nearly half of the world’s remaining mountain gorillas. Visitors can trek to see habituated gorilla families and spend one magical hour with them, experiencing one of Africa’s most profound wildlife encounters.`,

  biodiversity: `Bwindi is biologically rich: over 120 mammal species, more than 350 bird species (including 23 Albertine Rift endemics), 220 butterfly species, and over 1,000 flowering plant species. It supports elephants, forest duikers, bush pigs, primates, and the rare mountain gorilla.`,

  activities: `Popular activities include gorilla trekking, birdwatching, guided forest walks, nature hikes, and community visits to meet the Batwa people. The park has four trekking sectors: Buhoma, Ruhija, Rushaga, and Nkuringo.`,

  access: `From Kampala/Entebbe: 8–10 hours by road. From Kisoro or Kabale: 1–2 hours. Charter flights are also available to Kisoro or Kihihi airstrips.`,

  bestTime: `Dry seasons (June–August and December–February) are ideal for trekking and wildlife viewing. Rainy months are quieter and greener but trails can be muddy.`,

  conservation: `Bwindi is critical for mountain gorilla survival and biodiversity. Conservation efforts involve local communities, tourism revenue sharing, ranger patrols, and habitat protection. Gorilla permits help fund healthcare, education, and park protection.`
};

const Bwindi: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bwindi Impenetrable Forest</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Hero Section */}
        <div className="hero">
          <img src={bwindiHero} alt="Bwindi Forest" />
          <div className="hero-overlay">
            <h1 className="hero-title">Explore Bwindi — Uganda's Ancient Rainforest</h1>
          </div>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={bwindiForest} alt="Forest" />
                <IonCardHeader>
                  <IonCardTitle>About Bwindi</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{bwindiInfo.intro}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <img className="section-image" src={bwindiWildlife} alt="Wildlife" />
                <IonCardHeader>
                  <IonCardTitle>Gorillas & Wildlife</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{bwindiInfo.gorillas}{"\n\n"}{bwindiInfo.biodiversity}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Activities</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{bwindiInfo.activities}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={bwindiBirding} alt="Birding" />
                <IonCardHeader>
                  <IonCardTitle>Access & Best Time</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{bwindiInfo.access}{"\n\n"}{bwindiInfo.bestTime}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Conservation</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{bwindiInfo.conservation}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Quick Actions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>📍 Location: Southwestern Uganda</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🦍 Famous for Mountain Gorillas</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🌿 Oldest rainforest — UNESCO World Heritage Site</IonLabel>
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

export default Bwindi;
