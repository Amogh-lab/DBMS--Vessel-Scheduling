import pandas as pd
import numpy as np

np.random.seed(42)
NUM_ROWS = 10000

# --------------------------------------------------
# 1. Generate vessel movement data
# --------------------------------------------------
vessel_df = pd.DataFrame({
    "vessel_id": [f"V{str(i).zfill(5)}" for i in range(1, NUM_ROWS + 1)],
    "distance_to_port_km": np.random.uniform(50, 2000, NUM_ROWS),
    "speed_knots": np.random.uniform(8, 25, NUM_ROWS),
    "avg_speed_last_1hr": np.random.uniform(8, 25, NUM_ROWS),
    "acceleration": np.random.uniform(-1.5, 1.5, NUM_ROWS),
    "heading_change": np.random.uniform(0, 30, NUM_ROWS),
    "engine_health": np.random.uniform(0.7, 1.0, NUM_ROWS)
})

# --------------------------------------------------
# 2. Generate weather data
# --------------------------------------------------
weather_df = pd.DataFrame({
    "wind_speed_kmph": np.random.uniform(0, 40, NUM_ROWS),
    "wave_height_m": np.random.uniform(0, 6, NUM_ROWS),
    "visibility_km": np.random.uniform(2, 10, NUM_ROWS)
})

weather_df["weather_severity"] = (
    0.4 * (weather_df["wind_speed_kmph"] / 40) +
    0.4 * (weather_df["wave_height_m"] / 6) +
    0.2 * (1 - weather_df["visibility_km"] / 10)
)

# --------------------------------------------------
# 3. Generate port master data
# --------------------------------------------------
port_master = pd.DataFrame({
    "port_id": [f"P{str(i).zfill(3)}" for i in range(1, 21)],
    "port_name": [
        "Mumbai", "Chennai", "Kochi", "Visakhapatnam", "Kandla",
        "Tuticorin", "Ennore", "Paradip", "Haldia", "JNPT",
        "Mangalore", "Goa", "Karwar", "Porbandar", "Hazira",
        "Dahej", "Dhamra", "Kakinada", "Gangavaram", "Sundarbans"
    ],
    "berth_capacity": np.random.randint(5, 20, 20)
})

# --------------------------------------------------
# 4. Assign port state to each vessel
# --------------------------------------------------
vessel_df["port_id"] = np.random.choice(port_master["port_id"], NUM_ROWS)

port_state = pd.DataFrame({
    "port_id": vessel_df["port_id"],
    "current_queue": np.random.randint(0, 15, NUM_ROWS)
})

# Merge port info
port_df = port_state.merge(port_master, on="port_id", how="left")

# --------------------------------------------------
# 5. Generate ACTUAL ETA (ground truth)
# --------------------------------------------------
# Base travel time (minutes)
base_time = (
    vessel_df["distance_to_port_km"] /
    (vessel_df["speed_knots"] * 1.852)
) * 60

# Delay components
weather_delay = weather_df["weather_severity"] * 30
congestion_delay = (port_df["current_queue"] / port_df["berth_capacity"]) * 60
engine_delay = (1 - vessel_df["engine_health"]) * 40

actual_eta = (
    base_time +
    weather_delay +
    congestion_delay +
    engine_delay
)

# --------------------------------------------------
# 6. Final ETA dataset
# --------------------------------------------------
eta_df = pd.concat(
    [vessel_df, weather_df, port_df[["port_id", "port_name", "current_queue", "berth_capacity"]]],
    axis=1
)

eta_df["actual_eta_minutes"] = actual_eta.round(2)

eta_df.to_csv("eta_dataset_final.csv", index=False)

print("✅ Final ETA dataset generated")
print("📁 File: eta_dataset_final.csv")
print("📊 Rows:", len(eta_df))
print("📊 Columns:", len(eta_df.columns))
