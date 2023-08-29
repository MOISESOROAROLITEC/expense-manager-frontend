import {
  UserLoginResponse,
  UserRegisterResponse,
} from "../interfaces/user-interfaces";
import { client } from "./apollo";
import {
  deleteUsersGraphQL,
  loginUserGraphQL,
  registerUserGraphQL,
} from "./graphql-request";

export const deleteUsers = async () => {
  await client.mutate({ mutation: deleteUsersGraphQL });
};

export async function login(email: string, password: string) {
  const user = await client.mutate<UserLoginResponse>({
    mutation: loginUserGraphQL,
    variables: { email, password },
  });
  const token = user.data?.loginUser.token;
  if (token) {
    localStorage.setItem("token", token);
  } else {
    throw new Error("Le token de l'utilisateur est requis");
  }
}

export async function signup({
  name,
  email,
  password,
  birthDay,
}: {
  name: string;
  email: string;
  password: string;
  birthDay: string;
}) {
  const res = await client.mutate<UserRegisterResponse>({
    mutation: registerUserGraphQL,
    variables: { name, email, password, birthDay },
  });
  const user = res.data?.createUser;
  if (!user) {
    throw new Error("impossible de créer ce utilisateur");
  }
}
