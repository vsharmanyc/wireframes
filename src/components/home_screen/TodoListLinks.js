import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {

    render() {
        const wireframes = this.props.wireframes;
        console.log(wireframes);
        return (
            <div className="wireframes section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.key} key={wireframe.key}>
                        <TodoListCard wireframe={wireframe} />
                    </Link>
                ))}
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
        wireframes: wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);