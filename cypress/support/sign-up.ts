import { signup } from "../../src/app/shared/utilities/request";

const username = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];
const birthDay = new Date().toISOString();

signup({ name: username, email, password, birthDay });
