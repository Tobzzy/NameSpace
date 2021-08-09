import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form as AntdForm, Input, Button, Alert } from "antd";

interface Address {
  raw_address: string;
}
interface TaskValues {
  account: string;
  category: string;
  address: Address;
}

export const Form = () => {
  const [newTask, setNewTask] = useState(false);
  const [formValues, setFormValues] = useState<TaskValues>({
    /*
    TODO: Account and Category should not be static values
    account and category has a default value because user is not authenticates
    in this app itself, on a normal circumstances both values should be dynamic
     */
    account: `${process.env.REACT_APP_ACCOUNT_URL}`,
    category: "assignment",
    address: { raw_address: "" },
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function postData() {
      await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${process.env.REACT_APP_AUTHENTICATION_TOKEN}`, // Ideally should be received after validation
        },
      })
        .then((response) => {
          if (response.status === 201) {
            setMessage("New task created");
            setInterval(() => {
              setNewTask(false);
              setMessage("");
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    }
    postData();
  }, [formValues]);

  const onSubmit = (values: Address) => {
    setFormValues({
      ...formValues,
      address: {
        raw_address: values.raw_address,
      },
    });
  };

  return (
    <Main>
      {newTask ? (
        <>
          {message && <StyledAlert message={message} type="success" />}
          <AntdForm
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <AntdForm.Item
              name="raw_address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <StyledInput
                bordered
                placeholder="Enter new task address"
                onPressEnter={() => onSubmit}
              />
            </AntdForm.Item>
            <StyledButton htmlType="submit" $width="100px">
              Create task
            </StyledButton>
          </AntdForm>
        </>
      ) : (
        <StyledButton onClick={() => setNewTask(true)}>New task</StyledButton>
      )}
    </Main>
  );
};

const Main = styled.div`
  font-size: 16px;
  font-family: "Times New Roman", Times, serif;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-basis: 30%;
  padding: 40px 30px;
`;
const StyledInput = styled(Input)`
  width: 70%;
  height: 35px;
`;
const StyledButton = styled(Button)<{ $width?: string }>`
  background-color: #4cba4c;
  color: #fff;
  cursor: pointer;
  margin-top: 5px;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: 30px;
`;
const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;
