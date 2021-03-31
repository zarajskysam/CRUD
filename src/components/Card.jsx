import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id={this.props.id} className="card">
                <div className="card-remove" onClick={(id) => this.props.removeMessage(this.props.id)}>╳</div>
                <div className="card-message">{this.props.message}</div>
            </div>
        )
    }
}

export default Card