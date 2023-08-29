import { login } from "../../src/app/shared/utilities/request";

const email = process.argv[2];
const password = process.argv[3];

login(email, password);
