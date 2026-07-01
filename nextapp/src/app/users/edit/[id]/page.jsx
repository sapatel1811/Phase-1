"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserForm from "@/components/users/UserForm";
import { getUser, updateUser } from "@/services/userService";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";


export default function EditUser() {
const params = useParams();  const router = useRouter();
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const res = await getUser(params.id);
        if (isMounted) {
          setData(res);
        }
      } catch (error) {
        toast.error("User Not Found");
        router.push("/users");
      }
    };

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, [params.id, router]);

  const submit = async (form) => {
    setLoading(true);

    try {
      await updateUser(params.id, form);
      toast.success("User Updated Successfully");
      router.push("/users");
    } catch {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return 
    <div className="p-10">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-8">Edit User</h1>
        <UserForm initialData={data} loading={loading} onSubmit={submit} />
      </div>
    </DashboardLayout>
  );
}
