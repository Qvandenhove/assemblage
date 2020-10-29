import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonToast, IonModal, IonSlides, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonInput, IonLabel, IonLoading } from '@ionic/react';
import SwiperCore, { Navigation, Pagination, EffectCube } from 'swiper';
import React, { useState } from 'react';
import { paperPlane } from "ionicons/icons"
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-cube/effect-cube.scss'
import './Tab3.css';
import Questionnaire from '../components/questionnaire';
import App from '../App';

const Tab3: React.FC = () => {
  
  SwiperCore.use([Navigation, Pagination, EffectCube])
  const slideOpts = {
    slidesPerView: 1,
    allowTouchMove:false,
    cubeEffect : {
      shadow: false,
      slideShadow: true
    }
  }
  //  statut d'ouverture des modals et taosts
  const [isOpen, setIsOpen] = useState(false)
  const [sendingState, setsendingState] = useState("awaiting")
  document.addEventListener("deviceready", () => {console.log("ready")})
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-wrap">Avez vous quelque minutes pour nous dire ce vous en avez pensé ?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <Questionnaire sendingStateSetter={setsendingState}/>
        <IonToast message="Merci de remplir tout les champs" duration={2000} onDidDismiss={() => {setIsOpen(false)}} cssClass="errors" isOpen={isOpen} />
        {sendingState == "sending" ? <IonLoading showBackdrop={false} message="Nous réceptionnons vos données veuillez patienter" isOpen={sendingState == "sending"} /> :(
          <IonModal backdropDismiss={false} showBackdrop={false} cssClass="thanks" isOpen={sendingState == "done"}>
          <IonGrid color="primary">
            <IonRow color="primary">
              <IonCol color="primary">
                <IonItem color="primary" lines="none">
                  <IonItem className="ion-text-center thanks" color="primary" lines="none">Merci d'avoir rempli ce formulaire. Vos réponses on été soumises. Bonne journée à vous</IonItem>
                </IonItem>
              </IonCol>
            </IonRow>
              <IonRow class="justify-content-center">
                <IonCol size="12">
                  <IonIcon icon={paperPlane} class="ion-margin-top paperPlane" />
                </IonCol>
                <IonCol>
                  <IonButton href="/tab1" class="ion-margin-top">Quitter</IonButton>
                </IonCol>
              </IonRow>
          </IonGrid>
        </IonModal>
        ) }
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
