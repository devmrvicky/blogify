import { useSelector, useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ID } from "appwrite";
import { login as authLogin, start, end } from "../../features";
import { Input, Button, Container } from "..";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    try {
      dispatch(start());
      const id = ID.unique();
      const login = await authService.signup({ id, ...data });

      if (login) {
        dispatch(authLogin(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(end());
    }
  };

  return (
    <div>
      <Container maxWidth="max-w-md">
        <form
          className="w-full flex-1 flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(signup)}
        >
          <h1 className="text-2xl font-semibold py-5">Create an account</h1>
          <p>Enter your detail below</p>
          <Input
            type="text"
            label="name"
            placeholder="Enter name"
            {...register("name", { required: true })}
          />
          <Input
            type="email"
            label="Email id"
            placeholder="example@gmail.com"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            label="password"
            placeholder="********"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="border text-sm rounded py-2 w-full max-w-md"
          >
            Create account
          </Button>
          <button
            type="button"
            className="border flex items-center justify-center gap-3 text-sm rounded py-3 w-full max-w-md"
          >
            {/* <img src={iconGoogle} alt="icon-google" className="w-5" /> */}
            <span>Create account with google</span>
          </button>
          <p className="w-full max-w-md text-sm">
            I have already an account.
            <Link
              to="/login"
              className="text-blue-500 hover:underline-offset-2"
            >
              Log in
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
};

export default SignupForm;
