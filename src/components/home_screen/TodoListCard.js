import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import {Modal, Button} from 'react-materialize'

class TodoListCard extends React.Component {
    componentDidMount() {
        this.setState(this.state);
    }
    deleteWireframe = (e) => {
        console.log("DELETE ITEM");
        e.preventDefault();
        console.log(this.props);
        let wireframe = this.props.wireframe;
        let wireframes = this.props.wireframes;
        wireframes.splice(wireframes.indexOf(wireframe),1);
        for(let i = 0; i < wireframes.length; i++)
            wireframes[i].key = i;
        const fireStore = getFirestore();
        fireStore.collection('users_data').doc(this.props.email).update({wireframes: wireframes});
    }

    modalClosed = (e) =>{
        e.preventDefault();
    }

    render() {
        const { wireframe } = this.props;
        console.log(this.props)
        console.log("TodoListCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-0 todo-list-link cyan lighten-5">
                <div className="card-content teal-text text-accent-4">
                    <span className="card-title">
                        <a class="right"><Modal header="Delete List?" 
                        trigger={<i class="material-icons">cancel</i>}>
                    <p>
                        Are you sure you want to delete this list?<br></br><br></br>
                        <Button
                            node="a"
                            waves="light"
                            small
                            style={{ marginRight: '5px' }}
                            modal="close"
                            onClick={this.deleteWireframe}
                        >Yes</Button>

                        <Button
                            node="a"
                            waves="light"
                            small
                            style={{ marginRight: '5px' }}
                            modal="close"
                            onClick={this.modalClosed}
                        >No</Button>

                    </p>
                </Modal></a>{' '+wireframe.name}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("todo list card links mstp");
    let email = state.firebase.profile.email
    let users_data = state.firestore.ordered.users_data;
    let wireframes = null;
    for(let i = 0; users_data != null && i < users_data.length; i++)
        if(users_data[i].user_id == email){
            wireframes = (users_data != null ? users_data[i].wireframes : null);
            break;
        }
    console.log(wireframes);
    return {
        email: email,
        wireframes: wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListCard);