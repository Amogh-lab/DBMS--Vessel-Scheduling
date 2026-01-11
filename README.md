# Maritime Vessel Scheduling & Optimization System

A full-stack web platform for managing maritime vessel schedules, port operations, and ETA forecasting, designed around real-world constraints such as delayed updates and intermittent ship-to-shore communication.

## Overview
This project simulates how ports and shipping operators coordinate vessel movements, berth allocation, and weather-aware scheduling decisions.  
The system uses a **polyglot persistence approach**, combining structured and semi-structured data storage for realistic maritime workflows.

## Key Features
- Vessel scheduling and berth allocation
- Port, route, and weather data management
- ETA estimation and schedule updates
- RESTful APIs for system integration
- Web-based frontend for monitoring and interaction

## Tech Stack
- Frontend: React.js  
- Backend: Node.js / Express  
- Databases:
  - PostgreSQL (structured, relational data)
  - MongoDB (flexible and event-based data)
- API: REST (JSON)

## Collaboration
This is a collaborative project:
- Backend services, database schemas, and APIs are implemented by me
- Frontend UI and client-side integration are developed by a teammate

## Design Focus
- Clear separation between relational and non-relational data
- Asynchronous updates to handle delayed maritime communication
- Data consistency and fault-tolerant operations
- Scalable schema and service design

## Status
Core full-stack functionality implemented.  
Future scope includes optimization algorithms, predictive ETA models, and analytics dashboards.

---
This repository prioritizes **realistic system design choices over academic simplifications**.
