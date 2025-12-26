import pandas as pd
import numpy as np

np.random.seed(42)

NUM_PORTS = 20

port_df = pd.DataFrame({
    "port_id": [f"P{str(i).zfill(3)}" for i in range(1, NUM_PORTS + 1)],
    "port_name": [
        "Mumbai", "Chennai", "Kochi", "Visakhapatnam", "Kandla",
        "Tuticorin", "Ennore", "Paradip", "Haldia", "JNPT",
        "Mangalore", "Goa", "Karwar", "Porbandar", "Hazira",
        "Dahej", "Dhamra", "Kakinada", "Gangavaram", "Sundarbans"
    ],
    "berth_capacity": np.random.randint(5, 20, NUM_PORTS),
    "current_queue": np.random.randint(0, 15, NUM_PORTS),
    "port_efficiency": np.random.choice(["High", "Medium", "Low"], NUM_PORTS)
})

port_df.to_csv("port_data.csv", index=False)
print("✅ Port data generated with port_name included")
