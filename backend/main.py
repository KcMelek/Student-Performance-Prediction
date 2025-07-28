from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load model
model = joblib.load("best_model.pkl")

# FastAPI app
app = FastAPI(title="Student Score Prediction API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input format expected from UI
class StudentFeatures(BaseModel):
    avg_absence: float
    avg_fit_score: float
    avg_teaching_score: float
    avg_learning_score: float
    avg_review_rating: float
    program: str
    track: str
    program_year: str
    campus: str

@app.get("/")
def root():
    return {"message": "🎓 Student Score Predictor is running!"}

@app.post("/predict")
def predict(features: StudentFeatures):
    # One-hot encode categorical variables to match model input
    program_Bachelor = features.program == "Bachelor"
    program_Master = features.program == "Master"
    track_Advanced_mathematics = features.track == "Advanced mathematics"
    track_IBBA = features.track == "IBBA"
    track_Management_and_strategy = features.track == "Management and strategy"
    track_Reinforced_Business = features.track == "Reinforced Business"
    track_Reinforced_Data = features.track == "Reinforced Data"
    program_year_1 = features.program_year == "1"
    program_year_2 = features.program_year == "2"
    program_year_3 = features.program_year == "3"
    # Treat any campus value as 'Paris' for the model
    campus_Paris = features.campus in ["Paris", "Lyon", "Marseille"]

    input_array = np.array([
        [
            features.avg_absence,
            features.avg_fit_score,
            features.avg_teaching_score,
            features.avg_learning_score,
            features.avg_review_rating,
            program_Bachelor,
            program_Master,
            track_Advanced_mathematics,
            track_IBBA,
            track_Management_and_strategy,
            track_Reinforced_Business,
            track_Reinforced_Data,
            program_year_1,
            program_year_2,
            program_year_3,
            campus_Paris,
        ]
    ])

    # Make prediction
    prediction = model.predict(input_array)[0]

    return {
        "predicted_avg_score": round(float(prediction), 2)
    } 