import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def train_eta_model(dataset_path="eta_dataset_final.csv", model_output_path="eta_model.pkl"):
    
    try:
        # Load dataset
        if not os.path.exists(dataset_path):
            return {
                "status": "error",
                "error": f"Dataset not found: {dataset_path}. Please generate it first using /generate/eta"
            }
        
        df = pd.read_csv(dataset_path)
        
        # Feature selection
        features = [
            "distance_to_port_km",
            "speed_knots",
            "avg_speed_last_1hr",
            "acceleration",
            "heading_change",
            "engine_health",
            "wind_speed_kmph",
            "wave_height_m",
            "visibility_km",
            "weather_severity",
            "current_queue",
            "berth_capacity"
        ]
        
        # Check if all features exist
        missing_features = [f for f in features if f not in df.columns]
        if missing_features:
            return {
                "status": "error",
                "error": f"Missing features in dataset: {missing_features}"
            }
        
        X = df[features]
        y = df["actual_eta_minutes"]
        
        # Train-test split (80-20)
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train Random Forest model
        print("🤖 Training Random Forest model...")
        eta_model = RandomForestRegressor(
            n_estimators=200,
            max_depth=15,
            min_samples_split=2,
            min_samples_leaf=1,
            random_state=42,
            n_jobs=-1,
            verbose=0
        )
        
        eta_model.fit(X_train, y_train)
        
        # Make predictions
        y_pred_train = eta_model.predict(X_train)
        y_pred_test = eta_model.predict(X_test)
        
        # Calculate metrics
        train_mae = mean_absolute_error(y_train, y_pred_train)
        train_rmse = np.sqrt(mean_squared_error(y_train, y_pred_train))
        train_r2 = r2_score(y_train, y_pred_train)
        
        test_mae = mean_absolute_error(y_test, y_pred_test)
        test_rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
        test_r2 = r2_score(y_test, y_pred_test)
        
        # Feature importance
        feature_importance = dict(zip(features, eta_model.feature_importances_))
        top_features = dict(sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:5])
        
        # Save model
        joblib.dump(eta_model, model_output_path)
        
        return {
            "status": "success",
            "model_path": os.path.abspath(model_output_path),
            "training_samples": len(X_train),
            "test_samples": len(X_test),
            "metrics": {
                "train": {
                    "mae": round(train_mae, 2),
                    "rmse": round(train_rmse, 2),
                    "r2": round(train_r2, 4)
                },
                "test": {
                    "mae": round(test_mae, 2),
                    "rmse": round(test_rmse, 2),
                    "r2": round(test_r2, 4)
                }
            },
            "top_features": {k: round(v, 4) for k, v in top_features.items()}
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = train_eta_model()
    
    if res["status"] == "success":
        print("✅ ETA MODEL TRAINED SUCCESSFULLY")
        print(f"📁 Model saved: {res['model_path']}")
        print(f"📊 Training samples: {res['training_samples']}")
        print(f"📊 Test samples: {res['test_samples']}")
        print("\n📈 TRAINING METRICS:")
        print(f"  MAE  : {res['metrics']['train']['mae']:.2f} minutes")
        print(f"  RMSE : {res['metrics']['train']['rmse']:.2f} minutes")
        print(f"  R²   : {res['metrics']['train']['r2']:.4f}")
        print("\n📈 TEST METRICS:")
        print(f"  MAE  : {res['metrics']['test']['mae']:.2f} minutes")
        print(f"  RMSE : {res['metrics']['test']['rmse']:.2f} minutes")
        print(f"  R²   : {res['metrics']['test']['r2']:.4f}")
        print("\n🔝 TOP 5 FEATURES:")
        for feat, importance in res['top_features'].items():
            print(f"  {feat}: {importance:.4f}")
    else:
        print("❌ Error:", res["error"])