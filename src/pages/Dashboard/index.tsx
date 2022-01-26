import {  useState , useEffect} from 'react';

import Header from '../../components/Header';
import api from '../../services/api';

import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodItem } from '../../types/Food';
import Food from '../../components/Food';


function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen ] = useState(false)
  const [editingFood, setEditingFood] = useState<FoodItem>({} as FoodItem)
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(()=>{
    getFoods();
  },[])

  const getFoods = async ()=> {
    const response = await api.get('/foods');
    setFoods( response.data)
  }

  const handleAddFood = async (food: FoodItem) => {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
        image: "https://storage.googleapis.com/golden-wind/bootcamp-gostack/desafio-food/food3.png"
      });

  
      setFoods([...foods, response.data]);
    
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodItem) => {


    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated  = foods.map( (f:FoodItem) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods( foodsUpdated );
    } catch (err) {
      console.log(err);
    } 
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food: FoodItem) => food.id !== id);
    setFoods( foodsFiltered);

  }

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen )
   
  }

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food)
    setEditModalOpen(true)
    
  }

    return (
      <>
        <Header openModal={toggleModal} />
        
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food: FoodItem) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  
};

export default Dashboard;
