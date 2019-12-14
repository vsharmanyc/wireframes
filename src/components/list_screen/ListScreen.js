import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { taggedTemplateExpression, tsAnyKeyword } from '@babel/types';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import {Modal, Button} from 'react-materialize'

class ListScreen extends Component {
c
    componentDidMount() {
        const fireStore = getFirestore();
        console.log("List Screen componentDidMount()");
        this.props.wireframe.time = + new Date();
        let wireframes = this.props.wireframes;
        this.props.wireframes.sort(function(a, b){return b.time - a.time});
        for(let i = 0; i < wireframes.length; i++)
            wireframes[i].key = i;
        fireStore.collection('users_data').doc(this.props.email).update({wireframes: this.props.wireframes});
    }

    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        console.log(e.target.value);
        const fireStore = getFirestore();
        if (target.id == "name")
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({ name: target.value });
        else if (target.id == "owner")
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({ owner: target.value });

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    trashClicked = (e) => {
        console.log("TRASH CLICKED");
        const fireStore = getFirestore();
        var todoListRef = fireStore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push("/");
    }


    addItem = (e) => {
        console.log("ADD ITEM");
        this.props.history.push("/todoLists/" + this.props.todoList.id + "/ItemUpdate");

    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        console.log("KJFHKJHFKJDHKJFHDKFHDKJFHDKJF");

        return (
            <div class="grid-container">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
            <div class="grid-item">7</div>
            <div class="grid-item">8</div>
            <div class="grid-item">9</div>
          </div> 
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log("list screen mstp");
    let email = state.firebase.profile.email;
    let key  = ownProps.match.params.key;
    let users = state.firestore.ordered.users_data;
    let wireframes;
    let wireframe;
    for(let i = 0; users != null && i < users.length; i++){
        wireframes = users[i].wireframes;
        if(users[i].user_id == email){
            console.log(wireframes);
            wireframe = wireframes[key];
            wireframe.key = key;
            break;
        }
    }
    console.log(email);
    console.log(wireframes);
    console.log(wireframe);
    return {
        email : email,
        state: state,
        wireframes : wireframes,  
        wireframe : wireframe,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists'},
        //{ collection: 'todoLists' , orderBy: ['time', 'desc']},
    ]),
)(ListScreen);