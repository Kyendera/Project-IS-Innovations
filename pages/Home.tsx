import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSearchbar,
  IonButton,
} from "@ionic/react";
import {  menuOutline,  searchOutline,  heartOutline,
  playCircleOutline,
  homeOutline,
  mapOutline,
  locationOutline,
  shareSocialOutline,
  informationCircleOutline,
  micOutline,
  airplaneOutline,
  calendarOutline,
} from "ionicons/icons";

import beach from "../assets/beach.jpg";
import lake from "../assets/lake.jpg";
import forest from "../assets/forest.jpg";
import field from "../assets/field.jpg";
import travelVideo from "../assets/tour1.mp4";

import "./Home.css";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const destinations = [
    { title: "Beach", img: beach },
    { title: "Lake", img: lake },
    { title: "Forest", img: forest },
    { title: "Field", img: field },
  ];

  return (
    <IonPage>
      <IonContent className="home-content">
        {/* === Header === */}
        <div className="header">
          <div className="menu-container">
            <IonIcon
              icon={menuOutline}
              size="large"
              className="menu-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="menu-dropdown">
                <button className="menu-item">
                  <IonIcon icon={calendarOutline} /> Events
                </button>
                <button className="menu-item">
                  <IonIcon icon={locationOutline} /> Districts
                </button>
                <button className="menu-item">
                  <IonIcon icon={informationCircleOutline} /> Travel Desk
                </button>
                <button className="menu-item">
                  <IonIcon icon={airplaneOutline} /> Heli Tourism
                </button>
                <button className="menu-item">
                  <IonIcon icon={micOutline} /> Audio Guidance
                </button>
                <button className="menu-item">
                  <IonIcon icon={shareSocialOutline} /> Share
                </button>
              </div>
            )}
          </div>
          <img
            src="https://i.pravatar.cc/80"
            alt="Profile"
            className="profile-pic"
          />
        </div>

        {/* === Greeting === */}
        <div className="greeting">
          <h2>Hello Sir👋,</h2>
          <p>Plan your next adventure</p>
        </div>

        {/* === Hero Image === */}
        <div className="main-image-container">
          <img src={beach} alt="Main Destination" className="main-image" />
          <div className="sidebar-gradient"></div>
          <div className="main-image-text">Welcome to Uganda 🇺🇬</div>
        </div>

        {/* === Search Bar === */}
        <div className="search-container">
          <IonSearchbar placeholder="Search your destination" animated />
          <IonIcon icon={searchOutline} className="search-icon" />
        </div>

        {/* === Video Section === */}
        <div className="video-container">
          <video
            src={travelVideo}
            controls
            autoPlay
            loop
            muted
            className="video"
          />
          <div className="video-overlay">
            <IonIcon icon={playCircleOutline} className="play-icon" />
          </div>
          <div className="video-caption">
            Explore the Beauty of Uganda 🇺🇬
          </div>
        </div>

        {/* === Destination Slider === */}
        <div className="slider-container">
          <div className="slider">
            {destinations.map((item, i) => (
              <div key={i} className="slider-card">
                <img src={item.img} alt={item.title} className="slider-image" />
                <div className="slider-gradient"></div>
                <div className="heart-icon">
                  <IonIcon icon={heartOutline} />
                </div>
                <h3 className="slider-title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* === Plan a Trip Button === */}
        <div className="button-container">
          <IonButton expand="block" className="plan-button" routerLink="/plan">
            Plan a Trip
          </IonButton>
        </div>

      
      </IonContent>
    </IonPage>
  );
};

export default Home;
