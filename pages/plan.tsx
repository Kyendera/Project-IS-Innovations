import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonText,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
//import html2canvas from "html2canvas";
//import jsPDF from "jspdf";
import "./plan.css";

// --- IMPORTS (same as your original) ---
import bwindiImg1 from "../assets/bwindi1.jpg";
import bwindiImg2 from "../assets/bwindi2.jpg";
import bwindiImg3 from "../assets/bwindi 3.jpg";
import bwindiImg4 from "../assets/bwindi4.jpg";
import bwindiImg5 from "../assets/bwindi2.jpg";

import queenImg1 from "../assets/elizabeth2.jpg";
import queenImg2 from "../assets/elizabeth1.jpg";
import queenImg3 from "../assets/elizabeth3.jpg";
import queenImg4 from "../assets/elizabeth7.jpg";
import queenImg5 from "../assets/elizabeth5.jpg";

import murchisonImg1 from "../assets/murchison 1.jpg";
import murchisonImg2 from "../assets/murchison 2.jpg";
import murchisonImg3 from "../assets/murchison 3.jpg";
import murchisonImg4 from "../assets/murchison 4.jpg";
import murchisonImg5 from "../assets/murchison 5.jpg";

import kidepoImg1 from "../assets/kidepo1.jpg";
import kidepoImg2 from "../assets/kidepo2.jpg";
import kidepoImg3 from "../assets/kidepo3.jpg";
import kidepoImg4 from "../assets/kidepo6.jpg";
import kidepoImg5 from "../assets/kidepo5.jpg";

const parkData: Record<string, any> = {
  bwindi: {
    name: "Bwindi Impenetrable Forest",
    images: [bwindiImg1, bwindiImg2, bwindiImg3, bwindiImg4, bwindiImg5],
    activities: ["Gorilla Trekking", "Nature Walks", "Bird Watching", "Community Visits"],
    accommodation: ["Bwindi Lodge", "Gorilla Mist Camp", "Silverback Lodge", "Mahogany Springs"],
    avgCost: 180,
    transport: "Travel by road via Kabale (approx. 9 hours from Kampala) or fly to Kisoro airstrip",
    bestTimeToVisit: "June to August, December to February",
    highlights: ["Mountain Gorillas", "Over 120 mammal species", "350+ bird species", "Butterfly diversity"],
    climate: "Tropical rainforest with temperatures 7°C-20°C",
    difficulty: "Moderate to Challenging (gorilla trekking involves hiking)",
    activityCost: 80,
    parkFee: 40,
  },
  queen: {
    name: "Queen Elizabeth National Park",
    images: [queenImg1, queenImg2, queenImg3, queenImg4, queenImg5],
    activities: ["Boat Cruise", "Game Drive", "Kazinga Channel Visit", "Lion Tracking"],
    accommodation: ["Mweya Safari Lodge", "Enganzi Lodge", "Pumba Safari Cottages", "Kyambura Gorge Lodge"],
    avgCost: 150,
    transport: "Road trip via Fort Portal or Mbarara (approx. 7 hours from Kampala)",
    bestTimeToVisit: "January to February, June to July",
    highlights: ["Tree-climbing lions", "Kazinga Channel", "Over 95 mammal species", "600+ bird species"],
    climate: "Tropical with temperatures 18°C-28°C",
    difficulty: "Easy to Moderate",
    activityCost: 60,
    parkFee: 35,
  },
  murchison: {
    name: "Murchison Falls National Park",
    images: [murchisonImg1, murchisonImg2, murchisonImg3, murchisonImg4, murchisonImg5],
    activities: ["Top of the Falls Visit", "Game Drive", "Boat Safari", "Bird Watching"],
    accommodation: ["Paraa Safari Lodge", "Pakuba Lodge", "Fort Murchison", "Nile Safari Lodge"],
    avgCost: 160,
    transport: "Road via Masindi (approx. 6 hours from Kampala) or charter flight",
    bestTimeToVisit: "December to February",
    highlights: ["Murchison Falls", "Nile River", "Big Five", "Budongo Forest"],
    climate: "Tropical with temperatures 23°C-32°C",
    difficulty: "Easy to Moderate",
    activityCost: 70,
    parkFee: 35,
  },
  kidepo: {
    name: "Kidepo Valley National Park",
    images: [kidepoImg1, kidepoImg2, kidepoImg3, kidepoImg4, kidepoImg5],
    activities: ["Nature Walk", "Cultural Visit", "Game Drive", "Bird Watching"],
    accommodation: ["Apoka Lodge", "Nga'Moru Wilderness Camp", "Savanna Lodge", "Kidepo Safari Lodge"],
    avgCost: 220,
    transport: "Fly from Entebbe or road trip via Gulu (approx. 10 hours from Kampala)",
    bestTimeToVisit: "November to April",
    highlights: ["Wilderness experience", "Cultural encounters", "Cheetahs", "Ostriches"],
    climate: "Semi-arid with temperatures 25°C-35°C",
    difficulty: "Moderate (remote location)",
    activityCost: 50,
    parkFee: 45,
  },
};

