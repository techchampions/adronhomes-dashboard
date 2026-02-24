import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoginForm from "../components/AuthComponents/LoginForm";
import Button from "../components/Button";
import Auth from "../utils/Auth";
import AccountSelect from "./AccountSelect";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const [userAccounts, setuserAccounts] = useState<UserAccount[]>([]);
  const [authvalues, setauthvalues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (values: typeof initialValues) => {
    const accounts = await Auth.login(values);

    if (accounts) {
      setuserAccounts(accounts);
      setauthvalues(values);
    }
  };
  const LoginContainer = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <Form>
              <LoginForm />
              <Button
                type="submit"
                isLoading={false}
                disabled={false}
                loadingText="Loading..."
                label={"Log In"}
                className={`bg-adron-green text-white w-full py-2 rounded-full mt-10`}
              />
            </Form>
          </>
        )}
      </Formik>
    );
  };
  if (userAccounts.length > 0) {
    return <AccountSelect users={userAccounts} values={authvalues} />;
  }
  return <LoginContainer />;
};

export default Login;
