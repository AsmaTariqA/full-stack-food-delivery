"use client";
import React, { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Modal } from "antd";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { useMenuItems } from "@/Hooks/useMenuItems";

export default function MenuList({
  setSelectedMenu,
  setApiError,
  formik,
  toast,
  setEnable,
  setMenuImage,
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState(null);

  const { menuItems, error, isLoading } = useMenuItems();

  // Loading or error states
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const setVisibleDeleteModal = (item = null) => {
    setMenuItemToDelete(item);
    setOpenDeleteModal(!openDeleteModal);
  };

  const deleteMenuItem = async (id) => {
    try {
      const response = await axios.delete(`/api/menu/${id}`);

      if (response.status === 200) {
        formik.resetForm();
        toast.success("Menu item has been deleted successfully!");
        mutate("menuItems");
      } else {
        const errorData = response.data;
        setApiError(errorData.message);
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu List</h1>

      {(!menuItems || menuItems.length === 0) && (
        <p className="text-center text-gray-500">No menu items found.</p>
      )}

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 p-2">
        {(menuItems ?? []).map((item, index) => (
          <div key={item._id || index}>
            <Card
              className="mx-auto w-64 h-64 sm:w-44 md:w-60"
              shadow="sm"
              isPressable
              onPress={() => {
                setSelectedMenu(item);
                setEnable(true);
                setMenuImage("");
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[140px]"
                  src={item.image}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500">{item.basePrice} $</p>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => setVisibleDeleteModal(item)} />
                </span>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Menu Item"
        open={openDeleteModal}
        onOk={() => menuItemToDelete && deleteMenuItem(menuItemToDelete._id)}
        okButtonProps={{
          style: { backgroundColor: "blue", color: "white" },
        }}
        onCancel={() => setVisibleDeleteModal(null)}
      >
        <p>Are you sure you want to delete this menu item?</p>
        <p className="font-bold">{menuItemToDelete?.name}</p>
      </Modal>
    </div>
  );
}
