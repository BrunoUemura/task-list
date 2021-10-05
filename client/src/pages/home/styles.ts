import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;

  background-color: #121214;
  color: white;
`;

export const MainHeader = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  height: 12vh;
  width: 50%;

  background-color: #212124;
  color: white;

  border-radius: 10px;
`;

export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
  height: 8vh;
  width: 50%;
`;

export const InputTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: grey;
  padding: 3px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #212124;
  color: white;
  margin-top: 50px;
  margin-bottom: 30px;

  input {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    width: 100%;
    outline-width: 0;
    color: #e1e1e6;
    border: none;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    outline: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8a8aed;
    color: #eff2f5;
    font-weight: 800;
    height: 90%;
    width: 50px;
    border-radius: 10px;
    font-size: 25px;
    border: none;
    outline-width: 0;

    &:hover {
      background-color: #6d6df2;
      color: #eff2f5;
      cursor: pointer;
    }
  }
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: grey;
  padding: 3px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #212124;
  margin-top: 20px;

  .complete-task {
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .task-text {
    width: 85%;
    margin-left: 10px;

    p {
      font-size: 20px;
      color: white;
    }
  }

  .edit-remove {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 5px;
      font-size: x-large;

      &:hover {
        cursor: pointer;
        background-color: #454547;
        border-radius: 10px;
      }
    }
  }
`;
