import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Brain, Download } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import EconomicChart from "@/components/EconomicChart";
import { generateSampleCSVFile, parseEconomicData, type EconomicDataPoint } from "@/data/sampleData";
import Papa from "papaparse";

const Index = () => {
  const [csvData, setCsvData] = useState<string>("");
  const [economicData, setEconomicData] = useState<EconomicDataPoint[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const csvText = results.data.map((row: any) => row.join(',')).join('\n');
        setCsvData(csvText);
        
        try {
          const parsedData = parseEconomicData(csvText);
          setEconomicData(parsedData);
          setIsPreviewMode(true);
        } catch (error) {
          console.error('Error parsing CSV data:', error);
          alert('Error parsing CSV data. Please check the format.');
        }
      },
      error: (error) => {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
      }
    });
  };

  const downloadSampleData = () => {
    const sampleFile = generateSampleCSVFile();
    const url = URL.createObjectURL(sampleFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = sampleFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const proceedToDashboard = () => {
    navigate('/dashboard', { state: { csvData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Business Insight Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Upload your economic data and get AI-powered insights for informed decision making
          </p>
          <Button 
            variant="outline" 
            onClick={downloadSampleData}
            className="mb-8"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Sample Data
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interactive charts for inflation, interest rates, forex reserves, and transactions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive trend analysis with line charts and bar graphs
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Groq-powered AI analysis with professional recommendations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* File Upload */}
        <div className="max-w-2xl mx-auto mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Preview Section */}
        {isPreviewMode && economicData.length > 0 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Data Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-6">
                  Preview of uploaded data with {economicData.length} records
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <EconomicChart
                    data={economicData.slice(-6)}
                    type="line"
                    title="Inflation & Interest Rate Preview"
                    dataKey={["inflation", "interest_rate"]}
                  />
                  <EconomicChart
                    data={economicData.slice(-6)}
                    type="bar"
                    title="Reserves & Transactions Preview"
                    dataKey={["forex_reserves", "transactions"]}
                  />
                </div>

                <div className="text-center">
                  <Button onClick={proceedToDashboard} size="lg">
                    <Brain className="mr-2 h-5 w-5" />
                    View Full Dashboard & AI Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
