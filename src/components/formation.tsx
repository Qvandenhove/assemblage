import { IonCard, IonCardHeader, IonCardContent } from '@ionic/react'
import React from 'react'


interface FormationProps{
    name:string
    niveau: string
    domaine:string
}

const Formation:React.FC<FormationProps> = ({name, niveau, domaine}) => {
    return <IonCard className="formation">
            <IonCardHeader className="formation">
                {name}
            </IonCardHeader>
            <IonCardContent>
                {niveau}<br />
                {domaine}
            </IonCardContent>
    </IonCard>
}

export default Formation