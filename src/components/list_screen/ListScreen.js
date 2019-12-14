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

    componentDidMount() {
        const fireStore = getFirestore();
        console.log("YALLA");
        console.log(this.props.wireframe.key);
        fireStore.collection('users_data').doc(this.props.wireframe.key).update({time: 1234});
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

 

    sortItemsBy(sortFunction) {
        let items = this.props.todoList.items;
        items.sort(sortFunction);
        if(!this.sortIncreasing)
            items.reverse();
        for(var i = 0; i < items.length; i++)
            items[i]["key"] = i;
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({ items: items });
        this.sortIncreasing = !this.sortIncreasing;
    }

    addItem = (e) => {
        console.log("ADD ITEM");
        this.props.history.push("/todoLists/" + this.props.todoList.id + "/ItemUpdate");

    }

    makeTableHTML(todoList) {
        var result = "<table class=\"table table-striped\"><thead class=\"thead-default\">"
            + "<tr><th>Task</th><th>Due Date</th><th>Status</th></tr></thead><tbody>";
        console.log(todoList.items);
        for (var i = 0; i < todoList.items.length; i++) {
            result += "<tr><td>" + todoList.items[i]["description"] + "<br>Assigned To: " + todoList.items[i]["assigned_to"] + "</br></td>";
            result += "<td>" + todoList.items[i]["due_date"] + "</td>";
            result += "<td>" + (todoList.items[i]["completed"] ? "Completed" : "Pending") + "</td></tr>";
        }
        result += "</tbody></table>";
        return result;
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
    let wireframe;
    for(let i = 0; users != null && i < users.length; i++){
        if(users[i].user_id == email){
            wireframe = users[i].wireframes[key];
            break;
        }
    }
    wireframe.key = key;
    return {
        wireframe,
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