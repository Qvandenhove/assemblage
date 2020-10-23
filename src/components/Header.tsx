import { IonHeader, IonToolbar, IonMenuButton, IonTitle } from '@ionic/react'
import React, { Fragment } from 'react'

interface HeaderProps {
    title:string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Fragment>
            <IonHeader>
                <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,700;1,400;1,700&display=swap" rel="stylesheet" />
                <IonToolbar>
                    <IonMenuButton menu="main" color="primary" id="mainMenu" autoHide={false}></IonMenuButton>
                    <IonTitle><h1>{title}</h1></IonTitle>
                </IonToolbar>
            </IonHeader>
        </Fragment>
    )
}

export default Header