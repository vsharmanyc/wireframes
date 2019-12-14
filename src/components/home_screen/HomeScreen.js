import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

     async handleNewList(){
        console.log("HANDLE NEW LIST");
        const fireStore = getFirestore();
        var todoListRef =await fireStore.collection('todoLists').add({
            items:[],
            name: "",
            owner: "",
            time: + new Date()
        });
        console.log(this);
        this.props.history.push("/todoList/" + todoListRef.id);
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframes<br />
                            Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList.bind(this)}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("list screen mstp");
    let email = state.firebase.profile.email;
    let users = state.firestore.ordered.users_data;
    let wireframes;
    for(let i = 0; users != null && i < users.length; i++){
        if(users[i].user_id == email){
            wireframes = users[i].wireframes;
            break;
        }
    }
    return {
        wireframes: wireframes,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes',  orderBy: ['time', 'desc'] },
    ]),
)(HomeScreen);