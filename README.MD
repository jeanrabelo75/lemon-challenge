# 🍋 Lemon Challenge — Eligibility API

RESTful API built with Node.js that checks the eligibility of clients based on their electricity bill. If the client is eligible, the API calculates the estimated CO₂ savings when switching to clean energy.

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-user/lemon-challenge.git
cd lemon-challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application locally

```bash
npm run dev
```

API will be available at:
`http://localhost:3000/`

## 📫 Available Endpoint

### `POST /eligibility`

Checks if a client is eligible based on the submitted data.

#### Sample request body:

```json
{
  "documentNumber": "14041737706",
  "connectionType": "biphase",
  "consumptionClass": "commercial",
  "consumptionSubClass": "commercial",
  "tariffModality": "conventional",
  "consumptionHistory": [
    3878, 9760, 5976, 2797, 2481, 5731,
    7538, 4392, 7859, 4160, 6941, 4597
  ]
}
```

#### Example response (eligible):

```json
{
  "eligible": true,
  "annualCO2Savings": 5553.24
}
```

#### Example response (not eligible):

```json
{
  "eligible": false,
  "ineligibilityReasons": [
    "Classe de consumo não aceita"
  ]
}
```

## 🧪 Run Tests

Unit tests powered by [Jest](https://jestjs.io/):

```bash
npm test
```

## 🐳 Run with Docker (optional)

```bash
docker build -t lemon-challenge .
docker run -p 3000:3000 lemon-challenge
```
