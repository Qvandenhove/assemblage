import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonList, IonToast, IonIcon, IonModal } from '@ionic/react';
import React, { useState } from 'react';
import DemandeNote from '../components/demandeNote'
import helpers from '../helpers/helpers'
import './Tab3.css';

const Tab3: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [thankModal, setThanksModal] = useState(false)
  const checkForm = (form: NodeList) => {
    let datas: any = {}
    let errors: any = []
    form.forEach((input: any) => {
      if ((input.value === "" || input.value === undefined) && (input.classList.contains("sc-ion-textarea-md-h") === false)) {
        errors.push(input)
      } else {
        datas[input.name] = input.value
      }
    })
    if (errors.length > 0) {
      setIsOpen(true)
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
      helpers.exportDatas(datas)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-wrap">Avez vous quelque minutes pour nous dire ce vous en avez pensé ?</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList className="questionnaire">
          <DemandeNote nom="accueil" label="Que pensez vous de la qualité de l'accueil?" />
          <DemandeNote nom="choix" label="Que pensez vous des choix proposés?" />
          <DemandeNote nom="orientation" label="Que pensez vous de la qualité de l'orientation dans l'enceinte du bâtiment?" />
          <IonItem color="secondary" key="prenom">
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
            <IonButton size="default" onClick={() => { checkForm(document.querySelectorAll("ion-input, ion-radio-group, ion-textarea")) }} type="submit">Envoyer</IonButton>
          </IonItem>
        </IonList>
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
