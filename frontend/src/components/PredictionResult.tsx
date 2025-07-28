import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface PredictionData {
  predicted_grade: number;
  confidence: number;
  risk_level: "Low" | "Medium" | "High";
}

interface PredictionResultProps {
  prediction: PredictionData;
}

const PredictionResult = ({ prediction }: PredictionResultProps) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600";
    if (grade >= 12) return "text-blue-600";
    if (grade >= 10) return "text-orange-600";
    return "text-red-600";
  };

  const getGradeLabel = (grade: number) => {
    if (grade >= 16) return "Excellent";
    if (grade >= 14) return "Very Good";
    if (grade >= 12) return "Good";
    if (grade >= 10) return "Satisfactory";
    return "Needs Improvement";
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low": return "default";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-university" />
            Prediction Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <div className={`text-6xl font-bold ${getGradeColor(prediction.predicted_grade)}`}>
                {prediction.predicted_grade.toFixed(1)}
              </div>
              <div className="text-xl text-muted-foreground mt-2">
                {getGradeLabel(prediction.predicted_grade)}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="text-lg font-semibold">{prediction.confidence}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Risk Level</div>
                <Badge variant={getRiskBadgeVariant(prediction.risk_level)}>
                  {prediction.risk_level}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResult;