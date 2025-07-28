import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

interface FormData {
  avg_absence: number;
  avg_fit_score: number;
  avg_teaching_score: number;
  avg_learning_score: number;
  avg_review_rating: number;
  program: string;
  track: string;
  program_year: string;
  campus: string;
}

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
  isLoading: boolean;
}

const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    avg_absence: 5,
    avg_fit_score: 3,
    avg_teaching_score: 3,
    avg_learning_score: 3,
    avg_review_rating: 6, // Changed from 3 to 6
    program: "",
    track: "",
    program_year: "",
    campus: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const getProgramYearOptions = () => {
    if (formData.program === "Master") {
      return ["1", "2"];
    } else if (formData.program === "Bachelor") {
      return ["1", "2", "3"];
    }
    return [];
  };

  const getTrackOptions = () => {
    if (formData.program === "Master") {
      return [
        { value: "Reinforced Business", label: "Reinforced Business" },
        { value: "Reinforced Data", label: "Reinforced Data" }
      ];
    } else if (formData.program === "Bachelor") {
      return [
        { value: "IBBA", label: "IBBA" },
        { value: "Management and strategy", label: "Management and Strategy" },
        { value: "Advanced mathematics", label: "Advanced Mathematics" }
      ];
    }
    return [];
  };

  const handleProgramChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      program: value,
      program_year: "", // Reset program year when program changes
      track: "", // Reset track when program changes
    }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-university" />
          Student Performance Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Absence Rate */}
          <div className="space-y-2">
            <Label htmlFor="avg_absence">Average Absence Rate</Label>
            <Input
              id="avg_absence"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.avg_absence}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                avg_absence: parseFloat(e.target.value) || 0
              }))}
              className="w-full"
            />
          </div>

          {/* Sliders for Score Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Fit Score: {formData.avg_fit_score.toFixed(1)}</Label>
              <Slider
                value={[formData.avg_fit_score]}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  avg_fit_score: value[0]
                }))}
                max={4}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Teaching Score: {formData.avg_teaching_score.toFixed(1)}</Label>
              <Slider
                value={[formData.avg_teaching_score]}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  avg_teaching_score: value[0]
                }))}
                max={4}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Learning Score: {formData.avg_learning_score.toFixed(1)}</Label>
              <Slider
                value={[formData.avg_learning_score]}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  avg_learning_score: value[0]
                }))}
                max={4}
                min={1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Overall Review Rating: {formData.avg_review_rating.toFixed(1)}</Label>
              <Slider
                value={[formData.avg_review_rating]}
                onValueChange={(value) => setFormData(prev => ({
                  ...prev,
                  avg_review_rating: value[0]
                }))}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Categorical Selections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={formData.program} onValueChange={handleProgramChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Program Year</Label>
              <Select 
                value={formData.program_year} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, program_year: value }))}
                disabled={!formData.program}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {getProgramYearOptions().map(year => (
                    <SelectItem key={year} value={year}>Year {year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Track</Label>
              <Select 
                value={formData.track} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, track: value }))}
                disabled={!formData.program}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent>
                  {getTrackOptions().map(track => (
                    <SelectItem key={track.value} value={track.value}>{track.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Campus</Label>
              <Select value={formData.campus} onValueChange={(value) => setFormData(prev => ({ ...prev, campus: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Lyon">Lyon</SelectItem>
                  <SelectItem value="Marseille">Marseille</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !formData.program || !formData.track || !formData.program_year || !formData.campus}
          >
            {isLoading ? "Predicting..." : "Predict Final Grade"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;