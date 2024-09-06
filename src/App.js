import React, { useState } from 'react';
import NFCReader from './components/NFCReader';
import UserList from './components/UserList';
import UserAssociationForm from './components/UserAssociationForm';

function App() {
  const [uuid, setUUID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1>Wasso Wasso Wasso Wassssuuup</h1>
      <NFCReader onUUIDRead={setUUID} />
      {uuid && (
        <>
          <UserList onUserSelected={setSelectedUser} />
          {selectedUser && (
            <UserAssociationForm uuid={uuid} name={selectedUser}/>
          )}
        </>
      )}
    </div>
  );
}

export default App;
