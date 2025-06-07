import Card from '../../components/Card/card';
import Modal from '../../components/Modal/modal';
import EditForm from '../../components/CardForm/CardForm';
import { useState, useEffect } from 'react';
import { Plus, LayoutGrid } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../config/firebase';

const Home = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isGrid, setIsGrid] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, 'cards'),
            where('userId', '==', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cardsData = [];
            snapshot.forEach(doc => {
                cardsData.push({ id: doc.id, ...doc.data() });
            });
            setCards(cardsData);
        });
        return unsubscribe;
    }, [currentUser]);

    const handleEdit = async (cardId, newTitle, newDescription) => {
        try {
            await updateDoc(doc(db, 'cards', cardId), {
                title: newTitle,
                description: newDescription,
            });
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    const handleDelete = async (cardId) => {
        try {
            await deleteDoc(doc(db, 'cards', cardId))
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const handleAddCard = async (newTitle, newDescription) => {
        if (!currentUser) {
            console.error("No user is currently logged in.");
            return;
        }
        try {
            await addDoc(collection(db, 'cards'), {
                title: newTitle,
                description: newDescription,
                userId: currentUser.uid,
                createdAt: new Date(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        } catch (error) {
            console.error("Error adding card:", error);
        }
    }

    const handleToggleLayout = () => {
        setIsFading(true);
        setTimeout(() => {
            setIsGrid(prev => !prev);
            setIsFading(false)
        }, 300)
    }
    
    return (
        <div>
            <div style={{ padding: '1rem', textAlign: 'center' }}>
                <button onClick={() => {
                    setOpenAddModal(true);
                }} className='add-card-btn'>
                    <Plus className='plus-icon' />
                        Add Card
                </button>
                <button  onClick={handleToggleLayout} className='add-card-btn'>
                    <LayoutGrid className='plus-icon'/>
                    Change Layout
                </button>
            </div>
            <div className=
                {`${isGrid ? 'container grid-layout' : 'container list-layout'}${isFading ? 'layout-fade' : ''}`
            }>
                {cards.map(card => (
                    <Card 
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        onEdit={(title, desc) => handleEdit(card.id, title, desc)} 
                        onDelete={() => handleDelete(card.id)}
                    />
                ))}
            </div>    
            <Modal isOpen={openAddModal} onClose={() => {
                setOpenAddModal(false)}}>
                    <EditForm
                        title=""
                        description=""
                        onSave={handleAddCard}
                        onClose={() => setOpenAddModal(false)}
                        isAddMode={true}
                        isOpen={openAddModal}
                    ></EditForm>
                </Modal>
        </div>
    );
}

export default Home;