# Impact Ledger 🌿

**The Trust Layer for Sustainable Finance**

Impact Ledger is a blockchain-based platform designed to eliminate greenwashing in sustainable finance. By binding loan disbursements to verified environmental impact milestones, we ensure that every dollar invested generates real, measurable change.

![Impact Ledger Hero](https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=2000)

## 🚀 The Problem
- **Greenwashing**: 40% of corporate green claims are unverifiable.
- **Opacity**: Lenders have no visibility into how funds are actually used after deployment.
- **Inefficiency**: Manual auditing is slow, expensive, and prone to human error.

## 💡 The Solution
Impact Ledger replaces manual audits with **AI-driven verification** and **Smart Escrow Contracts**. Funds are locked in a smart contract and released *only* when computer vision AI verifies the physical evidence of progress (e.g., drone footage of solar panel installation).

---

## 🏗️ Architecture & Technology

### Frontend (Current Implementation)
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **Charting**: Recharts

### Verification Engine (Simulated Demo)
- **AI Simulator**: Simulates analyzing drone footage and site documents for compliance.
- **Blockchain Simulator**: Simulates minting "Proof of Impact" tokens (NFTs) on the Polygon network.

---

## 🔮 Future Roadmap: Backend & Smart Contracts

We are actively building the decentralized infrastructure to power the next version of Impact Ledger.

### 1. Smart Contract Backend (Solidity/Polygon)
We will deploy `GreenLoan.sol` contracts to the Polygon Amoy testnet.
- **Escrow Logic**: A `LoanVault` contract that holds USDC/stablecoins.
- **Milestone Unlocking**: Only the `VerifierOracle` address can trigger a `releaseTranche()` function.
- **Impact NFTs**: Implementing **ERC-1155** tokens to represent verified carbon credits and impact milestones.

### 2. AI Integration (Python/TensorFlow)
Moving from simulation to real-time inference.
- **Model**: Custom-trained CNN (Convolutional Neural Network) for identifying solar arrays, wind turbines, and construction materials from aerial imagery.
- **Pipeline**:
    1.  User uploads video/image to IPFS.
    2.  Python backend fetches CID and runs inference.
    3.  If confidence > 95%, backend signs a transaction to the Smart Contract.

### 3. Data Availability
- **The Graph**: Indexing smart contract events for real-time querying on the dashboard.
- **IPFS/Filecoin**: Decentralized storage for all large evidence files (videos, high-res docs).

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gitsofaryan/Impact-Ledger.git
   cd impact-ledger-dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the App**
   Navigate to `http://localhost:8080` to see the dashboard.

---

## 👥 Contributors

- **Aryan Jain** - *Lead Developer* - [LinkedIn](https://www.linkedin.com/in/aryan-jain07/)

Built for the **LMA Edge Hackathon**.
