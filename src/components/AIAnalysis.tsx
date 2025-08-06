import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Brain, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysisProps {
  csvData: string;
}

export default function AIAnalysis({ csvData }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(
    "Briefly summarize and explain the contents of this economic report for Bank Indonesia management."
  );
  const [groqApiKey, setGroqApiKey] = useState("");
  const { toast } = useToast();

  const analyzeData = async () => {
    if (!groqApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key to continue with analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysis("");

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are an expert economic analyst specializing in macroeconomic indicators. Provide clear, professional analysis suitable for central bank management.'
            },
            {
              role: 'user',
              content: `${customPrompt}\n\nEconomic Data:\n${csvData}`
            }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const analysisResult = data.choices[0]?.message?.content || "No analysis generated.";
      setAnalysis(analysisResult);

      toast({
        title: "Analysis Complete",
        description: "AI analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI analysis. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* API Key Input */}
      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            <span>Groq API Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="groq-api-key">Groq API Key</Label>
            <Input
              id="groq-api-key"
              type="password"
              placeholder="Enter your Groq API key..."
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get your API key from <a href="https://console.groq.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Groq Console</a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Economic Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-prompt">Analysis Prompt</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Enter your analysis prompt..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={analyzeData} 
            disabled={isLoading || !csvData}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card className="border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="text-success">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{analysis}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}