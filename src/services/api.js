const API_BASE_URL = 'https://api.aperol.life'; 

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/members`);  
  return response.json();
};

export const saveUserUUIDAssociation = async (memberId, cardUid) => {
  const response = await fetch(`${API_BASE_URL}/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ member_id: memberId, card_uid: cardUid }),
  });

  if (!response.ok) {
    throw new Error('Failed to associate UID with user');
  }

  return response.json();
};
