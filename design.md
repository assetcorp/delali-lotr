# Project design

## Overview

This document provides detailed information on creating a React application that uses The Lord of the Rings API. The application showcases movies, characters, and quotes with a focus on high-quality code, user experience, and readability. The technologies used in building the application include React, TypeScript, Next.js, Material-UI, and Playwright for testing. This document aims to offer a comprehensive understanding of the application's design to job recruiters and fellow developers.

## Table of Contents

- [Project design](#project-design)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Application Architecture](#application-architecture)
  - [API Integration](#api-integration)
  - [UI/UX Design](#uiux-design)
  - [Responsive Web Design](#responsive-web-design)
  - [State Management and Performance Optimization](#state-management-and-performance-optimization)
  - [Testing](#testing)
  - [Live Demo](#live-demo)

## Application Architecture

The application is built using the following technologies:

- **React:** A popular JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that provides static typing, enhancing code quality, and readability.
- **Next.js:** A React framework that enables server-side rendering, static site generation, and API routes.
- **Material-UI:** A popular React UI framework that implements Google's Material Design guidelines.
- **Playwright:** A testing library that enables end-to-end testing for web applications.

The application is designed with a modular architecture that organizes each feature into its own folder. This structure ensures easy navigation and understanding of the codebase, while promoting the reuse of components.

## API Integration

The application consumes the API from The Lord of the Rings SDK I created a month ago. This SDK utilises the Lord of the Rings API, but provides an easy-to-use interface. The SDK is accessible via [https://www.npmjs.com/package/@delali/lotrsdk](https://www.npmjs.com/package/@delali/lotrsdk)

## UI/UX Design

The application's user interface is built using Material-UI components, which follow Google's Material Design guidelines. This ensures a consistent and modern look and feel across the application. The UI is designed with a focus on readability and usability, making it easy for users to navigate and interact with the content. Some highlights of the UI/UX design include:

- A clean and intuitive layout that highlights the most important information.
- Clear and legible typography with appropriate hierarchy and spacing.
- A consistent color scheme and visual design that enhances the overall user experience.
- A search bar that allows users to quickly find movies.

## Responsive Web Design

The application is built with a mobile-first approach, ensuring a seamless experience across various devices and screen sizes. The responsive design is achieved by using CSS Grid and Flexbox layouts from MUI's framework.

## State Management and Performance Optimization

For state management, the application leverages React's built-in Context API and custom hooks. This provides a lightweight and scalable solution for managing global state and sharing data between components. The application also uses the tanstack/react-query framework for optimised data fetching and caching.

## Testing

The application is tested using Playwright, a testing library that enables end-to-end testing for web applications.These tests simulate user interactions with the application, verifying that the application works correctly from the user's perspective.

The tests are organized in a way that mirrors the application's folder structure, making it easy to locate and update tests as needed.

## Live Demo

The application is deployed on Vercel, a popular platform for hosting Next.js applications. This provides a live demo of the application, showcasing its features and user experience. The live demo can be accessed at [https://delali-lotr.vercel.app/](https://delali-lotr.vercel.app/).
