import { IonItem, IonLabel, IonRadioGroup, IonRadio, IonTextarea, IonSlide, IonCol, IonGrid, IonRow, IonIcon } from '@ionic/react'
import { heart, heartHalf, heartDislike, thumbsDown, thumbsUp } from 'ionicons/icons'
import React, { Fragment } from 'react'

interface demandeNoteProps {
    nom:string
    label:string
    slider:any
}

const DemandeNote:React.FC<demandeNoteProps> = ({nom, label, slider}) =>{
    // const notes = ["Pas du tout satisfait", "Insatisfait", "Moyennement satisfait", "Satisfait", "Complètement satisfait"]
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
                            <IonRadioGroup allowEmptySelection={true} name={`${nom}Note`}>
                                <IonRow className="notes" color="secondary">
                                {notes.map((note, index) => {return (
                                <IonCol className="note" key={index} color="secondary">
                                    <IonItem color="secondary" lines="none">
                                        <IonLabel className="reponse" position="fixed">
                                            <IonIcon className="feedback" icon={note} />
                                        </IonLabel>
                                        <IonRadio onClick={() => {
                                            setTimeout(() =>{slider.slideNext()}, 200)
                                        }} slot="start" value={index} name={`${nom}Note`} />
                                    </IonItem>

                                </IonCol>)
                                })}
                                    </IonRow>
                            </IonRadioGroup>                        
                    </IonGrid>
                        {/* <IonLabel className="question ion-text-wrap" position="stacked">{label}</IonLabel>
                        <IonRadioGroup allowEmptySelection={true} name={`${nom}Note`}>
                            {notes.map((note, index) => {return (
                            <IonItem key={index} color="secondary">
                                <IonLabel className="reponse" position="fixed">
                                    {note}
                                </IonLabel>
                                <IonRadio onIonFocus={(e) =>  {
                                let group = document.querySelector(`ion-radio-group[name=${nom}Note]`)
                                // let test = group.children[index]
                                group.children[index].classList.add("selected")
                                }} onIonBlur={(e) => {console.log("Vous avez retiré votre note")}} slot="start" value={index} name={`${nom}Note`} />
                                </IonItem>)
                            })}
                        </IonRadioGroup> */}
                        {/* <IonItem color="secondary">
                            <IonLabel className="commentaire ion-text-wrap" position="stacked">Dites nous en plus sur votre avis.</IonLabel>
                            <IonTextarea maxlength={255} name={`${nom}Comment`}></IonTextarea>
                        </IonItem> */}
            {/* </IonSlide> */}
        </Fragment>
    )
}

export default DemandeNote