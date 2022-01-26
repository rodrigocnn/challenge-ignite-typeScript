import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FoodItem } from './../../types/Food';

function ModalEditFood (props: any) {

  const { isOpen, setIsOpen, editingFood, handleUpdateFood, icon  } = props;
  
  const handleSubmit = async (data:FoodItem) => {
    handleUpdateFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form  onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon={icon} />
          <Input name="name" placeholder="Ex: Moda Italiana" icon={icon} />
          <Input name="price" placeholder="Ex: 19.90" icon={icon} />
          <Input name="description" placeholder="Descrição" icon={icon} />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  
};

export default ModalEditFood;
