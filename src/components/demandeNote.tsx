import { IonItem, IonLabel, IonRadioGroup, IonRadio, IonTextarea } from '@ionic/react'
import React, { Fragment } from 'react'

interface demandeNoteProps {
    nom:string
    label:string
}

const DemandeNote:React.FC<demandeNoteProps> = ({nom, label}) =>{
    const notes = ["Pas du tout satisfait", "Insatisfait", "Moyen", "Satisfait", "Complètement satisfait"]
    return(
        <Fragment>
            <IonItem color="secondary">
                    <IonLabel className="question ion-text-wrap" position="stacked">{label}</IonLabel>
                    <IonRadioGroup allowEmptySelection={true} name={`${nom}Note`}>
                        {notes.map((note, index) => {return <Fragment key={index}><IonItem color="secondary"><IonLabel className="reponse" position="fixed">{note}</IonLabel><IonRadio slot="start" value={index} name={`${nom}Note`} /></IonItem></Fragment>})}
                    </IonRadioGroup>
                    <IonItem color="secondary">
                        <IonLabel className="commentaire ion-text-wrap" position="stacked">Dites nous en plus sur votre avis.</IonLabel>
                        <IonTextarea maxlength={255} name={`${nom}Comment`}></IonTextarea>
                    </IonItem>
            </IonItem>
        </Fragment>
    )
}

export default DemandeNote