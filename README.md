# Prysm Device Launch Forecasting Model

A comprehensive React-based forecasting dashboard for analyzing the business impact of Prysm device launches across global regions.

## Features

- **Real-time Forecasting**: Interactive dashboard with 12-month forecast visualization
- **Regional Analysis**: Multi-region adoption rate modeling with excitement period effects  
- **Revenue Streams**: Tracks device sales, subscriptions, product sales, and temporal sales leader effects
- **Supply Planning**: Device availability scheduling with utilization tracking
- **Customizable Parameters**: Adjustable pricing, conversion rates, and cannibalization factors

## Key Metrics Tracked

- Total Sales (Baseline vs. With Prysm)
- Sales Leader Counts (Total and New)
- Device Utilization Rates
- Revenue Breakdown by Stream
- Incremental Sales Impact

## Technology Stack

- React 18
- Recharts for data visualization
- Tailwind CSS for styling
- Responsive design for all screen sizes

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd prysm-forecasting-model
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view in the browser.

## Deployment

This app is configured for easy deployment to Netlify:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy!

## Model Methodology

The forecasting model integrates:

- **Baseline Integration**: Real business forecast data showing natural market trends
- **Regional Adoption Rates**: Multi-factor analysis based on SCS sales, retention, and subscription performance
- **Excitement Periods**: 3-month adoption boost following device launches
- **Temporal Effects**: Sales leader conversion impacts over time
- **Supply Constraints**: Realistic device availability modeling

## Configuration

Key parameters can be adjusted in the UI:
- Device pricing and availability
- Scan conversion rates  
- Subscription values
- Sales leader conversion rates
- Cannibalization factors

## Data Sources

Based on comprehensive business model data from May 2025 - April 2026 forecast periods, incorporating seasonal patterns and regional performance variations.

## License

Private/Proprietary - Internal business tool
