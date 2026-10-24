# Vision Guard AI

Build a modern, professional, fully responsive React.js frontend for an AI-powered Face Recognition & Deepfake Detection System.

Tech Stack:

React.js (Vite)

React Router DOM

Tailwind CSS

Framer Motion for animations

Axios for API calls

Lucide React Icons

React Hot Toast (or equivalent) for notifications

Recharts or Chart.js for metrics visualization

Responsive for Mobile, Tablet, and Desktop

Design Requirements:

Modern AI-themed UI

Clean and attractive layout

Smooth animations and transitions

Professional color palette (Blue, Indigo, Purple gradients)

Glassmorphism cards where appropriate

Sticky Navbar

Footer section

Mobile responsive design

Loading animations during prediction

Success/Error toast notifications

Interactive charts and analytics dashboards

Professional KPI and metrics cards

Dark/Light mode support (optional but preferred)

Project Evaluation Metrics (Use Actual Values Throughout the Website)

Classification Report

ClassPrecisionRecallF1-ScoreSupportGenuine0.950.940.951200Fake0.920.930.921100Masked0.940.950.951150Deepfake0.930.920.921050

Overall Metrics

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Total Samples: 4500

Number of Categories: 4

Dataset Distribution

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Model Performance Summary

The model performs best on Genuine and Masked classes with F1 Score of 95%.

Fake and Deepfake classes achieve strong performance with F1 Score of 92%.

Overall model accuracy is 94%, indicating reliable classification capability.

Mandatory Analytics Components

Create and use these visualizations across the website:

KPI Cards

Display:

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Dataset Size: 4500

Number of Categories: 4

Performance Comparison Bar Chart

Display:

Genuine → Precision 95%, Recall 94%, F1 95%

Fake → Precision 92%, Recall 93%, F1 92%

Masked → Precision 94%, Recall 95%, F1 95%

Deepfake → Precision 93%, Recall 92%, F1 92%

Category Distribution Pie Chart

Display:

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Animated Progress Bars

Display:

Accuracy 94%

Precision 94%

Recall 94%

F1 Score 94%

Dataset Statistics Card

Display:

Total Images: 4500

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Website Structure:

1. Home Page

Include:

Hero section with project title

Attractive AI-themed banner/image

Brief introduction about the project

"Start Prediction" button

Features section

Statistics cards

Workflow visualization

Performance metrics overview

Model analytics section

Features Cards:

Live Camera Prediction

Single Image Prediction

Multiple Image Prediction

Deep Learning Based Recognition

Real-time Processing

Secure and Accurate Detection

Statistics Cards:

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Dataset Size: 4500

Categories: 4

Performance Metrics Dashboard:

Display visually appealing metric cards and charts using actual project values:

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Charts:

Performance Comparison Bar Chart

Category Distribution Pie Chart

Prediction Trends Line Chart

Model Performance Bar Chart

Classification Report Section:

Display the complete classification report table professionally.

Model Performance Section:

Explain:

Genuine and Masked classes achieve the highest F1 Score (95%).

Fake and Deepfake classes achieve F1 Score (92%).

Overall model accuracy is 94%.

2. About Project Page

Display complete project information:

Project Title:

"Face Recognition and Deepfake Detection using Deep Learning"

Sections:

Project Overview

Problem Statement

Objectives

Dataset Information

Technologies Used

Methodology

Workflow:

Face Detection

Face Alignment

Preprocessing

Deep Feature Extraction

Classification

Prediction

Models Used:

MTCNN

CNN

SVM

Categories:

Genuine

Fake

Masked

Deepfake

Performance Metrics Section:

Display metrics using cards, charts, and animated progress indicators:

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Classification Report Table:

ClassPrecisionRecallF1-ScoreSupportGenuine0.950.940.951200Fake0.920.930.921100Masked0.940.950.951150Deepfake0.930.920.921050

Dataset Metrics:

Total Images: 4500

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Number of Classes: 4

Charts:

Performance Comparison Bar Chart

Dataset Distribution Pie Chart

Future Scope Section

3. Live Camera Prediction Page

Requirements:

Access device webcam using browser API

Display live camera feed

Capture button

Buttons:

Start Camera

Capture Image

Predict

Retake

Workflow:

User opens camera

Live video displayed

User clicks Capture

Captured image preview shown

User clicks Predict

Image sent to backend API

Backend Endpoint:

POST /predict-live

Display:

Predicted Category

Confidence Score

Prediction Result Card

Processing Time

Prediction Probability Chart

Metrics Display:

Confidence Percentage

Inference Time (ms)

Prediction Probability Distribution

