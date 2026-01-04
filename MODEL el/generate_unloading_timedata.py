import pandas as pd
import numpy as np

np.random.seed(42)
NUM_ROWS = 10000

# ----------------------------------
# Categorical options
# ----------------------------------
vessel_types = ["Cargo", "Container", "Tanker", "Bulk Carrier"]
port_efficiency_levels = ["High", "Medium", "Low"]
plant_priority_levels = ["High", "Medium", "Low"]

# ----------------------------------
# Generate base dataset
# ----------------------------------
df = pd.DataFrame({
    "vessel_id": [f"V{str(i).zfill(5)}" for i in range(1, NUM_ROWS + 1)],
    "vessel_type": np.random.choice(vessel_types, NUM_ROWS),
    "cargo_quantity_tons": np.random.uniform(500, 50000, NUM_ROWS),
    "port_efficiency": np.random.choice(port_efficiency_levels, NUM_ROWS),
    "plant_priority": np.random.choice(plant_priority_levels, NUM_ROWS)
})

# ----------------------------------
# Base unloading rates (tons/hour)
# ----------------------------------
base_unloading_rate = {
    "Cargo": 800,
    "Container": 1200,
    "Tanker": 1500,
    "Bulk Carrier": 1000
}

df["base_rate"] = df["vessel_type"].map(base_unloading_rate)

# ----------------------------------
# Efficiency & priority multipliers
# ----------------------------------
port_efficiency_factor = {
    "High": 0.8,
    "Medium": 1.0,
    "Low": 1.2
}

plant_priority_factor = {
    "High": 0.85,
    "Medium": 1.0,
    "Low": 1.15
}

# ----------------------------------
# Calculate unloading time
# ----------------------------------
df["unloading_time_hours"] = (
    (df["cargo_quantity_tons"] / df["base_rate"]) *
    df["port_efficiency"].map(port_efficiency_factor) *
    df["plant_priority"].map(plant_priority_factor)
).round(2)

# ----------------------------------
# Cleanup & save
# ----------------------------------
df.drop(columns=["base_rate"], inplace=True)

df.to_csv("unloading_time_data.csv", index=False)

print("✅ unloading_time_data.csv generated successfully")
print("📊 Rows:", len(df))
print("📊 Columns:", len(df.columns))
