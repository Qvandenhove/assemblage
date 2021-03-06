import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css'
import './background.css'
import helpers from '../helpers/helpers'
import Formation from '../components/formation'

const Tab1: React.FC = () => {
  const [formations, setFormations] = useState([])
  useEffect(() => {
    helpers.getFormations().then((listeFormations:any) => {
      setFormations(listeFormations)
    })
  }, [])
  return (
    <IonPage className="Content">
      <IonHeader>
        <IonToolbar >
          <IonTitle>Liste des formations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="Content" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Liste des formations disponibles</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="formations">
          <IonCardHeader className="niveau">
            <IonCardTitle>Formations</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSlides pager={true} options={{slidesPerView:2}}>
              {formations.map((formation:any) => {return <IonSlide key={formation.id}><Formation name={formation.datas.name} niveau={formation.datas.level} domaine={formation.datas.type}/></IonSlide>})}
            </IonSlides>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