Show loading animation while prediction is running.

4. Single Image Prediction Page

Features:

Drag and Drop Upload

Browse Image Button

Image Preview

Buttons:

Upload

Predict

Reset

Backend Endpoint:

POST /predict-single

Display:

Uploaded Image

Predicted Category

Confidence Score

Prediction Status

Processing Time

Metrics Section:

Confidence Percentage

Inference Time

Prediction Probability Graph

Category-wise Probability Breakdown

Example:

CategoryProbabilityGenuine92%Fake3%Masked2%Deepfake3%

5. Multiple Image Prediction Page

Requirements:

Upload multiple images or complete folder

Display uploaded images in grid

Show count of uploaded images

Buttons:

Upload Folder

Predict All

Clear

Backend Endpoint:

POST /predict-multiple

Results:

Display table:

Image NamePredictionConfidenceProcessing Timeimage1.jpgGenuine95%120ms

Provide:

Search

Filter

Sort

Pagination

Download Results CSV

Download Results PDF

Batch Metrics Dashboard:

Display:

Total Images Processed

Genuine Count

Fake Count

Masked Count

Deepfake Count

Average Confidence

Average Processing Time

Charts:

Category Distribution Pie Chart

Confidence Distribution Histogram

Prediction Summary Bar Chart

6. Sample Dataset Page

Create a beautiful dataset showcase page.

Display 4 cards:

Genuine Sample

Fake Sample

Masked Sample

Deepfake Sample

Each card should show:

Sample image

Category name

Description

Sample count

Use actual dataset counts:

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Buttons:

Download Genuine Sample

Download Fake Sample

Download Masked Sample

Download Deepfake Sample

Also provide:

"Download Complete Sample Dataset" button.

Dataset Analytics Section:

Display:

Total Dataset Size: 4500

Number of Classes: 4

Images per Category

Dataset Distribution Pie Chart

7. Analytics Dashboard Page

Create a dedicated analytics page.

Display:

KPI Cards

Accuracy: 94%

Precision: 94%

Recall: 94%

F1 Score: 94%

Dataset Size: 4500

Categories: 4

Charts

Performance Comparison Bar Chart

Category Distribution Pie Chart

Accuracy vs Precision Comparison

Class-wise Precision Chart

Class-wise Recall Chart

Class-wise F1 Score Chart

Classification Report Table

ClassPrecisionRecallF1-ScoreSupportGenuine0.950.940.951200Fake0.920.930.921100Masked0.940.950.951150Deepfake0.930.920.921050

Dataset Statistics Card

Total Images: 4500

Genuine: 1200

Fake: 1100

Masked: 1150

Deepfake: 1050

Animated Progress Indicators

Accuracy 94%

Precision 94%

Recall 94%

F1 Score 94%

Model Performance Insights

Display:

Genuine and Masked classes achieve the highest F1 Score (95%).

Fake and Deepfake classes achieve F1 Score (92%).

Overall model accuracy is 94%.

Use Recharts or Chart.js for all visualizations.

8. Navbar

Links:

Home

About

Live Prediction

Single Prediction

Multiple Prediction

Sample Dataset

Analytics Dashboard

9. Footer

Include:

Project Name

Developer Information

GitHub Link

LinkedIn Link

Contact Email

Documentation Link

Copyright

10. API Integration Layer

Create reusable Axios service.

API Base URL:

http://localhost:5000

Endpoints:

POST /predict-live

POST /predict-single

POST /predict-multiple

Optional Metrics Endpoints:

GET /metrics

GET /analytics

GET /dashboard-stats

GET /model-performance

Create separate API service file.

11. Folder Structure

src/
├── components/
│ ├── charts/
│ ├── metrics/
│ ├── ui/
│ └── common/
├── pages/
├── services/
├── layouts/
├── assets/
├── routes/
├── hooks/
├── utils/
├── context/
├── App.jsx
└── main.jsx

Generate:

Complete React code

Tailwind configuration

React Router setup

Responsive components

API integration

Modern UI design

Dummy sample images placeholders

Reusable chart components

Metrics dashboard components

Analytics visualizations

Clean and reusable component architecture

Loading skeletons

Error boundaries

Toast notifications

CSV/PDF export functionality

The final website should look like a production-ready AI application with modern animations, advanced analytics dashboards, interactive performance metrics, excellent UX/UI, and fully responsive behavior across all devices. All metrics, KPI cards, charts, classification reports, dataset statistics, and analytics dashboards must use the actual project evaluation values provided above (94% overall performance and 4500-image dataset) instead of placeholder or dummy values.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60810106-4931-43cf-8861-234d7910a0ca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
