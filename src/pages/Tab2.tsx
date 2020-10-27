import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { Fragment, useState } from 'react';
import './Tab2.css';
import { Grid } from 'pathfinding'
import helpers from '../helpers/helpers';
import AskPoints from '../components/askPoints';
let generation = false
let gotWaypoints = false


function transpose(array:any) {
  return array.reduce((prev:any, next:any) => next.map((item:any, i:any) =>
      (prev[i] || []).concat(next[i])
  ), []);
}

const Tab2: React.FC = () => {
  let line_key = 0
  const longueur_canvas:number = window.innerWidth < 720 ? window.innerWidth * (8/10) : Math.round(window.innerWidth * (2/3)) // longueur de la grille sur l'écran
  const hauteur_canvas:number = window.innerHeight * 0.75 // hauteur de la grille sur l'écran
  const margin = window.innerWidth >= 720 ? (window.innerWidth - longueur_canvas)/2 : (window.innerWidth - longueur_canvas)/4 // Écart à réaliser pour centrer sur lécran
  const hauteur:number = 100 // Nombre de pixel en hateur de la grille
  const longueur:number = 100 // Nombre de pixel en longueur de la grille
  const pixel_height = hauteur_canvas/hauteur // Hauteur d'un pixel
  const pixel_length = longueur_canvas/longueur // Longueur d'un pixel
  const room_number:number = 6 // nombre de salles de part et d'autre du couloir
  const [matrix, setMatrix] = useState([]) // La grille utilisée par pathfinding
  const [fromPoint, setFromPoint] = useState("") // Point de départ
  const [toPoint, setToPoint] = useState("") // Point d'arrivée
  const [svg_path_string, setSvgString] = useState("") // Chemin à suivre
  
  const [grid, setGrid] = useState(new Grid(0,0))
  // Add Waypoints useStates
  const [Waypoints, setWaypoints] = useState([])
  //Génération de la grille
  helpers.createGrid(hauteur, longueur, room_number).then((value) => {
    if(generation === false){
      generation = true
      setMatrix(value)
      setGrid(new Grid(transpose(value)))
    }
  })

  function updateWaypoints(){
    helpers.getWaypoints().then((value) => {
      if(!gotWaypoints){
        setWaypoints(value)
        gotWaypoints = true
      }
    })
  }
  updateWaypoints()
  // Recherche de chemin à emprunter
  async function goToWayPoint(startPoint:string){
    let startDatas = await helpers.getWaypoint(startPoint)
    let endDatas = await helpers.getWaypoint(toPoint)
    if(startDatas && endDatas){
      let path:any = await helpers.searchPath(startDatas.X - 1, startDatas.Y - 1, endDatas.X - 1, endDatas.Y - 1, grid.clone())
      let svg_path = []
      if (typeof(path) !== "string"){
        svg_path.push(`M${path[0][0] * pixel_length + pixel_length/2 + margin} ${(path[0][1]) * pixel_height + pixel_height/2}`)
        for(let i = 1;i < path.length; i++){
          svg_path.push(`L${path[i][0] * pixel_length + pixel_length/2 + margin} ${(path[i][1]) * pixel_height + pixel_height/2}`)
        }
        setSvgString(svg_path.join(" "))
      }
    }
  }
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carte du Bâtiment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem lines="none" className="map">
          <svg width={window.innerWidth} height={hauteur_canvas}>
            {matrix.map((line:any, index:number) => {
              let svg_line = line.map((cell:any, index_h:any) => {
                let cell_value
                if (cell === 0){
                  cell_value = "white"
                }else{
                  cell_value = "black"
                }
                return <rect key={`${index} - ${index_h}`} x={index * (pixel_length) + margin} y={index_h*(pixel_height)} width={pixel_length} height={pixel_height} stroke="black" strokeWidth="0" fill={cell_value} />
              })
              line_key++
            return <Fragment key={`line - ${line_key}`}>{svg_line}</Fragment>
            })}
            {Waypoints.map((WayPoint:any) => {
              let labelX, labelY
              if (WayPoint.datas.X > longueur / 2 && WayPoint.datas.Y > hauteur / 2){
                labelX = WayPoint.datas.X * pixel_length - (WayPoint.datas.label.length * 1.5) + margin
                labelY = WayPoint.datas.Y * pixel_height - 15
              }else if (WayPoint.datas.X <= longueur / 2 && WayPoint.datas.Y <= hauteur / 2){
                labelX = WayPoint.datas.X * pixel_length + (WayPoint.datas.label.length * 1.5) + margin
                labelY = WayPoint.datas.Y * pixel_height + 15
              }else if (WayPoint.datas.X <= longueur / 2 && WayPoint.datas.Y > hauteur / 2){
                labelX = WayPoint.datas.X * pixel_length + (WayPoint.datas.label.length * 1.5) + margin
                labelY = WayPoint.datas.Y * pixel_height - 15
              }else if (WayPoint.datas.X > longueur / 2 && WayPoint.datas.Y <= hauteur / 2){
                labelX = WayPoint.datas.X * pixel_length - (WayPoint.datas.label.length * 1.5) + margin
                labelY = WayPoint.datas.Y * pixel_height + 15
              }
              return <Fragment key={WayPoint.id}>
                <text fill="blue" x={labelX} y={labelY}>{WayPoint.datas.label}</text>
                <circle fill={WayPoint.datas.color} cx={WayPoint.datas.X * pixel_length - pixel_length / 2 + margin} cy={WayPoint.datas.Y * pixel_height - pixel_height / 2} r={pixel_length * (window.innerWidth < 720 ? 1 : 0.5)}/>
              </Fragment>
            })}
            <path fill="none" strokeWidth="3" stroke="#ffff00" d={svg_path_string} />
          </svg>
        </IonItem>
        <IonItem lines="none" className="centered searchPoints">
          <IonGrid>
            <IonRow class="ion-align-items-center ion-justify-content-between">
          <AskPoints waypoints={Waypoints} setFromPoint={setFromPoint} setToPoint={setToPoint} />
          <IonCol size="2" >
            <IonButton onClick={() => {goToWayPoint(fromPoint)}}>Chercher</IonButton>
          </IonCol>
          </IonRow>
        </IonGrid>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
