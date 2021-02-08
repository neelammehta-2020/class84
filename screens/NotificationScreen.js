import React,{Component} from 'react';
import { render } from 'react-dom';
import {View,Text, TextInput, TouchableOpacity, Alert,StyleSheet,Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import {ListItem,Icon} from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';


export default class NotificationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null;
    }

getNotifications=()=>{
    this.requestRef=db.collection('all_notification')
 
    .where("notification_status","==","unread")
    .where("targeted_user_id","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allNotifications=[]
        snapshot.docs.map((doc)=>{
            var notification=doc.data()
            notification["doc_id"]=doc.id;
            allNotifications.push(notification)
        });
        this.setState({
            allNotifications:allNotifications
        })
    })
}
componentDidMount(){
    this.getNotifications()
}
componentWillUnmount(){
    this.notificationRef()
}
keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>{
    return(
       
       <ListItem
        key={i} bottomDivider>
            <ListItem.Content>

                <ListItem.Title> {item.book_name}
                </ListItem.Title>
               
               <Icon name="book" type="font-awesome" color="#696969"/>
                  
                </ListItem.Content>      
       
      
       
     </ListItem>
    )
}
render(){
    return(
        <View style={styles.container}>
            <View style={{flex:0.1}}>
                <MyHeader title={"Notifications"}
                navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
                {
                    this.state.allNotifications.length===0
                    ?(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:25}}>
                            you have no NotificationScreen
                            </Text>
                            </View>

                    )
                    :(
                       <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allNotifications}
                        renderItem={this.renderItem}
                        />
                    )
                }
            </View>
        </View>
    )
}
}
const styles= StyleSheet.create({
    container : {
        flex : 1
      }
})