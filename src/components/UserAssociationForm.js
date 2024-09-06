import { saveUserUUIDAssociation } from '../services/api';

const UserAssociationForm = ({ uid, name }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveUserUUIDAssociation(name, uid);
    } catch (error) {
      console.log('Failed to save the association.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br/>
        <button type="submit">Conneeeee</button>
      </form>
    </div>
  );
};

export default UserAssociationForm;
