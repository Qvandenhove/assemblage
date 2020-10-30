import { IonButton, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'

interface slideBackProps{
    slider:any
}

const SlideBack:React.FC<slideBackProps> = ({slider}) => {
    const slideBack = (slider) => {
        slider.slidePrev()
    }
    return (
        <IonButton class="back" onClick={() => {slideBack(slider)}}><IonIcon className="back" icon={arrowBack}/></IonButton>
    )
}

export default SlideBack