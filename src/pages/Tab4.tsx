import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonPage, IonRow, IonTextarea, IonTitle, IonToast, IonToolbar, isPlatform } from '@ionic/react'
import './Tab4.css'
import React, { useState } from 'react'
import helpers from '../helpers/helpers'
import { send } from 'ionicons/icons'

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
    let textRows = isPlatform('android') ? 6 : 5
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
            <IonList class="ion-no-padding contactForm">
              <IonGrid class="ion-no-padding contactCol1">
                <IonRow class="ion-margin-top ion-justify-content-center" color="secondary" key="prenom">
                  <IonCol size="11">
                    <IonLabel className="contact" position="stacked">Votre Prénom : </IonLabel>
                    <IonInput className="contact ion-margin-top" required name="prenom" type="text" placeholder="Prénom"></IonInput>
                  </IonCol>
                </IonRow>
                <IonRow class="ion-margin-top ion-justify-content-center">
                  <IonCol size="11">
                    <IonLabel className="contact" position="stacked">Votre Nom : </IonLabel>
                    <IonInput className="contact ion-margin-top" name="nom" required type="text" placeholder="Nom"></IonInput>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top ion-justify-content-center" color="secondary" key="email">
                  <IonCol size="11">
                    <IonLabel className="contact" position="stacked">Votre email : </IonLabel>
                    <IonInput className="contact ion-margin-top" name="mail" required type="email" placeholder="Email"></IonInput>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonGrid color="secondary" className="contactCol2" class="ion-no-padding">
                <IonRow className="ion-margin-top" color="secondary" key="sujet">
                  <IonCol size="11">
                    <IonLabel className="contact" position="stacked">De quoi voulez-vous nous parler : </IonLabel>
                    <IonInput className="contact ion-margin-top" name="sujet" required type="text" placeholder="Sujet"></IonInput>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top ion-align-items-center">
                  <IonCol size="9">
                      <IonLabel className="contact" position="stacked">Votre message : </IonLabel>
                      <IonTextarea rows={textRows} className="contact ion-margin-top" required name="message" placeholder="Message" />
                  </IonCol>
                  <IonCol className="ion-margin-top ion-text-center" color="secondary" size="3">
                  <IonButton onClick={submit} type="submit" className="ion-margin-top sendMessage" shape="round"><IonIcon icon={send} /></IonButton>
                </IonCol>
                </IonRow>
              </IonGrid>
            </IonList>
            <IonToast color="danger" message="Merci de remplir tout les champs" duration={2000} isOpen={formError} onDidDismiss={() => {setFormError(false)}} />
            <IonToast color="success" message="Votre message à été envoyé" duration={2000} isOpen={thanks} onDidDismiss={() => {setThanks(false)}} />
          </IonContent>
        </IonPage>
      );
}

export default Tab4