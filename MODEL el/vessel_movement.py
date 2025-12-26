import pandas as pd
import numpy as np

np.random.seed(42)

NUM_VESSELS = 50
RECORDS_PER_VESSEL = 200

rows = []

for v in range(1, NUM_VESSELS + 1):
    vessel_id = f"V{str(v).zfill(3)}"

    distance = np.random.uniform(500, 2000)

    for t in range(RECORDS_PER_VESSEL):
        speed = np.random.uniform(8, 25)

        distance = max(distance - speed * 1.852, 0)

        rows.append({
            "vessel_id": vessel_id,
            "timestamp": t,
            "distance_to_port_km": distance,
            "speed_knots": speed,
            "avg_speed_last_1hr": speed + np.random.uniform(-1, 1),
            "acceleration": np.random.uniform(-1.5, 1.5),
            "heading_change": np.random.uniform(0, 30),
            "engine_health": np.random.uniform(0.7, 1.0)
        })

df = pd.DataFrame(rows)
df.to_csv("vessel_movement_data.csv", index=False)

print("✅ Vessel movement data generated correctly")
print("Vessels:", NUM_VESSELS)
print("Total rows:", len(df))
