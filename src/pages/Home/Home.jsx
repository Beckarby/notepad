import Card from '../../components/Card/card';
import Modal from '../../components/Modal/modal';

const Home = ({ onDelete, onEdit, onMoreInfo}) => {
    return (
        <div className='container'>
            <Card title="Card 1" description="This is the first card" time="10:00 AM" 
                onDelete={onDelete} onEdit={onEdit} onMoreInfo={onMoreInfo}
            />
            <Card title="Card 2" description="This is the second card" time="11:00 AM" 
                onDelete={onDelete} onEdit={onEdit} onMoreInfo={onMoreInfo}
            />
            <Card title="Card 3" description="This is the third card" time="12:00 PM" 
                onDelete={onDelete} onEdit={onEdit} onMoreInfo={onMoreInfo}
            />
            <Card title="Card 4" description="This is the fourth card" time="1:00 PM"
                onDelete={onDelete} onEdit={onEdit} onMoreInfo={onMoreInfo}
            />
            
        </div>
    

    
    );
}

export default Home;