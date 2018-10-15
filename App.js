import React from 'react';
import { FlatList, ActivityIndicator, Text, View,TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English%20Premier%20League')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.teams,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <TouchableOpacity key={item.idTeam}>
            <View style={styles.listItem}>
                <Image  
                  source={
                   {uri: item.strTeamBadge}
                  } 
                  style={styles.placeImage}/>
                <Text>{item.strTeam}</Text>
            </View>
          </TouchableOpacity>  
        }
        keyExtractor={(item, index) => index.toString()}
        />
      </View>

      
    );
  }
}
const  styles = StyleSheet.create({
  listItem:{
      width: "100%",
      padding: 10,
      marginBottom: 5,
      backgroundColor: "#eee",
      alignItems: "center"
  
  },
  placeImage: {
      marginRight: 8,
      height: 200,
      width: 200
      
  }
});  