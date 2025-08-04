# Volumen (Frontend)

## Overview

Volumen is a responsive and intuitive book discovery web application designed for seamless exploration and management of reading preferences. It provides a comprehensive suite of features for searching books, managing reading lists, and tracking personal reading journeys. This repository contains the complete source code for the frontend client, built with React and TypeScript.

The backend service for this application is maintained in a separate repository. You can find the backend source code [here](https://github.com/nathanEvrardDaCunha/Volumen_back).

**Live Demo:** [Work in Progress]

---

## Key Features

The application implements a comprehensive set of features for a complete book discovery and reading management experience.

### **Authentication & User Management**

-   Secure user registration and login functionality with personalized reading profiles.
-   Password recovery via email.
-   Authenticated session management using JSON Web Tokens (JWT).
-   Ability for users to view, update, and delete their accounts with reading preferences.

### **Book Discovery & Search**

-   Real-time book search powered by Google Books API integration.
-   Advanced search filters including author, genre, publication date, and rating.
-   Comprehensive book details display with cover images, descriptions, and metadata.

### **Reading Management**

-   Personal reading lists and favorites management.
-   Reading status tracking (want to read, currently reading, completed).
-   User ratings and reviews system for books.
-   Reading progress tracking and statistics.

### **User Interface & Experience**

-   A modern, clean, and mobile-first responsive design that ensures usability across all devices.
-   A user-selectable theme (light/dark mode) for improved accessibility and user comfort.
-   Interactive UI elements and smooth animations to enhance the user experience.
-   Accessible design following best practices for inclusive user experiences.
-   A dedicated contact page for user support inquiries.

---

## Technology Stack

This project was developed using a modern technology stack to ensure performance, scalability, and maintainability with optimized user experience for book discovery.

| Category             | Technology / Tool              |
| -------------------- | ------------------------------ |
| **Core**             | HTML5, CSS3, TypeScript, React |
| **Styling**          | SCSS/SASS                      |
| **State Management** | React Query (TanStack)         |
| **Routing**          | React Router DOM               |
| **Form Management**  | React Hook Form                |
| **Data Validation**  | Zod                           |
| **Tooling**          | Vite, npm                      |
| **Deployment**       | Docker                         |

---

## Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nathanEvrardDaCunha/Volumen_front.git
    cd Volumen_front
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

    ```env
    VITE_API_URL=your-api-url
    ```

    _Ensure the backend server is running and accessible at this URL._

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## Deployment

**[Work in Progress]**

The application is configured for deployment on Railway. Detailed deployment instructions will be provided soon, including configuration for Content Security Policy and environment variables setup.

---

## Project Retrospective & Key Learnings

**[Work in Progress]**

This section will outline key challenges faced during development and the engineering solutions implemented, including insights on Google Books API integration, responsive interface development with React and Sass, and accessibility best practices implementation.

---

## Conclusion

**[Work in Progress]**

A comprehensive summary of the development experience and skills gained will be provided upon project completion, highlighting the technical achievements in building a scalable and accessible book discovery platform with modern frontend technologies.