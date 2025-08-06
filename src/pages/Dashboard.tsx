import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, DollarSign, Activity, BarChart3 } from "lucide-react";
import EconomicChart from "@/components/EconomicChart";
import AIAnalysis from "@/components/AIAnalysis";
import { parseEconomicData, type EconomicDataPoint } from "@/data/sampleData";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [economicData, setEconomicData] = useState<EconomicDataPoint[]>([]);
  const [csvText, setCsvText] = useState<string>("");

  useEffect(() => {
    const data = location.state?.csvData;
    if (!data) {
      navigate('/');
      return;
    }

    setCsvText(data);
    const parsedData = parseEconomicData(data);
    setEconomicData(parsedData);
  }, [location.state, navigate]);

  if (economicData.length === 0) {
    return null;
  }

  const latestData = economicData[economicData.length - 1];
  const previousData = economicData[economicData.length - 2];

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const stats = [
    {
      title: "Current Inflation",
      value: `${latestData.inflation}%`,
      change: calculateChange(latestData.inflation, previousData?.inflation || 0),
      icon: TrendingUp,
      color: "text-chart-inflation"
    },
    {
      title: "Interest Rate",
      value: `${latestData.interest_rate}%`,
      change: calculateChange(latestData.interest_rate, previousData?.interest_rate || 0),
      icon: Activity,
      color: "text-chart-interest"
    },
    {
      title: "Forex Reserves",
      value: `$${(latestData.forex_reserves / 1000000000).toFixed(1)}B`,
      change: calculateChange(latestData.forex_reserves, previousData?.forex_reserves || 0),
      icon: DollarSign,
      color: "text-chart-reserves"
    },
    {
      title: "Transactions",
      value: `$${(latestData.transactions / 1000000000).toFixed(1)}B`,
      change: calculateChange(latestData.transactions, previousData?.transactions || 0),
      icon: BarChart3,
      color: "text-chart-transactions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Economic Dashboard
            </h1>
            <p className="text-muted-foreground">
              Analysis of economic indicators and trends
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(1)}% from previous period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EconomicChart
            data={economicData}
            type="line"
            title="Inflation & Interest Rate Trends"
            dataKey={["inflation", "interest_rate"]}
          />
          <EconomicChart
            data={economicData}
            type="bar"
            title="Forex Reserves & Transactions"
            dataKey={["forex_reserves", "transactions"]}
          />
        </div>

        {/* AI Analysis */}
        <AIAnalysis csvData={csvText} />
      </div>
    </div>
  );
}