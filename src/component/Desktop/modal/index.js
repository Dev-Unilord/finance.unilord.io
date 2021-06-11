import styled from "styled-components";

function Modal({ modalOpen, setModalOpen }) {
  return (
    <Container
      style={{ display: modalOpen ? "flex" : "none" }}
      onClick={() => setModalOpen(!modalOpen)}
    >
      <Content>
        <span className="text">
          Pool is currently not open. Please check the staking schedules.
        </span>
        <Confirm>
          <span>Confirm</span>
        </Confirm>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  margin-left: 30vw;
  display: flex;
  width: 760px;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto auto;
  width: 568px;
  height: 187px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #ffffff;
  background-color: #000000;

  .cross {
    width: 20px;
    height: 20px;
    margin: auto auto;
    margin-top: 20px;
    margin-right: 20px;
  }
  .image {
    width: 400px;
    height: 250px;
    margin: auto auto;
    object-fit: contain;
  }
  .text {
    margin: auto auto;
    margin-top: 70px;
    width: 500px;
    height: 67px;
    font-size: 20px;
    font-style: italic;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`;
const Confirm = styled.div`
  display: flex;
  margin: auto auto;
  margin-bottom: 35px;
  width: 86px;
  height: 22px;
  object-fit: contain;
  border-radius: 20px;
  background-color: #ffffff;
  span {
    margin: auto auto;
    font-family: Times New Roman;
    font-size: 12px;
    line-height: 1.25;
    color: #000000;
  }
`;
export default Modal;
