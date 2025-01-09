# News Blog with Payout Features

## Overview

This project is a **Responsive Dashboard** that integrates news and blog data, provides a **Payout Calculator**, and offers **Export Functionality** for user and admin interactions. It is designed with a focus on user-friendly navigation and interactive data representation. The dashboard includes features for fetching content from third-party news APIs, calculating payouts based on articles, and offering export options (PDF, CSV, Google Sheets).

## Features

### 1. News and Blog Data Integration
- **Fetch data** from third-party news APIs (e.g., News API, Guardian API).
- **Display articles/blogs** with details including author, date, and type (news or blog).
- **Error Handling:** Graceful fallback for API failures with user-friendly error messages.

### 2. Filtering and Search
- Implement **filters** to allow users to search by:
  - **Author**
  - **Date Range**
  - **Type** (news, blogs)
- Add a **global search bar** for quick keyword searches across all articles.

### 3. Responsive Design
- Build a **mobile-first**, **responsive UI** to ensure compatibility across desktop and mobile devices.
- Use **Tailwind CSS** or similar frameworks for easy and responsive styling.

### 4. Payout Calculator
- Enable **admins** to set a payout rate per article/blog.
- **Store payout data** in the browser’s `localStorage`.
- Automatically calculate total payouts based on the number of articles/blogs and their rates.

### 5. Export Functionality
- **Export options**:
  - **PDF**
  - **CSV**
  - **Google Sheets Integration**
- Allows users to export data in different formats based on filters or all data.

### 6. Dashboard
- Provide an **overview** of the total number of articles/blogs fetched from the API.
- Visual representation of **payouts** and **filters**.
- Display **graphical charts** (bar, pie, or line charts) for article trends by author or type.

### 7. News Analytics
- Graphical representation of article trends by author or type using charting libraries (e.g., **Chart.js** or **Recharts**).

### 8. Payout Details
- A **table** displaying authors, articles, and calculated payouts.
- **Inline editing** for modifying payout rates directly within the table.

### 9. Error Handling
- Display appropriate messages when the third-party news API is unreachable or if there are any issues fetching data.

## Technical Requirements

### Frontend Frameworks
- **React.js/Next.js**: Core framework used to build the frontend interface.
- **Tailwind CSS**: Used for styling the application, ensuring a responsive and mobile-first design.
- **State Management**: Redux, Pinia, or Context API for managing global state across the application.

### API Integration
- **Fetching Data**: Data is fetched from third-party news APIs such as News API or Guardian API using **fetch** or **Axios**.

### Charting Libraries
- **Chart.js/Recharts**: Used to create visual analytics and charts representing the trends in articles.

### Exporting Libraries
- **jsPDF**: Used to export data in PDF format.
- **papaparse**: Used to export data in CSV format.
- **Google Sheets API**: Integrating Google Sheets for export functionality.

### Bonus Features
- **Offline Mode**: Implement offline capabilities with `IndexedDB` or `localStorage` to view cached data.
- **Dark Mode**: Implement a dark mode toggle for a better user experience.
- **Performance Optimization**: Ensure high Lighthouse scores for performance, accessibility, and SEO.

## Setup

To set up this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/amanagg639/News-Blog.git
cd News-Blog
