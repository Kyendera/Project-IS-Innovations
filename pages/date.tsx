import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
} from '@ionic/react';
import './date.css';

const BasicInfo: React.FC = () => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleContinue = () => {
    console.log({ month, day, year, gender });
  };

  return (
    <IonPage>
      <IonContent className="basic-info-page">
        <div className="container">
          <h1 className="title">Basic information</h1>
          <p className="subtitle">Enter your birthday and gender</p>

          <div className="input-row">
            <IonSelect
              placeholder="Month"
              value={month}
              onIonChange={(e) => setMonth(e.detail.value)}
              className="input-box"
            >
              {months.map((m, i) => (
                <IonSelectOption key={i} value={m}>{m}</IonSelectOption>
              ))}
            </IonSelect>

            <IonInput
              placeholder="Day"
              type="number"
              value={day}
              onIonChange={(e) => setDay(e.detail.value!)}
              className="input-box"
            />

            <IonInput
              placeholder="Year"
              type="number"
              value={year}
              onIonChange={(e) => setYear(e.detail.value!)}
              className="input-box"
            />
          </div>

          <IonSelect
            placeholder="Gender"
            value={gender}
            onIonChange={(e) => setGender(e.detail.value)}
            className="input-box gender-box"
          >
            <IonSelectOption value="Male">Male</IonSelectOption>
            <IonSelectOption value="Female">Female</IonSelectOption>
            <IonSelectOption value="Other">Other</IonSelectOption>
          </IonSelect>

          <p className="note">Why we ask for your birthday and gender</p>

          <IonButton expand="block" onClick={handleContinue} className="continue-btn">
            Continue
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BasicInfo;
