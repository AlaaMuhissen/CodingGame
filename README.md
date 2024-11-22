# 🧩 Coding Game: Puzzle Your Way to Coding Mastery

Welcome to **Coding Game**, a unique code-based puzzle game crafted to boost your coding skills through interactive challenges. Each puzzle is designed to engage your mind, test your logical thinking, and strengthen your problem-solving abilities while having fun with code.

## 🚀 Features
- **Code-Based Puzzle Challenges**: Each level presents puzzles that require logic and coding skills to solve.
- **Multi-Language Support**: Choose from **HTML**, **CSS**, and **JavaScript**, with over six topics to explore in each language.
- **Progressive Levels**:
  - **Level 1**: Immediate feedback with a red border appearing when a wrong block is placed.
  - **Level 2**: Players arrange all code blocks and then try running the code once it's complete.
  - **Level 3**: Code independently in a code editor, crafting solutions without blocks for an authentic coding experience.
- **Skill Progression**: The puzzles grow in complexity, allowing you to continuously improve.
- **Intuitive Design**: The game interface is designed to make coding challenges feel approachable and enjoyable.

## 🔗 Try it out!
[**Play CodingGame**](https://coding-game.vercel.app/)

## 🛠️ Technologies Used

### Backend
- **Node.js** with **Express**: Core server framework.
- **MongoDB** with **Mongoose**: Database management.
- **JWT (jsonwebtoken)** & **bcrypt**: User authentication and password security.
- **dotenv** & **cors**: Environment configuration and cross-origin requests.

### Frontend
- **React** with **Vite**: Main framework and bundling tool.
- **React Router** & **react-dnd**: For routing and drag-and-drop gameplay.
- **react-icons**, **react-toastify**, **use-sound**: UI enhancement and feedback.
- **react-live** & **react-monaco-editor**: Code editing and interactive coding.
- **Tailwind CSS**: For responsive styling.

## 🏁 Getting Started
Follow these steps to set up CodingGame and start playing:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AlaaMuhissen/CodingGame.git
   cd CodingGame
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd serverSide
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../clientSide
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create `.env` files in both `serverSide` and `clientSide`.
   - Add variables as specified in each `.env.example` file.

4. **Run the Game**:
   - Start the backend server:
     ```bash
     cd serverSide
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../clientSide
     npm start
     ```

5. **Play**:
   Open [http://localhost:3000](http://localhost:3000) and dive into your first coding puzzle!

## 🧩 Sample Puzzle
Here’s a sample puzzle you might encounter in the **HTML** module:

> **Objective**: Display "Hello World" on the screen using HTML tags.
> 
> **Available Code Blocks**:
> - `hello world`
> - `<h1>`
> - `</h1>`
> - `<br>`
> 
> **Solution**: Arrange the blocks in the correct order to form:
> ```html
> <h1>hello world</h1>
> ```

Once completed, you can progress to more advanced levels where new challenges await!
