"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadUsers();
    })();
  }, []);

  return {
    users,

    loading,

    refreshUsers: loadUsers,
  };
}
