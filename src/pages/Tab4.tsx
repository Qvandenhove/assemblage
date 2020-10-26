import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react'
// import './Tab4.css'
import React, { useState } from 'react'
import helpers from '../helpers/helpers'

const Tab4:React.FC = () => {
    const [formError, setFormError] = useState(false)
    const [thanks, setThanks] = useState(false)
    const submit = () => {
        let inputs = document.querySelectorAll("ion-input, ion-textarea")
        let errors:any[] = []
        let datas:any = {}
        inputs.forEach((input:any) => {
          console.log(input.value)
            if (input.value ===""){
                errors.push(input)
            }else{
                datas[input.getAttribute("name")] = input.value
            }
        })
        console.log(errors)
        if (errors.length > 0) {
            setFormError(true)
            errors.forEach((errorField: any) => {
              if (errorField.getAttribute("placeholder") !== null) {
                errorField.classList.add("emptyField");
                errorField.addEventListener("ionChange", () => {
                  errorField.classList.remove("emptyField");
                })
              } else {
      
                for (let child of errorField.children) {
                  for (let elmt of child.children) {
                    elmt.classList.add("emptyField")
                  }
                }
                errorField.addEventListener("ionChange", () => {
                  for (let child of errorField.children) {
                    for (let elmt of child.children) {
                      elmt.classList.remove("emptyField")
                    }
                  }
                })
              }
      
            })
          } else {
            setThanks(true)
            helpers.sendMail(datas)
          }
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Contact</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Vous souhaitez prendre contact avec nous ?</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonList>
                    <IonItem color="secondary" key="prenom">
                        <IonLabel position="stacked">Votre Prénom : </IonLabel>
                        <IonInput required name="prenom" type="text" placeholder="Prénom"></IonInput>
                    </IonItem>
                    <IonItem color="secondary" key="nom">
                        <IonLabel position="stacked">Votre Nom : </IonLabel>
                        <IonInput name="nom" required type="text" placeholder="Nom"></IonInput>
                    </IonItem>
                    <IonItem color="secondary" key="email">
                        <IonLabel position="stacked">Votre email : </IonLabel>
                        <IonInput name="mail" required type="email" placeholder="email"></IonInput>
                    </IonItem>
                    <IonItem color="secondary" key="sujet">
                        <IonLabel position="stacked">De quoi voulez-vous nous parler : </IonLabel>
                        <IonInput name="sujet" required type="text" placeholder="Sujet"></IonInput>
                    </IonItem>
                    <IonItem color="secondary" key="message">
                        <IonLabel position="stacked">Votre message : </IonLabel>
                        <IonTextarea required name="message" placeholder="Message" />
                    </IonItem>
            </IonList>
            <IonButton onClick={submit} type="submit" className="centered">Envoyer</IonButton>
            <IonToast color="danger" message="Merci de remplir tout les champs" duration={2000} isOpen={formError} onDidDismiss={() => {setFormError(false)}} />
            <IonToast color="success" message="Votre message à été envoyé" duration={2000} isOpen={thanks} onDidDismiss={() => {setThanks(false)}} />
          </IonContent>
        </IonPage>
      );
}

export default Tab4