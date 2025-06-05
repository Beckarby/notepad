import Card from '../../components/Card/card';
import { useState } from 'react';

const Home = ({ onDelete, onEdit, onMoreInfo}) => {

    const [cards, setCards] = useState([
        { id: 1, title: "Card 1", description: "Once upon a time there was a lovely princess.", time: "10:00 AM" },
        { id: 2, title: "Card 2", description: "This is the second card.", time: "11:00 AM" },
        { id: 3, title: "Card 3", description: "This is the third card.", time: "12:00 PM" },
        { id: 4, title: "Card 4", description: "This is te fourth card.", time: "01:00 PM"},
        { id: 5, title: "Card 5", description: "This is te fourth card.", time: "01:00 PM"},
        { id: 6, title: "Card 6", description: "This is te fourth card.", time: "01:00 PM"}
        
    ]);

    const handleEdit = (cardId, newTitle, newDescription) => {
        setCards(cards.map(card => 
            card.id === cardId
            ? { ...card, title: newTitle, description: newDescription }
            : card
        ));
    };

    const handleDelete = (cardTitle) => {
        setCards(prevCards => prevCards.filter(card => card.title !== cardTitle));
    };
    
    return (
        <div className='container'>
            {cards.map(card => (
                <Card 
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    onEdit={(title, desc) => handleEdit(card.id, title, desc)} 
                    onDelete={() => handleDelete(card.title)}
                />
            ))}
        </div>    
    );
}

export default Home;