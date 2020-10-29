import { IonItem, IonLabel, IonRadioGroup, IonRadio, IonTextarea, IonSlide, IonCol, IonGrid, IonRow, IonIcon } from '@ionic/react'
import { heart, heartHalf, heartDislike, thumbsDown, thumbsUp } from 'ionicons/icons'
import React, { Fragment } from 'react'

interface demandeNoteProps {
    nom:string
    label:string
    slider:any
    valueSetter:any
}

const DemandeNote:React.FC<demandeNoteProps> = ({nom, label, slider, valueSetter}) =>{
    const notes = [heartDislike, thumbsDown, heartHalf, thumbsUp, heart]
    return(
        <Fragment>
            {/* <IonSlide> */}
                    <IonGrid className="slide">
                        <IonRow className="question">
                            <IonCol class="ion-text-center">
                                <IonLabel className="question ion-text-wrap" position="stacked">{label}</IonLabel>
                            </IonCol>
                        </IonRow>
                            <IonRadioGroup onIonChange={(e) => {
                                if(e.detail.value){
                                    setTimeout(() => {
                                        document.querySelector(".swiper-slide-active").classList.remove("swiper-slide-active")}, 180)
                                        setTimeout(() =>{
                                            slider.slideNext()
                                        }, 200)
                                        valueSetter(e.detail.value)
                                }
                            }} allowEmptySelection={true} name={`${nom}Note`}>
                                <IonRow className="notes" color="secondary">
                                {notes.map((note, index) => {return (
                                <IonCol className="note" key={index} color="secondary">
                                    <IonItem color="secondary" lines="none">
                                        <IonLabel className="reponse" position="fixed">
                                            <IonIcon className="feedback" icon={note} />
                                        </IonLabel>
                                        <IonRadio slot="start" value={index + 1} name={`${nom}Note`} />
                                    </IonItem>

                                </IonCol>)
                                })}
                                    </IonRow>
                            </IonRadioGroup>                        
                    </IonGrid>
        </Fragment>
    )
}

export default DemandeNote