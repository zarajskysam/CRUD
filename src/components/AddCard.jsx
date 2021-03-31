import React from 'react';
import Card from './Card';

const DEFAULT_MESSAGE = {
    message: ''
}

class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cardsArr: [], cardObj: DEFAULT_MESSAGE };
    }

    componentDidMount() {
        this.getCardList();
    }

    
    getCardList() {
        let cardList = () => {
            fetch('http://localhost:7777/notes')
                .then((responce) => responce.json())
                .then((cards) => this.setState({cardsArr: cards}));
        }
        cardList();
    }
    
    changeSubmit(evt) {
        this.setState(() => ({
            cardObj: {
                message: evt.target.value
            }
        }))
    }

    addCard(evt) {
        evt.preventDefault();
        const addToCardList = () => {
            fetch('http://localhost:7777/notes', {
                method: 'POST',
                body: JSON.stringify({"message": this.state.cardObj.message}),
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
                .then(() => this.getCardList())
        }
        addToCardList();
    }

    removeMessage(id) {
        console.log(id);
        const removeCardList = () => {
            fetch(`http://localhost:7777/notes/${id}`, {
                method: 'DELETE'
            })
                .then(() => this.getCardList())
        }
        removeCardList();
    }

    render() {
        return (
            <React.Fragment>
                <button className="refresh-button" onClick={() => this.getCardList()}>↺</button>
                <form className="add-card" onSubmit={(evt) => this.addCard(evt)}>
                    <input placeholder="Введите сообщение" type="text" className="add-card-input" onChange={(evt) => this.changeSubmit(evt)}/>
                    <button className="add-card-button">Добавить</button>
                </form>
                <div className="card-list">
                    {
                    this.state.cardsArr.map(item => (
                        <Card key={item.id} id={item.id} message={item.message} removeMessage={(id) => this.removeMessage(id)}/>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default AddCard