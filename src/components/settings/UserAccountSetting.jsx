import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { end, start, updateData } from "../../features";
import UserDataField from "./UserDataField";
import authService from "../../appwrite/authService";
import DeleteIdentity from "./DeleteIdentity";

const UserAccountSetting = () => {
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      password: "********",
    },
  });
  // console.log(userData);
  const updateField = async ({ email, name }) => {
    try {
      dispatch(start());
      if (email !== userData.email) {
        const password = prompt("Enter user password");
        const updatedData = await authService.updateEmail({ email, password });

        if (updatedData) {
          dispatch(updateData({ ...updatedData }));
        }
      }
      if (name !== userData.name) {
        const updatedData = await authService.updateName({ name });
        if (updatedData) {
          dispatch(updateData({ ...updatedData }));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(end());
    }
  };

  return (
    <div className="flex flex-col gap-4 px-2 max-w-3xl w-full mx-auto">
      <h1 className="text-2xl font-semibold p-3 text-center">
        User Account setting
      </h1>
      <Form
        onSubmit={handleSubmit(updateField)}
        className="flex flex-col gap-2"
      >
        <UserDataField
          type="text"
          label="name"
          field="User name"
          register={register}
        />
        <UserDataField
          type="email"
          label="email"
          field="Email id"
          register={register}
        />
        {/* <UserDataField
          type="password"
          label="password"
          field="Password"
          register={register}
        /> */}
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 active:scale-90 transition-all"
        >
          Save changes
        </button>
      </Form>
      <DeleteIdentity {...userData} />
    </div>
  );
};
export default UserAccountSetting;
