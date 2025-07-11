# Campaign Landing Page CMS

A CMS for creating dynamic campaign landing pages with multi-language support.

## 🗄️ Database Schema

View the Entity Relationship Diagram: **[Campaign ERD](https://dbdiagram.io/d/CampaignERD-6870f046f413ba35086bb1eb)**

## 🚀 Quick Setup

### Prerequisites

- **Node.js**
- **PostgreSQL**
- **npm**

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd sample-campaign-landing-assessment-20250613

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

Create PostgreSQL database: `campaign_db`

Set environment variables (create .env in backend/):

```
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=campaign_db
DB_HOST=127.0.0.1
```

### 3. Backend Setup

```bash
cd backend

# Run database migrations
npm run migrate

# Seed the database with sample data
npm run seed:ts

# Start the backend server (development mode)
npm run dev
```

The backend will run on **http://localhost:3001**

### 4. Frontend Setup

Set environment variables (create .env in frontend/):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
cd frontend

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:3000**

## 🧪 Testing the API

Use the included `api-test.http` file to test all endpoints:

- **Templates CRUD**
- **Campaigns CRUD**
- **Sections CRUD**
- **Products CRUD**
- **Get Campaign by Slug** (main endpoint for frontend)

Example: GET `/api/campaigns/slug/fathersday2025`

## 🌐 How It Works

1. **Visit a campaign URL**: `http://localhost:3000/fathersday2025`
2. **Frontend fetches data**: Calls `/api/campaigns/slug/fathersday2025`
3. **Backend returns**: Campaign + Template + Sections + Products + Content
4. **Frontend renders**: Dynamic page using the template structure

## 🛠️ Available Scripts

### Backend

- `npm run dev` - Development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Production server
- `npm run migrate` - Run database migrations
- `npm run seed:ts` - Seed database with sample data

### Frontend

- `npm run dev` - Development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Production server

## 🗃️ Database Models

- **Template**: Page layouts (reusable designs)
- **Section**: Content blocks (hero, product-list, footer)
- **Campaign**: Actual landing pages with unique slugs
- **Product**: Items to display/sell
- **SectionContent**: Multi-language content for each section
- **Junction Tables**: TemplateSection, CampaignProduct

## 🌍 Multi-Language Support

The system supports English (`en`) and Malay (`my`) content versions stored in the `SectionContent` table.
