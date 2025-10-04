# 🛒 JS Webshop

![Docker](https://img.shields.io/badge/docker-ready-blue)

A modern web shop demo project featuring a **static frontend** hosted with **nginx** and a **mock REST API** powered by **json-server**.  
Ideal for end-to-end testing, learning, and rapid prototyping.

---

## 🚀 Features

- Static frontend served via **nginx**
- Mock REST API for users (`data/users.json`)
- **Dockerized** for quick setup and deployment
- **Selenium-ready** for automated E2E testing

---

## 🏁 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed

### Accessing the Project

- **Frontend:** [http://localhost:80](http://localhost:80)
- **API:** [http://localhost:3000/users](http://localhost:3000/users)

---

## 🧪 Testing

Automated E2E tests are provided using Selenium and Cypress.
Run tests against the running shop and API using the provided Bash script.

### Running Tests

1. **Make the script executable (if needed):**

    ```bash
    chmod +x test-with-shop.sh
    ```

2. **Run the script:**

    ```bash
    ./test-with-shop.sh
    ```

The script will:

- Start the webshop
- Wait until the shop is healthy
- Run Selenium tests and Cypress tests
- Stop the container after tests

---
