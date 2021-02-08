import React,{Component} from 'react';
import {View,Text, TextInput, TouchableOpacity, Alert,StyleSheet,Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader';
import firebase from 'firebase'
import db from '../config.js'

export default class MyDonationScreen extends Component{
    static navigationOption={header:null};
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestRef=null
    }
    sendNotification = (bookDetails, requestStatus) => {
        var requestId = bookDetails.request_id;
        var donorId = bookDetails.donor_id;
        db.collection("all_notifications")
          .where("request_id", "==", requestId)
          .where("donor_id", "==", donorId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var message = "";
              if (requestStatus === "Book Sent") {
                message = this.state.donorName + " sent you book";
              } else {
                message =
                  this.state.donorName + " has shown interest in donating the book";
              }
              db.collection("all_notifications").doc(doc.id).update({
                message: message,
                notification_status: "unread",
                date: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          });
      };
      sendBook = (bookDetails) => {
        if (bookDetails.request_status === "Book Sent") {
          var requestStatus = "Donor Interested";
          db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status: "Donor Interested",
          });
          this.sendNotification(bookDetails, requestStatus);
        } else {
          var requestStatus = "Book Sent";
          db.collection("all_donations").doc(bookDetails.doc_id).update({
            request_status: "Book Sent",
          });
          this.sendNotification(bookDetails, requestStatus);
        }
      };
    
    getAllDonations=()=>{
        this.state.userId='neelam.mehta.niit@gmail.com'
        this.requestRef=db.collection("all_donations").where("donor_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=snapshot.docs.map(document=>document.data());
            this.setState({
                allDonations:allDonations
            })
        })
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(
        <ListItem

        key={i} bottomDivider>
            <ListItem.Content>

        <ListItem.Title>{item.book_name}</ListItem.Title>
        <ListItem.Subtitle>{"Requested by:" + item.requested_by+"\n status:" + item.request_status} </ListItem.Subtitle>
        
          
     
       
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.sendBook(item)
            }}>
                <Text style={{color:'#ffff'}}>
                    Send Book
                </Text>
            </TouchableOpacity>
            </ListItem.Content>
</ListItem>
           
        )  

    }
    
    componentDidMount(){
        this.getAllDonations()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation}
                title=" My Donations"/>
                <View style={{flex:1}}>
                    {
                        this.state.allDonations.length===0
                        ?
                        (
                            <View style={styles.subTitle}>
                                <Text style={{fontSize:20}}
                                List of All Donations>
                                </Text>
                                </View>
                        ):
                        (
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}/>
                        )
                    }
                </View>
                           </View>
        )
                }
            }

        const styles = StyleSheet.create({
            button:{
              width:100,
              height:30,
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:"#ff5722",
              shadowColor: "#000",
              shadowOffset: {
                 width: 0,
                 height: 8
               },
              elevation : 16
            },
            subtitle :{
              flex:1,
              fontSize: 20,
              justifyContent:'center',
              alignItems:'center'
            }
          })