const TripPlanner: React.FC = () => {
  const [selectedPark, setSelectedPark] = useState<string>("");
  const [numDays, setNumDays] = useState<number>(3);
  const [travelers, setTravelers] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [itinerary, setItinerary] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const history = useHistory();

  const calculateCosts = (parkKey: string, days: number, travelers: number) => {
    const park = parkData[parkKey];
    const accommodation = park.avgCost * days * travelers;
    const transport = 120 * travelers;
    const activities = park.activityCost * days * travelers;
    const parkFees = park.parkFee * days * travelers;
    return {
      accommodation,
      transport,
      activities,
      parkFees,
      total: accommodation + transport + activities + parkFees,
    };
  };

  const generateItinerary = async () => {
    if (!selectedPark || !startDate) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    const park = parkData[selectedPark];
    const costs = calculateCosts(selectedPark, numDays, travelers);
    setItinerary({
      totalEstimate: costs.total,
      parkName: park.name,
      travelers,
      numDays,
    });
    setIsGenerating(false);
  };

  const handleDownloadPDF = async () => {
    const content = document.body;
    //const canvas = await html2canvas(content);
    //const imgData = canvas.toDataURL("image/png");
    //const pdf = new jsPDF();
    //pdf.addImage(imgData, "PNG", 10, 10, 190, 280);
    //pdf.save("Uganda_Trip_Itinerary.pdf");
  };

  const handleBooking = () => {
    history.push({
      pathname: "/booking",
      state: { itinerary },
    });
  };

  const CardSlider: React.FC<{ parkKey: string }> = ({ parkKey }) => {
    const park = parkData[parkKey];
    const totalImages = park.images.length;
    return (
      <div className="css-card-slider">
        <div className="slider-container">
          <div className="slider-track">
            {park.images.map((img: string, i: number) => (
              <div
                key={i}
                className={`slider-card ${i === selectedImageIndex ? "active" : ""}`}
                onClick={() => setSelectedImageIndex(i)}
                style={{
                  transform: `rotateY(${(i - selectedImageIndex) * 15}deg) translateX(${(i - selectedImageIndex) * 80}px)`,
                }}
              >
                <IonImg src={img} alt="park" className="card-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <IonPage className="trip-planner-page">
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Uganda Safari Trip Planner</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="trip-content">
        <div className="background-overlay"></div>

        <IonCard className="planner-card">
          <IonCardHeader>
            <IonCardTitle>Plan Your Safari</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Destination Park</IonLabel>
              <IonSelect value={selectedPark} placeholder="Select" onIonChange={(e) => setSelectedPark(e.detail.value)}>
                {Object.keys(parkData).map((key) => (
                  <IonSelectOption key={key} value={key}>
                    {parkData[key].name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Start Date</IonLabel>
              <IonInput type="date" value={startDate} onIonChange={(e) => setStartDate(e.detail.value!)} />
            </IonItem>

            <IonItem>
              <IonLabel>Days</IonLabel>
              <IonInput type="number" value={numDays} onIonChange={(e) => setNumDays(Number(e.detail.value))} />
            </IonItem>

            <IonItem>
              <IonLabel>Travelers</IonLabel>
              <IonInput type="number" value={travelers} onIonChange={(e) => setTravelers(Number(e.detail.value))} />
            </IonItem>

            <IonButton expand="block" color="success" onClick={generateItinerary} disabled={isGenerating}>
              {isGenerating ? <IonSpinner name="crescent" /> : "Generate Itinerary"}
            </IonButton>
            {isGenerating && <IonText color="medium">Please wait — preparing your safari experience...</IonText>}
          </IonCardContent>
        </IonCard>

        {selectedPark && <CardSlider parkKey={selectedPark} />}

        {itinerary && (
          <IonCard className="itinerary-card">
            <IonCardHeader>
              <IonCardTitle>Your Trip Summary</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Destination:</strong> {itinerary.parkName}</p>
              <p><strong>Travelers:</strong> {itinerary.travelers}</p>
              <p><strong>Days:</strong> {itinerary.numDays}</p>
              <p><strong>Total Estimate:</strong> ${itinerary.totalEstimate.toFixed(2)}</p>
              <IonButton expand="block" color="primary" onClick={handleBooking}>
                Book This Trip
              </IonButton>
              <IonButton expand="block" color="tertiary" onClick={handleDownloadPDF}>
                Download PDF Itinerary
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TripPlanner;
