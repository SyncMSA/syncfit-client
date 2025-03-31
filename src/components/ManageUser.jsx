import React, { useState, useEffect, useContext } from 'react';
import { getUsers, deleteUser } from '../apis/AdminApi';
import { AuthContext } from '../contexts/AuthContext';
import './css/ManageUser.css';

const ManageUser = () => {
  const { accessToken } = useContext( AuthContext );
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (accessToken) {
      getUsers(accessToken)
        .then((data) => {
          setUsers(data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [accessToken]);

  const handleDelete = async (memberId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteUser(memberId, accessToken);
        setUsers(users.filter(user => user.memberId !== memberId));
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
  };

  return (
    <div className="manage-user-container">
      <h1>사용자 관리</h1>
      <div className="user-list">
        {users.map(user => (
          <div key={user.memberId} className="user-card">
            <img src={user.profileImageUrl} alt={user.nickname} />
            <div className="user-info">
              <h2>{user.nickname}</h2>
              <p>역할: {user.role}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(user.memberId)}>
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
