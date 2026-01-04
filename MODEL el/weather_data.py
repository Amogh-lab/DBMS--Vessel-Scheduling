import pandas as pd
import numpy as np

np.random.seed(42)
NUM_ROWS = 10000

df = pd.DataFrame({
    "wind_speed_kmph": np.random.uniform(0, 40, NUM_ROWS),
    "wave_height_m": np.random.uniform(0, 6, NUM_ROWS),
    "visibility_km": np.random.uniform(2, 10, NUM_ROWS)
})

df["weather_severity"] = (
    0.4 * (df["wind_speed_kmph"] / 40) +
    0.4 * (df["wave_height_m"] / 6) +
    0.2 * (1 - df["visibility_km"] / 10)
)

df.to_csv("weather_data.csv", index=False)
print("✅ Weather data regenerated")
