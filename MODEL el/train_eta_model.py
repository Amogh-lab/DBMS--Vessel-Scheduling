import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

# ----------------------------------
# Load dataset
# ----------------------------------
df = pd.read_csv("eta_dataset_final.csv")

# ----------------------------------
# Feature selection
# ----------------------------------
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

X = df[features]
y = df["actual_eta_minutes"]

# ----------------------------------
# Train-test split
# ----------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ----------------------------------
# Train ETA model
# ----------------------------------
eta_model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)

eta_model.fit(X_train, y_train)

# ----------------------------------
# Evaluation
# ----------------------------------
y_pred = eta_model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("✅ ETA MODEL TRAINED SUCCESSFULLY")
print(f"MAE  : {mae:.2f} minutes")
print(f"RMSE : {rmse:.2f} minutes")
