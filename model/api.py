# from flask import Flask, jsonify, send_file, request
# import os
# import generate_actual_eta as gae
# import generate_unloading_timedata as gut
# import weather_data as wdata
# import port_data as pdata
# import vessel_movement as vmove
# import train_eta_model as teta
# import berth_scheduler as bs

# app = Flask(__name__)

# def exists(path):
#     return os.path.exists(path)

# @app.get("/")
# def home():
#     return jsonify({
#         "message": "Intelligent Vessel Scheduling API",
#         "endpoints": {
#             "generation": [
#                 "/generate/eta",
#                 "/generate/unloading",
#                 "/generate/weather",
#                 "/generate/ports",
#                 "/generate/vessels"
#             ],
#             "training": ["/train/eta"],
#             "scheduling": ["/schedule/berths"],
#             "data_download": [
#                 "/data/eta",
#                 "/data/unloading",
#                 "/data/weather",
#                 "/data/ports",
#                 "/data/vessels",
#                 "/data/final_schedule"
#             ]
#         }
#     })

# @app.get("/generate/eta")
# def route_generate_eta():
#     try:
#         res = gae.generate_actual_eta()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/generate/unloading")
# def route_generate_unloading():
#     try:
#         res = gut.generate_unloading_time()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/generate/weather")
# def route_generate_weather():
#     try:
#         res = wdata.generate_weather_data()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/generate/ports")
# def route_generate_ports():
#     try:
#         res = pdata.generate_port_data()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/generate/vessels")
# def route_generate_vessels():
#     try:
#         res = vmove.generate_vessel_movement_data()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/train/eta")
# def route_train_eta():
#     try:
#         res = teta.train_eta_model()
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/schedule/berths")
# def route_schedule_berths():
#     per_port = request.args.get("per_port", default=5, type=int)
#     try:
#         res = bs.run_berth_scheduler(berths_per_port=per_port)
#         return jsonify(res)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.get("/data/eta")
# def route_data_eta():
#     path = "eta_dataset_final.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# @app.get("/data/unloading")
# def route_data_unloading():
#     path = "unloading_time_data.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# @app.get("/data/weather")
# def route_data_weather():
#     path = "weather_data.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# @app.get("/data/ports")
# def route_data_ports():
#     path = "port_data.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# @app.get("/data/vessels")
# def route_data_vessels():
#     path = "vessel_movement_data.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# @app.get("/data/final_schedule")
# def route_data_final_schedule():
#     path = "final_berth_schedule.csv"
#     if not exists(path):
#         return jsonify({"error": "file not found"}), 404
#     return send_file(path, mimetype="text/csv")

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8000, debug=True)




# ================================================================
# FILE: model/app.py (COMPLETE VERSION WITH ALL ENDPOINTS)
# ================================================================

from flask import Flask, jsonify, send_file, request
import os
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS


# Import your existing modules
import generate_actual_eta as gae
import generate_unloading_timedata as gut
import weather_data as wdata
import port_data as pdata
import vessel_movement as vmove
import train_eta_model as teta
import berth_scheduler as bs


app = Flask(__name__)
CORS(app)


def exists(path):
    return os.path.exists(path)

# ================================================================
# HOME ENDPOINT
# ================================================================
@app.get("/")
def home():
    return jsonify({
        "message": "Intelligent Vessel Scheduling API",
        "version": "1.0.0",
        "endpoints": {
            "generation": [
                "/generate/eta",
                "/generate/unloading",
                "/generate/weather",
                "/generate/ports",
                "/generate/vessels"
            ],
            "training": ["/train/eta"],
            "scheduling": ["/schedule/berths"],
            "prediction": [
                "/predict/eta",
                "/predict/batch",
                "/model/info"
            ],
            "data_download": [
                "/data/eta",
                "/data/unloading",
                "/data/weather",
                "/data/ports",
                "/data/vessels",
                "/data/final_schedule"
            ]
        },
        "status": "online"
    })

# ================================================================
# DATA GENERATION ENDPOINTS
# ================================================================
@app.get("/generate/eta")
def route_generate_eta():
    try:
        res = gae.generate_actual_eta()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/unloading")
def route_generate_unloading():
    try:
        res = gut.generate_unloading_time()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/weather")
def route_generate_weather():
    try:
        res = wdata.generate_weather_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/ports")
def route_generate_ports():
    try:
        res = pdata.generate_port_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/vessels")
def route_generate_vessels():
    try:
        res = vmove.generate_vessel_movement_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================================================================
# MODEL TRAINING ENDPOINT
# ================================================================
@app.get("/train/eta")
def route_train_eta():
    try:
        res = teta.train_eta_model()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================================================================
# SCHEDULING ENDPOINT
# ================================================================
@app.get("/schedule/berths")
def route_schedule_berths():
    per_port = request.args.get("per_port", default=5, type=int)
    try:
        res = bs.run_berth_scheduler(berths_per_port=per_port)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================================================================
