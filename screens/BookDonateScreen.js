import React,{Component} from 'react';
import {View,Text, TextInput, TouchableOpacity, Alert,StyleSheet,Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from '../config';
export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state={
            requestedBooksList:[]
        }
        this.requestRef=null;
    }
    componentDidMount(){
        this.getRequestedBooksList();
    }
    componentWillUnmount(){
        this.requestRef=null;
    }
    getRequestedBooksList=()=>{
        this.requestRef=db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList=snapshot.docs.map(document=>document.data())
            this.setState({
                requestedBooksList:requestedBooksList
            })
        })
    }
    keyExtractor=(item,index)=>index.toString();
   
    renderItem=({item,i})=>{
        return(
           
            <ListItem
            key={i} bottomDivider>
                 
              <ListItem.Content>
              <ListItem.Title>{item.book_name}</ListItem.Title>
              <ListItem.Subtitle>{item.reason_to_request}</ListItem.Subtitle>
              
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.props.navigation.navigate("RecieverDetails",{"details":item})
                }}
                 
                  >
           
                  <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
              
             
              </ListItem.Content>
           </ListItem>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Donate Books"/>
                <View style={{flex:1}}>
                    {
                        this.state.requestedBooksList.length===0?
                        (
                            <View style={styles.subContainer}>
                                <Text style={{fontSize:20}}>
                                    List of all requested Books
                                </Text>
                                </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedBooksList}
                            renderItem={this.renderItem}/>

                        )
                    }
                </View>
            </View>
        )
       
    }
}
const styles=StyleSheet.create({
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        subContainer:{
            flex:1,
            fontSize: 20,
            justifyContent:'center',
            alignItems:'center'
          },
    }
       
    })
