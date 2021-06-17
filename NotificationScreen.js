import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from 'firebase';
import db from './config'
import MyHeader from './components/MyHeader';
import MyDonationScreen from './MyDonationSCreen'

export default class NotificationScreen extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef = null 
    }

    getNotifications = () =>{
        this.requestRef = db.collection("all_notifications").where("notificationStatus", "==","unread")
        .where("userId","==", this.state.userId).onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["doc_id"] = doc.id
                allNotifications.push(notification)
            })
            this.setState({allNotifications:allNotifications})
        })
    }

    componentDidMount(){
        this.getNotifications()
    }

    componentWillUnmount(){
        this.notificationRef()
    }

    keyExtractor = (item, index)=> index.toString()
    renderItem = (item, index)=>{
        return (
            <ListItem key={index} 
            leftElement={
                <Icon name="book" type ="font-awesome" color="#696969"/>     
            }
            title={item.bookName} 
            titleStyle={{color:"black"}}
            subtitle={item.mesage}
            bottomDivider>
            </ListItem>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:0.1}}>
            <MyHeader title="Notifications" navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
            {this.state.allNotifications.length === 0?(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25}}>You have no notifications</Text>
                </View>
            ):(
                <FlatList keyExtractor={this.keyExtractor} 
                data={this.state.allNotifications}
                renderItem={this.renderItem}>

                </FlatList>
            )}
        
            </View>
            </View>
        )
    }
}

