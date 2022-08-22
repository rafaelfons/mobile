import React, {useState, useEffect} from 'react'
import { StyleSheet, Image, View, Text} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main({ navigation }){
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
   
   return  <MapView initialRegion={currentRegion} style={styles.map}>
                <Marker coordinate={{latitude: -19.686735 , longitude: -43.206500}}>
                    <Image style={styles.avatar} source={{uri: 'https://avatars.githubusercontent.com/u/108985390?s=400&u=040afbca8c2fc84db54d17b156e08419593ed920&v=4'}}/>

                    <Callout onPress={() => {
                            navigation.navigate('Profile', {github_username: 'rafaelfons'})
                    }}>
                        <View style={styles.callout}>
                            <Text style = {styles.devName} >Rafael Fonseca</Text>
                            <Text style = {styles.devBio} >Estudante de Ciência da Computação.</Text>
                            <Text style = {styles.devTechs} >JavaScript, CSS, HTML</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>     
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        barderRadius: 4,
        borderWidth: 4,
        borderColor: '#000',
    },
    callout:{
        width:260,
        
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color:'#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop: 5
    }
})

export default Main;