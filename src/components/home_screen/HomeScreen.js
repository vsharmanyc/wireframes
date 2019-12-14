import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

     async handleNewWireframe(){
        console.log("HANDLE NEW WIREFRAME");
        const fireStore = getFirestore();
        let wireframes = this.props.wireframes;
        wireframes.push({
            "key": wireframes.length,
            "name":"uninitialized",
            "time": + new Date(),
            "properties":[]});
        fireStore.collection('users_data').doc(this.props.email).update({wireframes: wireframes});
        this.props.history.push("/wireframe/" + (wireframes.length - 1));
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
                                <button className="home_new_list_button" onClick={this.handleNewWireframe.bind(this)}>
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
    console.log("home screen mstp");
    let email = state.firebase.profile.email;
    let users = state.firestore.ordered.users_data;
    let wireframes;
    let user;
    for(let i = 0; users != null && i < users.length; i++){
        if(users[i].user_id == email){
            user = users[i];
            wireframes = users[i].wireframes;
            break;
        }
    }
    console.log("STATE:");
    console.log(state);
    return {
        email: email,
        user : user,
        wireframes: wireframes,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users_data'},
    ])
)(HomeScreen);