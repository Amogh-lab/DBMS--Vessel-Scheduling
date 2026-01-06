import pandas as pd
import numpy as np
import os

def generate_weather_data(num_rows=50, seed=42, output_path="weather_data.csv"):
    
    np.random.seed(seed)
    
    try:
        df = pd.DataFrame({
            "wind_speed_kmph": np.random.uniform(0, 40, num_rows),
            "wave_height_m": np.random.uniform(0, 6, num_rows),
            "visibility_km": np.random.uniform(2, 10, num_rows)
        })
        
        # Calculate weather severity (0 to 1 scale)
        df["weather_severity"] = (
            0.4 * (df["wind_speed_kmph"] / 40) +
            0.4 * (df["wave_height_m"] / 6) +
            0.2 * (1 - df["visibility_km"] / 10)
        )
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        
        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "rows": len(df),
            "columns": len(df.columns)
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = generate_weather_data()
    if res["status"] == "success":
        print("✅ Weather data generated successfully")
        print("📁 File:", res["path"])
        print("📊 Rows:", res["rows"])
        print("📊 Columns:", res["columns"])
    else:
        print("❌ Error:", res["error"])