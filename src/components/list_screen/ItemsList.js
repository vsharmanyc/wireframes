import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Rnd } from "react-rnd";

class ItemsList extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }

    controlClicked = (e) => {
        console.log("CONTROL CLICKED");

    }

    render() {
        const properties = this.props.properties;
        const theState = this.props.theState;
        const instance = this.props.instance;
        this.state =  instance.state;
        console.log("PROPS");
        console.log(this.props);

        return (
            <div className="wireframes section">
                {instance && instance.state && instance.state.properties && instance.state.properties.map(function(property) {
                    
                    /*instance.state.key = property.key;
                    instance.state.element = property.element;
                    instance.state.x = property.x;
                    instance.state.y = property.y;
                    instance.state.height = property.height;
                    instance.state.width = property.width;
                    instance.state.text = property.text;
                    instance.state.font_size = property.font_size;
                    instance.state.border_radius = property.border_radius;
                    instance.state.border_thickness = property.border_thickness;*/
                    
                    const container_style = {
                        "height":property.height,
                        "width":property.width,
                        "background-color":property.background_color,
                        "font-size":property.font_size,
                        "border-color":property.border_color,
                        "border-radius":property.border_radius,
                        "border-width":property.border_thickness,
                        "color":property.text_color
                    }
                    if(property.element == "button")
                    return (

                        <Rnd
                            size={{ width: property.width,  height: property.height }}
                            position={{ x: property.x, y: property.y }}
                            onDragStop={(e, d) =>{property.x = d.x; property.y = d.y; return({x: property.x, y: property.y});}}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                property.width = ref.style.width;
                                property.height = ref.style.height;
                                return({width : property.width, height : property.height });
                            }}>
                        <button onClick={instance.controlClicked} style={container_style}>{property.text}</button>
                        </Rnd>
                    
                    );
                else if(property.element == "label")
                    return (
                        <Rnd
                        size={{ width: property.width,  height: property.height }}
                        position={{ x: property.x, y: property.y }}
                        onDragStop={(e, d) =>{property.x = d.x; property.y = d.y; return({x: property.x, y: property.y});}}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            property.width = ref.style.width;
                            property.height = ref.style.height;
                            return({width : property.width, height : property.height });
                        }}>
                    <label onClick={instance.controlClicked} style={container_style}>{property.text}</label>
                    </Rnd>
                    );
                else if(property.element == "container")
                    return (
                        <Rnd
                        size={{ width: property.width,  height: property.height }}
                        position={{ x: property.x, y: property.y }}
                        onDragStop={(e, d) =>{property.x = d.x; property.y = d.y; return({x: property.x, y: property.y});}}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            property.width = ref.style.width;
                            property.height = ref.style.height;
                            return({width : property.width, height : property.height });
                        }}>
                    <div onClick={instance.controlClicked} style={container_style}></div>
                    </Rnd>
                    );
                else{
                    return (
                        <Rnd
                            size={{ width: property.width,  height: property.height }}
                            position={{ x: property.x, y: property.y }}
                            onDragStop={(e, d) =>{property.x = d.x; property.y = d.y; return({x: property.x, y: property.y});}}
                            onResizeStop={(e, direction, ref, delta, position) => {
                                property.width = ref.style.width;
                                property.height = ref.style.height;
                                return({width : property.width, height : property.height });
                            }}>
                            <input readOnly onClick={instance.controlClicked} type="text" class="browser-default" defaultValue={property.text} style={container_style}></input>
                        </Rnd>);
                    }
            })
            }
        </div>
    );
}
}

const mapStateToProps = (state, ownProps) => {
console.log("items list screen mstp");
console.log(ownProps);
console.log("NANI");
let properties = ownProps.properties;
console.log(properties);
console.log(state);
return {
    properties : properties,
    state: state,
    auth: state.firebase.auth,
};
};

export default compose(
connect(mapStateToProps),
firestoreConnect([
    { collection: 'users_data' },
]),
)(ItemsList);