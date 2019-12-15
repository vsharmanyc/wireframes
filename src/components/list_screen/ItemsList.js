import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';;

class ItemsList extends React.Component {
    render() {
        const properties = this.props.properties;
        const theState = this.props.theState;

        return (
            <div className="wireframes section">
                {theState && properties && properties.map(function(property) {
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
                    if(properties.element == "button")
                        return (<button style={container_style}>{property.text}</button>);
                    else if(properties.element == "label")
                        return (<label style={container_style}>{property.text}</label>);
                    else if(properties.element == "container")
                        return(<div style={container_style}></div>);
                    else
                        return(<input readOnly type="text" class="browser-default" defaultValue={property.text} style={container_style}></input>);
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