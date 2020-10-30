import firebase from "firebase"
import { AStarFinder, Grid } from 'pathfinding'
import { HTTP } from '@ionic-native/http'


var firebaseConfig = {
    apiKey: "AIzaSyAr2ARyw2PBu7i9l_dvRAgl3X4cgE0Voi4",
    authDomain: "satisfaction-7bbc4.firebaseapp.com",
    databaseURL: "https://satisfaction-7bbc4.firebaseio.com",
    projectId: "satisfaction-7bbc4",
    storageBucket: "satisfaction-7bbc4.appspot.com",
    messagingSenderId: "88882724595",
    appId: "1:88882724595:web:40b919b492d15f6a420186"
  };
firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

const helpers = {
  // Questionnaire satisfaction
    async exportDatas(datas:any){
        let new_doc = db.collection("Avis").doc()
        await new_doc.set(datas)
        console.log("sending")
        return "done"
    },
    
    // Pathfinding
    async createGrid(height:number, length:number, roomsNumber:number){
        const room_length = Math.round(length/roomsNumber)
        let matrix:any = []
        for(let i=0;i<height;i++){
            matrix.push([])
        }
        for(let yEnd=0; yEnd<height;yEnd++){
            for(let xEnd=0; xEnd<length; xEnd++){
              let isBuildingWall = (xEnd === 0 || yEnd === 0 || xEnd === length - 1 || yEnd === height - 1)
              let isBuildingDoor = (yEnd === height/2 && xEnd === 0)
              let isRoomWall = ((yEnd === height / 2 + 1 || yEnd === height / 2 - 1 || xEnd % room_length === 0) && (yEnd !== height / 2))
              let isRoomDoor = (xEnd % room_length === 1 && yEnd !== 0 && xEnd!== 0 && yEnd !== length - 1 && xEnd !== height - 1)
              if((isBuildingWall || isRoomWall) && (isBuildingDoor === false && isRoomDoor === false)){
                matrix[xEnd].push(1)
              }else{
                matrix[xEnd].push(0)
              }
            }
          }
       
        return matrix
    },

    async searchPath(xStart:number, yStart:number, xEnd:number, yEnd:number, grid:Grid) {
      let finder = new AStarFinder()
      let path
      path = finder.findPath(xStart, yStart, xEnd, yEnd, grid)
      return path
    },

    async getWaypoints(){
      let wayPointsList = await db.collection("Waypoints").get()
      let WayPoints:any = []
      wayPointsList.forEach((wayPoint) => {
        WayPoints.push({datas: wayPoint.data(), id: wayPoint.id})
      })
      return WayPoints
    },

    async getWaypoint(pointId:string){
      let waypoint
      if(pointId !== ""){
        waypoint = await (await db.collection("Waypoints").doc(pointId).get()).data()
      }else{
        return
      }
      return waypoint
    },
    // Liste formations
    async getFormations(){
      let formationsList = await db.collection("Formation").get()
      let formations:any[] = []
      formationsList.forEach((formation) => {
        formations.push({id:formation.id, datas:formation.data()})
      });
      
      return formations
    },
    // Contact
    async sendMail(datas:any){
      HTTP.setDataSerializer("json")
      console.log(datas)
      HTTP.sendRequest("http://10.209.0.210:80/index.php", {method:"post", data: datas}).then((response) => {
        console.log(response.data)
        console.log(response.status)
      }).catch((err) => {console.log(err)})
    }
}

export default helpers