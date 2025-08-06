# Economic Insight Dashboardd

A modern React-based economic data analysis platform that provides AI-powered insights for economic indicators. Built with React, TypeScript, Tailwind CSS, and Recharts.

## Features

### Data Visualization
- **Interactive Charts**: Line charts for inflation and interest rate trends
- **Bar Graphs**: Visual representation of forex reserves and transaction volumes
- **Responsive Design**: Charts adapt to different screen sizes
- **Real-time Preview**: Instant visualization upon data upload

### AI-Powered Analysis
- **Groq API Integration**: Advanced AI analysis using Groq's language models
- **Custom Prompts**: Customizable analysis prompts for specific needs
- **Professional Insights**: Analysis tailored for central bank management
- **Key Recommendations**: Actionable insights and recommendations

### File Upload & Processing
- **Drag & Drop**: Intuitive file upload interface
- **CSV Support**: Parse and process CSV files with economic data
- **Data Validation**: Automatic validation of file format and size
- **Sample Data**: Downloadable sample CSV for testing

### Modern Interface
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Clean UI**: Professional interface using shadcn/ui components
- **Dark/Light Mode**: Automatic theme support
- **Economic Themed**: Color scheme optimized for financial data

## Sample Data Structure

The application expects CSV files with the following columns:

```csv
date,inflation,interest_rate,forex_reserves,transactions
2024-01,3.2,5.75,145000000000,2850000000
2024-02,3.1,5.75,147200000000,2920000000
```

**Column Descriptions:**
- `date`: Date in YYYY-MM format
- `inflation`: Inflation rate as percentage
- `interest_rate`: Interest rate as percentage  
- `forex_reserves`: Foreign exchange reserves in USD
- `transactions`: Transaction volume in USD

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API key (get from [Groq Console](https://console.groq.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd economic-insight-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Usage Flow

1. **Upload Data**: 
   - Visit the home page
   - Download sample data or upload your own CSV file
   - Drag & drop or click to select file

2. **Preview**: 
   - View data preview with sample charts
   - Verify data is correctly parsed

3. **Dashboard**: 
   - Navigate to full dashboard
   - View comprehensive visualizations
   - Access AI analysis features

4. **AI Analysis**:
   - Enter your Groq API key
   - Customize analysis prompt
   - Generate AI-powered insights

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router
- **Data Processing**: PapaParse
- **AI Integration**: Groq API
- **Build Tool**: Vite

## API Integration

### Groq API
The application integrates with Groq's API for AI analysis:

```typescript
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: 'You are an expert economic analyst...'
      },
      {
        role: 'user',
        content: `${prompt}\n\nEconomic Data:\n${csvData}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1000,
  }),
});
```

## File Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── FileUpload.tsx      # File upload component
│   ├── EconomicChart.tsx   # Chart components
│   └── AIAnalysis.tsx      # AI analysis component
├── pages/
│   ├── Index.tsx           # Home page
│   ├── Dashboard.tsx       # Dashboard page
│   └── NotFound.tsx        # 404 page
├── data/
│   └── sampleData.ts       # Sample data and utilities
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── styles/                 # CSS and styling
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the documentation
- Contact the development team

---

Built with ❤️ using React and modern web technologies.
