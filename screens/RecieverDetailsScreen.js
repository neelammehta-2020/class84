import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';


export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')['request_id'],
            bookName:this.props.navigation.getParam('details')['book_name'],
            reason_for_requesting:this.props.navigation.getParam('details')['reason_to_request'],
            userName:'',
            recieverName:'',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDocId:''
        }
    }
    getRecieverDetails(){
        console.log('in reciver details')
       // db.collection('users').where('email_id','==',this.state.recieverId).get()
       this.state.recieverId='mehtaaryan1018@gmail.com'
       db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName:doc.data().first_name,
                    recieverContact:doc.data().contact,
                    recieverAddress:doc.data().address,  
                })
            })
        })
    }
    

    getUserDetails = (userId) => {
      db.collection("users")
        .where("email_id", "==", userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.setState({
              userName: doc.data().first_name + " " + doc.data().last_name,
            });
          });
        });
    };
    updateBookStatus=()=>{
        db.collection("all_donations").add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.recieverName,
            donor_id:this.state.userId,
            request_status:"Donar Interested"
        })
    }
    

componentDidMount(){
    this.getRecieverDetails();
    this.getUserDetails(this.state.userId)
  }
  
  addNotifications=()=>{
var message=this.state.username+"has shown interest in donating the book"

db.collection("all_notification").add({
  "targeted_user_id":this.state.recieverId,
  "donor_id":this.state.userId,
  "request_id":this.state.requestId,
  "book_name":this.state.bookName,
  "date":firebase.firestore.FieldValue.serverTimestamp(),
  "notification_status":"unread",
  "message":message

})
  }

    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View>
          <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updateBookStatus()
                      this.addNotifications()
                      this.props.navigation.navigate('MyDonations')
                    }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
          </View>
        <View style={{flex:0.3}}>
          
            <Card
                title={"Book Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Reciever Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updateBookStatus()
                      this.addNotifications()
                      this.props.navigation.navigate('MyDonations')
                    }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
    }
  
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })