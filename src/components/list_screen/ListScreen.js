import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { taggedTemplateExpression, tsAnyKeyword } from '@babel/types';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import {Modal, Button} from 'react-materialize';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss'

class ListScreen extends Component {

    componentDidMount() {
        console.log("componentDidMount ListScreen");
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
        text_displayColorPicker: false,
        text_color: {r: '135',g: '135',b: '135',},
        border_displayColorPicker: false,
        border_color: {r: '135',g: '135',b: '135',},
        background_displayColorPicker: false,
        background_color: {r: '135',g: '135',b: '135',},
      };
        
    
    handleTextColorClick = () => {
        this.setState({ text_displayColorPicker: !this.state.text_displayColorPicker })
    };
    
    handleTextColorClose = () => {
        this.setState({ text_displayColorPicker: false })
    };
    
    handleTextColorChange = (color) => {
        this.setState({ text_color: color.rgb })
    };

    handleBorderColorClick = () => {
        this.setState({ border_displayColorPicker: !this.state.border_displayColorPicker })
    };
    
    handleBorderColorClose = () => {
        this.setState({ border_displayColorPicker: false })
    };
    
    handleBorderColorChange = (color) => {
        this.setState({ border_color: color.rgb })
    };

    handleBackgroundColorClick = () => {
        this.setState({ background_displayColorPicker: !this.state.background_displayColorPicker })
    };
    
    handleBackgroundColorClose = () => {
        this.setState({ background_displayColorPicker: false })
    };
    
    handleBackgroundColorChange = (color) => {
        this.setState({ background_color: color.rgb })
    };

    other_state = {
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

        const container_style = {
            backgroundColor : "white",
            height: 600,
            width: 1200,
            borderStyle: "solid",
            borderWidth: "thin",
        }
        const col_style = {
            borderStyle: "solid",
            height: 600,
            borderWidth: "thin",
        }

        const text_styles = reactCSS({
            'default': {
              color: {width: '36px',height: '14px',borderRadius: '2px',background: `rgba(${ this.state.text_color.r }, ${ this.state.text_color.g }, ${ this.state.text_color.b })`,},
              swatch: {padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',},
              popover: {position: 'absolute',zIndex: '2',},
              cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',},},});

        const border_styles = reactCSS({
            'default': {
                color: {width: '36px',height: '14px',borderRadius: '2px',background: `rgba(${ this.state.border_color.r }, ${ this.state.border_color.g }, ${ this.state.border_color.b })`,},
                swatch: {padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',},
                popover: {position: 'absolute',zIndex: '2',},
                cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',},},});
                
        const background_styles = reactCSS({
            'default': {
                color: {width: '36px',height: '14px',borderRadius: '2px',background: `rgba(${ this.state.background_color.r }, ${ this.state.background_color.g }, ${ this.state.background_color.b })`,},
                swatch: {padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',},
                popover: {position: 'absolute',zIndex: '2',},
                cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',},},});    
        
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        console.log("KJFHKJHFKJDHKJFHDKFHDKJFHDKJF");

        return (
            <div class="container" style={container_style}>
                <div class="row">
                    <div class="col s3" style={col_style}>
                        hi
                    </div>
                    <div class="col s6" style={col_style}>
                        hi
                    </div>
                    <div class="col s3" style={col_style}>
                        <h5>Diagram Properties</h5>
                        <label><font size="3">Name </font><input type="text" class="browser-default" name="diagram_name"></input></label><br></br>
                        <label><font size="3">Width </font><input type="text" class="browser-default" name="diagram_width"></input></label><br></br>
                        <label><font size="3">Height </font><input type="text" class="browser-default" name="diagram_height"></input></label><br></br>
                        <h5>Control Properties</h5>
                        <label><font size="3">Text </font><input type="text" class="browser-default" name="control_text"></input></label><br></br>
                        <label><font size="3">Font Size </font><input type="text" class="browser-default" name="font_size"></input></label><br></br>
                        <label><font size="3">Border Thickness </font><input type="text" class="browser-default" name="border_thickness"></input></label><br></br>
                        <label><font size="3">Border Radius </font><input type="text" class="browser-default" name="border_radius"></input></label><br></br><br></br>
                       
                        <label><font size="3">Text Color</font><div>
                            <div style={ text_styles.swatch } onClick={ this.handleTextColorClick }>
                            <div style={ text_styles.color } /></div>
                            { this.state.text_displayColorPicker ? <div style={ text_styles.popover }>
                            <div style={ text_styles.cover } onClick={ this.handleTextColorClose }/>
                            <ChromePicker disableAlpha={true} color={ this.state.text_color } onChange={ this.handleTextColorChange } />
                            </div> : null }
                        </div></label><br></br>
                        <label><font size="3">Background Color</font><div>
                            <div style={ background_styles.swatch } onClick={ this.handleBackgroundColorClick }>
                            <div style={ background_styles.color } /></div>
                            { this.state.background_displayColorPicker ? <div style={ background_styles.popover }>
                            <div style={ background_styles.cover } onClick={ this.handleBackgroundColorClose }/>
                            <ChromePicker disableAlpha={true} color={ this.state.background_color } onChange={ this.handleBackgroundColorChange } />
                            </div> : null }
                        </div></label><br></br>
                        <label><font size="3">Border Color</font><div>
                            <div style={ border_styles.swatch } onClick={ this.handleBorderColorClick }>
                            <div style={ border_styles.color } /></div>
                            { this.state.border_displayColorPicker ? <div style={ border_styles.popover }>
                            <div style={ border_styles.cover } onClick={ this.handleBorderColorClose }/>
                            <ChromePicker disableAlpha={true} color={ this.state.border_color } onChange={ this.handleBorderColorChange } />
                            </div> : null }
                        </div></label><br></br>
                    </div>
                </div>
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
        { collection: 'users_data'},
    ]),
)(ListScreen);