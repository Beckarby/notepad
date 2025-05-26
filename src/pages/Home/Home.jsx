import Card from '../../components/card';

const Home = () => {
        const handleDelete = () => console.log('Toast closed');
        const handleEdit = () => console.log('Toast closed');
        const handleMoreInfo = () => console.log('Toast closed');


  return (
    <div className='container'>
        <Card title="Card 1" description="This is the first card" time="10:00 AM" 
            onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />
        <Card title="Card 2" description="This is the second card" time="11:00 AM" 
        onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />
        <Card title="Card 3" description="This is the third card" time="12:00 PM" 
        onDelete={handleDelete} onEdit={handleEdit} onMoreInfo={handleMoreInfo}
        />
    </div>

    
  );
}

export default Home;