# **GeminiGPT**

## **Overview**
**GeminiGPT** is a simple AI chatbot application that combines frontend and backend services. It offers dynamic model selection using Google's Gemini API. The project includes a Node.js-based frontend and two backend options:  
- **JavaScript (index.js)**  
- **Python (server.py) using FastAPI**  

---

## **Repository Structure**
```bash
GeminiGPT/
├── .vscode/          # VSCode configuration files
├── __pycache__/      # Python cache files
├── my_chatgpt/       # Frontend application folder
│   ├── node_modules/ # Node.js dependencies (excluded in GitHub)
│   ├── public/       # Static assets for the frontend
│   ├── src/          # Frontend source code
│   ├── package.json  # Node.js project metadata
│   ├── package-lock.json # Lock file for dependencies
│   └── README.md     # Documentation for the frontend
├── node_modules/     # Backend dependencies (excluded in GitHub)
├── .env              # Environment variables (update as needed)
├── README.md         # Documentation for the entire project
├── index.js          # JavaScript backend service
├── models.txt        # Model-related data or configuration
├── server.py         # Python backend service using FastAPI
```

---

## **Getting Started**

### **Step 1: Clone the Repository**
Clone this repository to your local machine:
```bash
git clone https://github.com/Epoch-Seeker/GeminiGPT.git
```
## **Step 2: Install Dependencies**

### **Frontend Setup**
Navigate to the `my_chatgpt` folder and install the required Node.js dependencies::  
```bash
cd my_chatgpt
npm install
```

If you plan to use the Python backend, install FastAPI and Uvicorn:
```bash
pip install fastapi uvicorn
```

**Step 3: Start the Frontend**
------------------------------

To start the frontend application:

1.  Navigate to the src folder inside `my_chatgpt`.
    
2.  Run the following command:
    ```bash
    npm start
    ``` 
    

**Step 4: Choose Your Backend**
-------------------------------

You can choose one of the following backend options:

**Option 1: JavaScript Backend**
--------------------------------

1.  Navigate to the root directory of your project.
    
2.  Start the backend service using Node.js:
    ```bash
    node index.js
    ```
    

**Option 2: Python Backend**
----------------------------

1.  Ensure you have FastAPI installed.
    
2.  Start the backend service using Uvicorn:
    ```bash
    uvicorn server:app --reload --host 0.0.0.0 --port 3080
    ```
**Technologies Used**
---------------------

*   **Frontend**: React.js (or another JavaScript framework based on your setup).
    
*   **Backend**:
    
    *   Node.js for JavaScript-based services.
        
    *   FastAPI for Python-based services.
        

**Contributing**
----------------

We welcome contributions! Fork this repository, make your changes, and submit a pull request.

**License**
-----------

This project is licensed under [MIT License](https://opensource.org/licenses/MIT).

