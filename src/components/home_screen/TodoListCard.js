import React from 'react';

class TodoListCard extends React.Component {
    componentDidMount() {
        this.setState(this.state);
    }
    render() {
        const { wireframe } = this.props;
        console.log(this.props)
        console.log("TodoListCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-0 todo-list-link cyan lighten-5">
                <div className="card-content teal-text text-accent-4">
                    <span className="card-title">{wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;