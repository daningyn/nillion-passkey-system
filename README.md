# Nillion Passkey System

## Introduction

Passkey is a new authentication method based on the WebAuthn and FIDO2 standards. It allows users to register and log in to systems without needing a password. Instead, users utilize biometric data or a PIN on their device to create and use a private key stored securely on the device.

In this project, I will build the backend for this passkey authentication system. The goal is to build a secure, passwordless authentication system compatible with both mobile devices and desktop computers in Nillion Network

## Example Live

You can check out the live example at [Live example](https://nillion-passkey-demo.daningyn.xyz/)

## Features

- **Passwordless Authentication**
- **Strong Security**
- **Anti-Phishing**
- **Biometric Integration**
- **Privacy-Focused**
- **Easy Recovery Options**

## Local Client Setup

### System Requirements

- Node.js (version 20.x or later)
- npm (version 10.8.x or later) or Yarn

### Installation

1. **Clone the repo**

```bash
git clone https://github.com/daningyn/nillion-passkey-system.git
cd nillion-passkey-system
```

2. **Setup environment variables in `.env`**

```bash
RP_ID="localhost"
ENVIRONMENT="development"
JWT_KEY="secret" # Your JWT secret
```

3. **Create database file**

```bash
mkdir database
touch database/database-local.sqlite
```

4. **Install Dependencies**

```bash
npm install
```

5. **Run Database migration**

If you have no `squelize-cli`, please install it first
```bash
npm i -g sequelize-clie
```

Run migration
```bash
sequelize db:migrate
```

6. **Run the Application**

```bash
node app.js 
```

## License

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) file for details.

MIT License

Copyright (c) 2024 daningyn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact us via email at `daningyn@t4e.xyz`.

Thank you for using and contributing to the Nillion Passkey Backend System!