import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageUser from '../components/ManageUser';
import WithoutFooterLayout from '../components/Layout/WithoutFooterLayout';

const Admin = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== "ADMIN") {
      nav("/notfound");
    }
  }, [nav]);

  return (
    <WithoutFooterLayout>
      <ManageUser />
    </WithoutFooterLayout>
  );
};

export default Admin;
