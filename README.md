# SkyScraper

by berk ai hack team

 Enhanced Flight Communication System
A real-time speech translation system powered by Google Gemini AI for aviation communication.

 AI-Powered Translation

Google Gemini AI: Context-aware translations with 95% accuracy
Aviation Context: Specialized terminology for flight communication
Multi-level Fallback: Google Translate → Basic Translate → Error handling



# ✈️ SkyScraper: Enhanced Flight Communication System

**by berk ai hack team**

---

## Overview

SkyScraper is a real-time speech and text translation system designed for aviation communication. Powered by Google Gemini AI and Google Translate, it provides context-aware, accurate translations for pilots, crew, and travelers, supporting both manual and voice input. The system is built with a modern React/Next.js frontend and a robust Flask/Python backend, communicating via REST API and Socket.IO for real-time features.

---

## Features

- **AI-Powered Translation**
  - **Google Gemini AI**: Context-aware translations with up to 95% accuracy.
  - **Aviation Context**: Specialized terminology for flight, ATC, and emergency communication.
  - **Multi-level Fallback**: Google Translate → Gemini AI → Error handling.

- **Speech Recognition**
  - Real-time voice-to-text using Google Speech Recognition.
  - Adjustable sensitivity for noisy environments (e.g., cockpits).

- **Manual Text Translation**
  - Translate typed text between 15+ languages.
  - Language auto-detection and confidence scoring.

- **User Interface**
  - Modern React/Next.js frontend.
  - Floating language assistant popup for instant access.
  - Responsive design for desktop and tablet.

- **Backend**
  - Flask API for translation, language/context info, and status.
  - Socket.IO for real-time speech events.
  - CORS enabled for seamless frontend-backend integration.

---

## Supported Languages

- English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi, Thai, Vietnamese, Dutch, and more.

---

## Aviation Contexts

- General, ATC (Air Traffic Control), Pilot, Ground, Emergency, Weather, Navigation, etc.

---

## Quick Start

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/skyscraper.git
cd skyscraper
