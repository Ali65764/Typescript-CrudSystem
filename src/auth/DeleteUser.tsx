import { Dialog, Transition } from '@headlessui/react';
import { GlobalProps } from '../interfaces/data';
import { useGlobalContext } from '../context/GlobalContext';
import { deleteUsers } from '../services/';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTER } from "../constant/Router";
import { Fragment } from 'react';

const DeleteUser = () => {
  const navigate = useNavigate();
  const { showRemove, deletedUser, closeDeleteModal } = useGlobalContext() as GlobalProps;

  const deleteUser = async (userId: number) => {
    try {
      await deleteUsers(userId);
      localStorage.removeItem("loggedInUser");
      toast.success("User removed successfully!", {
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate(ROUTER.Register);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition appear show={showRemove} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete {deletedUser && deletedUser.name}?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You won't be able to revert this!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => deletedUser && deleteUser(deletedUser.id)}
                    >
                       Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteUser;
