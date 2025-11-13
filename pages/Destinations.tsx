// import React from 'react';
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonContent,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardContent,
//   IonImg,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonRouterLink,
// } from '@ionic/react';
// import falls from "../assets/murchison 1.jpg";
// import Gorilla from "../assets/bwindi1.jpg";
// import animals from "../assets/murchison 3.jpg";
// import wathog from "../assets/kidepo1.jpg";
// import WildBeasts from "../assets/murchison 5.jpg";
// import './Destination.css';
// import bwindi from './bwindi';

// const destinations = [
//   {
//     id: 1,
//     name: "Murchison Falls",
//     description: "A breathtaking waterfall on the Nile River, known for its thunderous roar and beautiful scenery.",
//     image: falls,
//     IonRouterLink: './pages/murchison'
//   },
//   {
//     id: 2,
//     name: "Bwindi impenetrable forest",
//     description: "Bwindi is home to nearly half of the world’s remaining mountain gorillas.",
//     image: Gorilla,
//     Path:"/pages/bwindi"
//     },
//   {
//     id: 3,
//     name: "Queen Elizabeth National Gamepark",
//     description: "Visitors can enjoy game drives, boat cruises along the Kazinga Channel, chimpanzee tracking in Kyambura Gorge, birdwatching, and guided nature walks",
//     image: animals
//   },
//   {
//     id: 4,
//     name: "Kidepo valley",
//     description: "Explore Uganda’s amazing wildlife, from elephants to giraffes and warthogs roaming freely.",
//     image: wathog
  
//   },
// ];

// const Destinations: React.FC = () => {
//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar color="primary">
//           <IonTitle>Top Destinations</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen className="ion-padding">

//         {/* Video Hero Section */}
//         <div className="video-section">
//           <video className="hero-video" autoPlay muted loop controls>
//             <source src={WildBeasts} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <div className="video-overlay">
//             <h1 className="hero-text">Discover the Beauty of Uganda</h1>
//           </div>
//         </div>

//         {/* Destinations Grid */}
//         <IonGrid>
//           <IonRow>
//             {destinations.map((place) => (
//               <IonCol size="12" size-md="6" key={place.id}>
//                 <IonCard className="destination-card">
//                   <div className="image-container">
//                     <IonImg src={place.image} alt={place.name} className="destination-img" />
//                   </div>
//                   <IonCardHeader>
//                     <IonCardTitle className="destination-title">{place.name}</IonCardTitle>
//                   </IonCardHeader>
//                   <IonCardContent className="destination-description">
//                     {place.description}
//                   </IonCardContent>
//                 </IonCard>
//               </IonCol>
//             ))}
//           </IonRow>
//         </IonGrid>

//       </IonContent>
//     </IonPage>
//   );
// };

// export default Destinations;
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
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
} from '@ionic/react';

import falls from "../assets/murchison 1.jpg";
import Gorilla from "../assets/bwindi1.jpg";
import animals from "../assets/murchison 3.jpg";
import wathog from "../assets/kidepo1.jpg";
import WildBeasts from "../assets/murchison 5.jpg";

import './Destination.css';
import './murchison';


const destinations = [
  {
    id: 1,
    name: "Murchison Falls",
    description:
      "A breathtaking waterfall on the Nile River, known for its thunderous roar and beautiful scenery.",
    image: falls,
    path: "/murchison",
  },
  {
    id: 2,
    name: "Bwindi Impenetrable Forest",
    description: "Bwindi is home to nearly half of the world’s remaining mountain gorillas.",
    image: Gorilla,
    path: "/bwindi",
  },
  {
    id: 3,
    name: "Queen Elizabeth National Gamepark",
    description:
      "Visitors can enjoy game drives, boat cruises along the Kazinga Channel, chimpanzee tracking in Kyambura Gorge, birdwatching, and guided nature walks.",
    image: animals,
    path: "/elizabeth",
  },
  {
    id: 4,
    name: "Kidepo Valley",
    description:
      "Explore Uganda’s amazing wildlife, from elephants to giraffes and warthogs roaming freely.",
    image: wathog,
    path: "/kidepo",
  },
];

const Destinations: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Top Destinations</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Video Hero Section */}
        <div className="video-section">
          <video className="hero-video" autoPlay muted loop controls>
            <source src={WildBeasts} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay">
            <h1 className="hero-text">Discover the Beauty of Uganda</h1>
          </div>
        </div>

        {/* Destinations Grid */}
        <IonGrid>
          <IonRow>
            {destinations.map((place) => (
              <IonCol size="12" size-md="6" key={place.id}>
                <IonRouterLink routerLink={place.path}>
                  <IonCard className="destination-card">
                    <div className="image-container">
                      <IonImg src={place.image} alt={place.name} className="destination-img" />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle className="destination-title">{place.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="destination-description">
                      {place.description}
                    </IonCardContent>
                  </IonCard>
                </IonRouterLink>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Destinations;

