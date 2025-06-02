import Card from '../../components/Card/card';
import { useState } from 'react';

const Home = ({ onDelete, onEdit, onMoreInfo}) => {

    const [cards, setCards] = useState([
        { id: 1, title: "Card 1", description: "Once upon a time there was a lovely princess.", time: "10:00 AM" },
        { id: 2, title: "Card 2", description: "This is the second card.", time: "11:00 AM" },
        { id: 3, title: "Card 3", description: "This is the third card.", time: "12:00 PM" }
    ]);

    const handleEdit = (cardId, newTitle, newDescription) => {
        setCards(cards.map(card => 
            card.id === cardId
            ? { ...card, title: newTitle, description: newDescription }
            : card
        ));
    };
    
    return (
        <div className='container'>
            {cards.map(card => (
                <Card 
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    onEdit={(title, desc) => handleEdit(card.id, title, desc)} 
                />
            ))}
        </div>    
    );
}

export default Home;