# NEW: ETA PREDICTION ENDPOINT (SINGLE VESSEL)
# ================================================================
@app.post("/predict/eta")
def predict_eta():
    """
    Predict ETA for a vessel based on current conditions
    Expects JSON body with features
    """
    try:
        # Load the trained model
        model_path = "eta_model.pkl"
        if not os.path.exists(model_path):
            return jsonify({
                "error": "Model not found. Please train the model first using /train/eta"
            }), 404
        
        model = joblib.load(model_path)
        
        # Get features from request
        data = request.get_json()
        
        if not data or 'features' not in data:
            return jsonify({
                "error": "Missing 'features' in request body",
                "example": {
                    "features": {
                        "distance_to_port_km": 500,
                        "speed_knots": 15,
                        "avg_speed_last_1hr": 14.5,
                        "acceleration": 0.2,
                        "heading_change": 5,
                        "engine_health": 0.9,
                        "wind_speed_kmph": 20,
                        "wave_height_m": 2,
                        "visibility_km": 8,
                        "weather_severity": 0.3,
                        "current_queue": 5,
                        "berth_capacity": 10
                    }
                }
            }), 400
        
        features = data['features']
        
        # Required feature names (must match training)
        required_features = [
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
        
        # Extract features in correct order
        try:
            feature_values = [features[f] for f in required_features]
        except KeyError as e:
            return jsonify({
                "error": f"Missing required feature: {str(e)}",
                "required_features": required_features
            }), 400
        
        # Create DataFrame for prediction
        X = pd.DataFrame([feature_values], columns=required_features)
        
        # Make prediction
        predicted_eta = model.predict(X)[0]
        
        # Calculate confidence (simplified)
        try:
            feature_importances = model.feature_importances_
            confidence = min(0.95, max(0.6, np.mean(feature_importances) * 1.5))
        except:
            confidence = 0.75
        
        return jsonify({
            "status": "success",
            "predicted_eta_minutes": round(predicted_eta, 2),
            "predicted_eta_hours": round(predicted_eta / 60, 2),
            "confidence": round(confidence, 2),
            "features_used": required_features,
            "model": "RandomForest"
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

# ================================================================
# NEW: BATCH ETA PREDICTION ENDPOINT
# ================================================================
@app.post("/predict/batch")
def predict_batch_eta():
    """
    Predict ETA for multiple vessels at once
    Expects JSON body with array of feature sets
    """
    try:
        model_path = "eta_model.pkl"
        if not os.path.exists(model_path):
            return jsonify({
                "error": "Model not found"
            }), 404
        
        model = joblib.load(model_path)
        
        data = request.get_json()
        
        if not data or 'vessels' not in data:
            return jsonify({
                "error": "Missing 'vessels' array in request body"
            }), 400
        
        vessels = data['vessels']
        predictions = []
        
        required_features = [
            "distance_to_port_km", "speed_knots", "avg_speed_last_1hr",
            "acceleration", "heading_change", "engine_health",
            "wind_speed_kmph", "wave_height_m", "visibility_km",
            "weather_severity", "current_queue", "berth_capacity"
        ]
        
        for vessel in vessels:
            try:
                vessel_id = vessel.get('vessel_id', 'unknown')
                features = vessel.get('features', {})
                
                feature_values = [features.get(f, 0) for f in required_features]
                X = pd.DataFrame([feature_values], columns=required_features)
                
                predicted_eta = model.predict(X)[0]
                
                predictions.append({
                    "vessel_id": vessel_id,
                    "predicted_eta_minutes": round(predicted_eta, 2),
                    "predicted_eta_hours": round(predicted_eta / 60, 2)
                })
            except Exception as e:
                predictions.append({
                    "vessel_id": vessel.get('vessel_id', 'unknown'),
                    "error": str(e)
                })
        
        return jsonify({
            "status": "success",
            "predictions": predictions,
            "total": len(predictions)
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

# ================================================================
# NEW: MODEL INFO ENDPOINT
# ================================================================
@app.get("/model/info")
def model_info():
    """
    Get information about the trained model
    """
    try:
        model_path = "eta_model.pkl"
        if not os.path.exists(model_path):
            return jsonify({
                "status": "not_trained",
                "message": "Model not found. Train it using /train/eta"
            }), 404
        
        model = joblib.load(model_path)
        
        feature_names = [
            "distance_to_port_km", "speed_knots", "avg_speed_last_1hr",
            "acceleration", "heading_change", "engine_health",
            "wind_speed_kmph", "wave_height_m", "visibility_km",
            "weather_severity", "current_queue", "berth_capacity"
        ]
        
        feature_importances = {}
        for i, name in enumerate(feature_names):
            feature_importances[name] = round(float(model.feature_importances_[i]), 4)
        
        return jsonify({
            "status": "ready",
            "model_type": str(type(model).__name__),
            "n_features": len(model.feature_importances_),
            "feature_importances": feature_importances
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

# ================================================================
# DATA DOWNLOAD ENDPOINTS
# ================================================================
@app.get("/data/eta")
def route_data_eta():
    path = "eta_dataset_final.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/unloading")
def route_data_unloading():
    path = "unloading_time_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/weather")
def route_data_weather():
    path = "weather_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/ports")
def route_data_ports():
    path = "port_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/vessels")
def route_data_vessels():
    path = "vessel_movement_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/final_schedule")
def route_data_final_schedule():
    path = "final_berth_schedule.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

# ================================================================
# HEALTH CHECK ENDPOINT
# ================================================================
@app.get("/health")
def health_check():
    model_status = "trained" if exists("eta_model.pkl") else "not_trained"
    dataset_status = "exists" if exists("eta_dataset_final.csv") else "missing"
    
    return jsonify({
        "status": "healthy",
        "service": "ML Model API",
        "port": 8000,
        "model_status": model_status,
        "dataset_status": dataset_status,
        "endpoints_available": 20
    })

# ================================================================
# RUN SERVER
# ================================================================
if __name__ == "__main__":
    print("=" * 60)
    print(" Starting ML Model API Server")
    print("=" * 60)
    print(" Available Endpoints:")
    print("   - Data Generation: /generate/*")
    print("   - Model Training: /train/eta")
    print("   - ETA Prediction: /predict/eta")
    print("   - Batch Prediction: /predict/batch")
    print("   - Model Info: /model/info")
    print("   - Scheduling: /schedule/berths")
    print("   - Data Download: /data/*")
    print("=" * 60)
    app.run(host="0.0.0.0", port=8000, debug=True)