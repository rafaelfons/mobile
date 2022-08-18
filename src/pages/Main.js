import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main(){
    const [currentRegion, setCurrentRegion ] = useState(null)
    console.log(currentRegion)

    useEffect(()=>{
        async function loadInitialPosition(){
            const {granted} = await requestForegroundPermissionsAsync()
            if (granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })
                
                const {latitude, longitude} = coords;
                console.log(latitude, longitude)

                setCurrentRegion({
                    latitude, 
                    longitude,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,    
            })
            }
        }

        loadInitialPosition()
    },[])

   
   return <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={currentRegion}/>
   </MapView>     
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
})

export default Main;