import { createHash } from "../utils/hashPassword.js";

const user = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@test.com',
    password: generateRandomPassword(),
    role: 'admin'
};

function generateRandomPassword() {
    const password = Math.random().toString(36).slice(-8);
    console.log(`\nAdmin user created.\nemail: admin@test.com\npassword: ${password}\n`);
    return createHash(password);
};

export default user;