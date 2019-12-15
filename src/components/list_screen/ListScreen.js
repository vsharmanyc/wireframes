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
import ItemsList from './ItemsList.js'

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
        diagram_name: this.props.wireframe.name,
        diagram_width: this.props.wireframe.width,
        diagram_height: this.props.wireframe.height,
        text_displayColorPicker: false,
        text_color: "gray",
        border_displayColorPicker: false,
        border_color: "gray",
        background_displayColorPicker: false,
        background_color: "gray",
        "key":0,
        "element":"",
        "x":0,
        "y":0,
        "height":"",
        "width":"",
        "text":"",
        "font_size":"",
        "border_radius":"",
        "border_thickness":"",
        properties : this.props.wireframe.properties,
      };
        
    
    handleTextColorClick = () => {
        this.setState({ text_displayColorPicker: !this.state.text_displayColorPicker })
    };
    
    handleTextColorClose = () => {
        this.setState({ text_displayColorPicker: false })
    };
    
    handleTextColorChange = (color) => {
        this.setState({ text_color: color.hex })
    };

    handleBorderColorClick = () => {
        this.setState({ border_displayColorPicker: !this.state.border_displayColorPicker })
    };
    
    handleBorderColorClose = () => {
        this.setState({ border_displayColorPicker: false })
    };
    
    handleBorderColorChange = (color) => {
        this.setState({ border_color: color.hex })
    };

    handleBackgroundColorClick = () => {
        this.setState({ background_displayColorPicker: !this.state.background_displayColorPicker })
    };
    
    handleBackgroundColorClose = () => {
        this.setState({ background_displayColorPicker: false })
    };
    
    handleBackgroundColorChange = (color) => {
        this.setState({ background_color: color.hex })
    };

    handleChange = (e) => {
        console.log("HANDLE CHANGE");
        const { target } = e;
        console.log(target.id);
        console.log(e.target.value);
        let email = this.props.email;
        let wireframes = this.props.wireframes;
        let wireframe = this.props.wireframe;
        const fireStore = getFirestore();
        if(target.id == "diagram_height" || target.id == "diagram_width")
            this.setState({[target.id]:parseInt(target.value)});
        else
            this.setState({[target.id]:target.value});

        //wireframes[this.props.key] =  wireframes;
        //fireStore.collection('users_data').doc(email).update({wireframes: wireframes});
    }

    trashClicked = (e) => {
        console.log("TRASH CLICKED");
        const fireStore = getFirestore();
        var todoListRef = fireStore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push("/");
    }


    addControl = (e) => {
        console.log("ADD CONTROL");
        const { target } = e;
        console.log(target.id);
        let properties = this.props.wireframe.properties;
        if(target.id == "button"){
            properties.push({
                "key":properties.length,
                "element":"button",
                "x":0,
                "y":0,
                "height":3,
                "width":7,
                "background_color":"gray",
                "text":"Click Here",
                "font_size":12,
                "border_color":"gray",
                "border_radius":0,
                "border_thickness":0,
                "text_color":"black"
            })
        }
        let index = properties.length -1;
        let propertiesDict = properties[properties.length -1];
        for(var key in propertiesDict)
            this.setState({[key]:propertiesDict[key]});
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        const properties = wireframe.properties;

        const container_style = {
            backgroundColor : "white",
            height: 600,
            width: 1200,
            borderStyle: "solid",
            borderWidth: "thin",
        }

        const container_gui_style = {
            height: 100,
            width: 250,
            borderStyle: "solid",
            borderWidth: "thin",
        }
        const col_style = {
            padding: "20px",
            borderStyle: "solid",
            height: 600,
            overflow: "auto",
            borderWidth: "thin",
        }
        const diagram_container_style = {
            height: this.state.diagram_height,
            width: this.state.diagram_width,
            borderStyle: "solid",
        }

        const text_styles = reactCSS({
            'default': {
              color: {width: '36px',height: '14px',borderRadius: '2px',backgroundColor: this.state.text_color},
              swatch: {padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',},
              popover: {position: 'absolute',zIndex: '2',},
              cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',},},});

        const border_styles = reactCSS({
            'default': {
                color: {width: '36px',height: '14px',borderRadius: '2px',backgroundColor: this.state.border_color},
                swatch: {padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)',display: 'inline-block',cursor: 'pointer',},
                popover: {position: 'absolute',zIndex: '2',},
                cover: {position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px',},},});
                
        const background_styles = reactCSS({
            'default': {
                color: {width: '36px',height: '14px',borderRadius: '2px',backgroundColor: this.state.background_color},
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

                        <div>
                            <i class="small material-icons col">zoom_in</i>
                            <i class="small material-icons col">zoom_out</i>
                            <font size="5" class="col s3">Save</font>
                            <font size="5" class="col">Close</font>
                        </div>
                        <br></br><br></br>Text Feild<br></br>
                        <input readOnly type="text" class="browser-default"id="input" defaultValue="Input" onClick={this.addControl}></input><br></br><br></br>
                        Container
                        <div id="container" onClick={this.addControl} style={container_gui_style}></div>
                        <br></br>Label<br></br>
                        <label id="label" onClick={this.addControl}>Label Element</label>
                        <br></br><br></br>Button<br></br>
                        <button class="" id="button" onClick={this.addControl}>Click Here</button>

                    </div>

                    <div class="col s6" style={col_style}>
                        <div class="" style={diagram_container_style}>
                            <ItemsList properties={properties} theState={this.state} />
                        </div>
                    </div>

                    <div class="col s3" style={col_style}>
                        <h5>Diagram Properties</h5>
                        <label><font size="2">Name </font><input type="text" class="browser-default" id="diagram_name" onChange={this.handleChange} defaultValue={this.state.diagram_name}></input></label><br></br>
                        <label><font size="2">Width </font><input type="text" class="browser-default" id="diagram_width" onChange={this.handleChange} defaultValue={this.state.diagram_width}></input></label><br></br>
                        <label><font size="2">Height </font><input type="text" class="browser-default" id="diagram_height" onChange={this.handleChange} defaultValue={this.state.diagram_height}></input></label><br></br>
                        <h5>Control Properties</h5>
                        <label><font size="2">Text </font><input type="text" class="browser-default" id="control_text" onChange={this.handleChange} defaultValue={this.state.text}></input></label><br></br>
                        <label><font size="2">Font Size </font><input type="text" class="browser-default" id="font_size" onChange={this.handleChange} defaultValue={this.state.font_size}></input></label><br></br>
                        <label><font size="2">Border Thickness </font><input type="text" class="browser-default" id="border_thickness" onChange={this.handleChange} defaultValue={this.state.border_thickness}></input></label><br></br>
                        <label><font size="2">Border Radius </font><input type="text" class="browser-default" id="border_radius" onChange={this.handleChange} defaultValue={this.state.border_radius}></input></label><br></br><br></br>
                       
                        <label><font size="2">Text Color</font><div>
                            <div style={ text_styles.swatch } onClick={ this.handleTextColorClick }>
                            <div style={ text_styles.color } /></div>
                            { this.state.text_displayColorPicker ? <div style={ text_styles.popover }>
                            <div style={ text_styles.cover } onClick={ this.handleTextColorClose }/>
                            <ChromePicker disableAlpha={true} color={ this.state.text_color } onChange={ this.handleTextColorChange } />
                            </div> : null }
                        </div></label><br></br>
                        <label><font size="2">Background Color</font><div>
                            <div style={ background_styles.swatch } onClick={ this.handleBackgroundColorClick }>
                            <div style={ background_styles.color } /></div>
                            { this.state.background_displayColorPicker ? <div style={ background_styles.popover }>
                            <div style={ background_styles.cover } onClick={ this.handleBackgroundColorClose }/>
                            <ChromePicker disableAlpha={true} color={ this.state.background_color } onChange={ this.handleBackgroundColorChange } />
                            </div> : null }
                        </div></label><br></br>
                        <label><font size="2">Border Color</font><div>
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
    console.log(ownProps);
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
        key: key,
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