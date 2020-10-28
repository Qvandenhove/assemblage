import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonToast, IonModal, IonSlides, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonInput, IonLabel } from '@ionic/react';
import SwiperCore, { Navigation, Pagination, EffectCube } from 'swiper';
import React, { useState } from 'react';
import { arrowBack } from "ionicons/icons"
import DemandeNote from '../components/demandeNote'
import helpers from '../helpers/helpers'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-cube/effect-cube.scss'
import './Tab3.css';
import SwiperTest from '../components/testSwiper';
import TestSwiper from '../components/testSwiper';

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
  const [thankModal, setThanksModal] = useState(false)
  // Vérification du formulaire
  document.addEventListener("deviceready", () => {console.log("ready")})
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-wrap">Avez vous quelque minutes pour nous dire ce vous en avez pensé ?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <TestSwiper/>
      {/* <IonSlides options={slideOpts} pager={true} className="questionnaire">
          <DemandeNote slider={document.querySelector("ion-slides")} nom="accueil" label="Que pensez vous de la qualité de l'accueil?" />
          <DemandeNote slider={document.querySelector("ion-slides")} nom="choix" label="Que pensez vous des choix proposés?" />
          <DemandeNote slider={document.querySelector("ion-slides")} nom="orientation" label="Que pensez vous de la qualité de l'orientation dans l'enceinte du bâtiment?" />
      </IonSlides>         */}
      {/* <IonItem color="secondary" key="prenom">
          <IonLabel position="stacked">Votre Prénom : </IonLabel>
          <IonInput name="prenom" type="text" placeholder="Prénom"></IonInput>
        </IonItem>
        <IonItem color="secondary" key="nom">
          <IonLabel position="stacked">Votre Nom : </IonLabel>
          <IonInput name="nom" type="text" placeholder="Nom"></IonInput>
        </IonItem>
        <IonItem color="secondary" key="email">
          <IonLabel position="stacked">Votre email : </IonLabel>
          <IonInput name="mail" type="email" placeholder="email"></IonInput>
        </IonItem>
        <IonItem key="Submit" color="secondary">
          <IonButton size="default" type="submit">Envoyer</IonButton>
        </IonItem> */}
        <IonToast message="Merci de remplir tout les champs" duration={2000} onDidDismiss={() => {setIsOpen(false)}} cssClass="errors" isOpen={isOpen} />
        <IonModal showBackdrop={false} cssClass="thanks" isOpen={thankModal}>
          <IonItem lines="none">
            <IonItem lines="none">Merci d'avoir rempli ce formulaire. Vos réponses on été soumises. Bonne journée à vous</IonItem>
            <IonButton className="centered" onClick={() => {setThanksModal(false)}}>Fermer</IonButton>
          </IonItem>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
