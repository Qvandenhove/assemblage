import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/swiper-bundle.css';
import 'swiper/swiper.scss'
// import 'swiper/components/effect-flip/effect-flip.scss'
import 'swiper/components/effect-fade/effect-fade.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/navigation/navigation.scss'
import DemandeNote from './demandeNote';
import SlideBack from './slideBack';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

let slider = null
const TestSwiper:React.FC = () => {
    // const slides = []
    // for (let i =0;i<5;i++){
    //     slides.push(<SwiperSlide key={`slide-${i}`}><img src={`http://picsum.photos/id/${i+1}/500/300`} alt={`slide${i}`} /></SwiperSlide>)
    // }
    // document.addEventListener("ionViewDidLoad", () => {if(slider){setTimeout(slider.update(), 200); console.log("coucou")}})
    if(slider){setTimeout(() => {slider.update()}, 200)}
    return (
        <Swiper className="questionnaire" preloadImages={true} updateOnImagesReady={true} onSwiper={(swiper) => {slider = swiper}} allowTouchMove={false} effect="fade" pagination id="main" >
            <SwiperSlide key={`Slide 2`}>
                <DemandeNote slider={slider}  nom="accueil" label="Que pensez vous de la qualité de l'accueil?" />
            </SwiperSlide>
            <SwiperSlide key={`Slide 3`}>
                <IonGrid>
                    <IonRow>
                        <DemandeNote slider={slider}  nom="choix" label="Que pensez vous des choix proposés?" />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <SlideBack slider={slider} />
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide key={`Slide 4`}>
                <IonGrid>
                    <IonRow>
                        <DemandeNote slider={slider} nom="orientation" label="Que pensez vous de la qualité du guidage dans l'enceinte du bâtiment?" />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <SlideBack slider={slider} />
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide key={"Slide 7"}>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size='6'>Le questionnaire est maintenant terminé voulez vous soumettre ces réponses ?</IonCol>
                    </IonRow>
                    <IonRow class="ion-justify-content-around">
                        <IonCol size="3">
                            <IonButton onClick={() => {slider.slidePrev()}} fill="outline">Retour</IonButton>
                        </IonCol>
                        <IonCol size="3">
                            <IonButton>Confirmer</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
        </Swiper>
    )
}

export default TestSwiper