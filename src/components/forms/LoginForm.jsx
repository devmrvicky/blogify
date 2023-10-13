import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin, start, end } from "../../features";
import { Input, Button, Container } from "..";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      dispatch(start());
      const login = await authService.login(data);
      // console.log(login);
      if (login) {
        const userData = await authService.getUser();
        dispatch(authLogin(userData));
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
          onSubmit={handleSubmit(login)}
        >
          <h1 className="text-2xl font-semibold py-5">Login</h1>
          <p>Enter your detail below</p>
          <Input
            type="email"
            label="email"
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
            className=" text-sm rounded py-2 border w-full max-w-md"
          >
            Login
          </Button>
          <p className="w-full max-w-md text-sm">
            create an account.
            <Link
              to="/signup"
              className="text-blue-500 hover:underline-offset-2"
            >
              signup
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
};

export default SignupForm;
