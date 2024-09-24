# NestJS Prisma Project

This project is a RESTful API built with the NestJS framework, utilizing Prisma ORM for relational database management. It provides a structure for managing users, profiles, posts, and comments.

## Features

### User Management
- **Create User**: Register a new user.
- **Find All Users**: Retrieve a list of all users.
- **Activate User**: Activate a user account.
- **Find Email by ID**: Fetch a user's email using their ID.
- **Update User Details**: Modify user information.

### Profile Management
- **Create Profile**: Set up a profile for a user.
- **Update Profile**: Edit existing profile information.

### Post Management
- **Create Post**: Create a new post.
- **Find All Posts**: Retrieve all posts.
- **Find Post by ID**: Get a specific post using its ID.
- **Update Post by ID**: Modify a post using its ID.
- **Add Tags to Post**: Tag posts with relevant keywords.

### Comments
- **Make Comment on Post**: Add comments to a post by its ID.

## Technologies Used
- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma ORM**: A modern database toolkit that simplifies database access.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, enhancing the development experience.

## Getting Started

### Prerequisites
- Node.js (version >= 14.x)
- npm (version >= 6.x)
- A relational database (e.g., PostgreSQL, MySQL)
