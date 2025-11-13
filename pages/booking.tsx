import React, { useState } from "react";
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import "./booking.css";

const BookingPage: React.FC = () => {
  const location = useLocation<{ itinerary: any }>();
  const itinerary = location.state?.itinerary;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${fullName}. Details sent to ${email}.`);
  };

  return (
    <IonPage className="booking-page">
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Confirm Your Booking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="booking-content ion-padding">
        <IonCard className="booking-card">
          <IonCardHeader>
            <IonCardTitle>Traveler Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Full Name</IonLabel>
              <IonInput value={fullName} onIonChange={(e) => setFullName(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Phone Number</IonLabel>
              <IonInput type="tel" value={phone} onIonChange={(e) => setPhone(e.detail.value!)} />
            </IonItem>

            {itinerary && (
              <div className="summary">
                <h3>Booking Summary</h3>
                <p><strong>Destination:</strong> {itinerary.parkName}</p>
                <p><strong>Days:</strong> {itinerary.numDays}</p>
                <p><strong>Travelers:</strong> {itinerary.travelers}</p>
                <p><strong>Total:</strong> ${itinerary.totalEstimate.toFixed(2)}</p>
              </div>
            )}

            <IonButton expand="block" color="primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default BookingPage;
