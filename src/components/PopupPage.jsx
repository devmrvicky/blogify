import { Container, FixedPage } from ".";

const PopupPage = ({ children, className = "" }) => {
  return (
    <FixedPage>
      <Container
        maxWidth="max-w-3xl"
        className="text-black bg-white/70 h-[90%] overflow-auto px-5 py-5 backdrop-grayscale  border flex flex-col gap-5 rounded"
      >
        <div className={`${className}`}>{children}</div>
      </Container>
    </FixedPage>
  );
};

export default PopupPage;
