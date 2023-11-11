import { Container } from "../../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ProfileEditPopup from "./ProfileEditPopup";

const Me = () => {
  const { status } = useSelector((store) => store.auth);
  const { isPageOpen } = useSelector((store) => store.posts);

  return (
    <div className="min-h-screen">
      {isPageOpen.profileEditPage && <ProfileEditPopup />}
      {status ? (
        <Container maxWidth="max-w-3xl" className="h-full py-2">
          <Outlet />
        </Container>
      ) : (
        <h1>You are not authorized person.</h1>
      )}
    </div>
  );
};

export default Me;
