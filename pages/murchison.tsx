import React from 'react';
import {  IonPage,  IonHeader, IonToolbar,  IonTitle,  IonContent,  IonCard,  IonCardHeader,  IonCardTitle,  IonCardContent,  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { informationCircleOutline, planetOutline } from 'ionicons/icons';
import './Murchison.css';

import fallsImage from '../assets/murchison 1.jpg';
import parkImage from '../assets/field1.jpg';
import wildlifeImage from '../assets/murchison 1.jpg';
import birdingImage from '../assets/murchison 5.jpg';

const longText = {
  intro: `Murchison Falls (also called Kabalega Falls) is a spectacular waterfall on the Victoria Nile located in north-western Uganda inside Murchison Falls National Park. The Nile is forced through a narrow 7-metre gorge and plunges about 43 metres into the "Devil's Cauldron", producing thunderous spray and a dramatic vista. The falls are set inside Uganda's largest national park which combines great wildlife, excellent birding and scenic river landscapes.`,

  geography: `Geology & Landscape\nThe Victoria Nile squeezes through a narrow rock gorge then falls into a plunge pool. Downstream the river continues toward Lake Albert. Vegetation around the park includes savanna grasslands, riverine forest, and forest remnants in nearby protected areas such as Budongo.`,

  history: `History & Naming\nSamuel White Baker (a British explorer) named the falls after Sir Roderick Murchison, President of the Royal Geographical Society at the time. The area was later protected and the national park was officially established in 1952. The falls have also sometimes been known as Kabalega Falls (after the Omukama Kabalega).`,

  wildlife: `Wildlife & Biodiversity\nMurchison Falls National Park is home to many large mammals including elephants, Rothschild's giraffe, buffalo, lions, leopards, Uganda kob, hippos and Nile crocodiles. The park supports a high number of mammal species and an outstanding bird list (over 400 species reported in various sources), including the rare shoebill stork. The river and gorge create important aquatic habitats for hippos, crocodiles, and waterbirds.`,

  tourism: `Tourism & Activities\nPopular activities: boat cruises to the base of the falls, game drives across the park, hiking to the Top of the Falls viewpoint, birdwatching, chimp tracking in nearby forest areas (Budongo) and guided nature walks. Dry seasons (roughly Dec–mid-Feb and Jun–Jul) often make access easier and wildlife viewing better. Many visitors spend 2–3 nights to cover the falls, a boat trip and game drives; a day trip is possible but short.`,

  conservation: `Conservation & Challenges\nThe park has faced pressures from poaching in past decades and from development proposals that could affect the river and its habitats. Ongoing conservation work includes ranger patrols, community engagement and promoting sustainable tourism. Protecting wildlife corridors and reducing illegal hunting remain priorities.`,

  practical: `Practical Info & Tips\n• Location & access: roughly 300–305 km from Kampala (a 4½–6 hour drive depending on road conditions).\n• Park fees: visitors typically pay entrance fees (fees change over time—check official sources before travel).\n• Accommodation: options range from budget camps to mid-range and luxury lodges both inside and near the park.\n• What to pack: walking shoes, binoculars, sun protection, insect repellent, a waterproof/windproof layer for spray near the falls.\n• Safety: the gorge and rocks are slippery; remain on designated paths and follow park guides.`,

  why: `Why Murchison Falls is special\nThe combination of a dramatic waterfall produced where a large river is forced through a narrow gorge, plus extensive wildlife and birding, gives visitors a wide variety of experiences—scenic, adventurous and safari-style wildlife viewing. The "Top of the Falls" viewpoint and the boat cruises each provide very different perspectives of the same natural feature.`,

  sampleItinerary: `Suggested 2-day itinerary (from Kampala)\nDay 1: Early drive to Murchison Falls, check into lodge, afternoon game drive.\nDay 2: Early morning boat cruise on the Nile to the base of the falls, hike to Top of the Falls viewpoint, return to lodge and depart.\n(Adjust time and activities depending on arrival time and interests.)`,
};

const MurchisonFallsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Murchison Falls — Overview</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="hero">
          <img src={fallsImage} alt="Murchison Falls" />
          <div className="hero-overlay">
            <h1 className="hero-title">Murchison Falls — Victoria Nile, Uganda</h1>
          </div>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={parkImage} alt="Murchison Park" />
                <IonCardHeader>
                  <IonCardTitle>What & Where</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.intro}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <img className="section-image" src={wildlifeImage} alt="wildlife" />
                <IonCardHeader>
                  <IonCardTitle>Wildlife & Biodiversity</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.wildlife}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Tourism & Activities</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.tourism}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard className="section-card">
                <img className="section-image" src={fallsImage} alt="falls" />
                <IonCardHeader>
                  <IonCardTitle>Geology & Landscape</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.geography}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <img className="section-image" src={birdingImage} alt="birding" />
                <IonCardHeader>
                  <IonCardTitle>History & Naming</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.history}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Conservation & Practical Tips</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.conservation}\n\n{longText.practical}</IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12">
              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Why Murchison Falls is Special</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.why}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Sample Itinerary</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-mono">{longText.sampleItinerary}</IonCardContent>
              </IonCard>

              <IonCard className="section-card">
                <IonCardHeader>
                  <IonCardTitle>Quick Links & Actions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>📍 Distance from Kampala: ~300–305 km</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🕒 Best time to visit: Dry seasons (Dec–mid Feb, Jun–Jul)</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>🧳 Packing tips: Walking shoes, binoculars, sun protection</IonLabel>
                    </IonItem>
                  </IonList>
                  <div style={{display: 'flex', gap: 8, marginTop: 12}}>
                    <IonButton fill="outline" href="#" onClick={(e)=>e.preventDefault()}>
                      <IonIcon slot="start" icon={informationCircleOutline} /> More info
                    </IonButton>
                    <IonButton color="primary" routerLink='/plan'>
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

export default MurchisonFallsPage;
