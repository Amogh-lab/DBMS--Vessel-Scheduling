import pandas as pd
import numpy as np
import os

def generate_unloading_time(num_vessels=50, seed=42, output_path="unloading_time_data.csv"):
    """
    Generate unloading time data for 50 vessels (V001-V050)
    """
    np.random.seed(seed)
    
    try:
        vessel_types = ["Cargo", "Container", "Tanker", "Bulk Carrier"]
        port_efficiency_levels = ["High", "Medium", "Low"]
        plant_priority_levels = ["High", "Medium", "Low"]
        
        df = pd.DataFrame({
            "vessel_id": [f"V{str(i).zfill(3)}" for i in range(1, num_vessels + 1)],
            "vessel_type": np.random.choice(vessel_types, num_vessels),
            "cargo_quantity_tons": np.random.uniform(500, 50000, num_vessels),
            "port_efficiency": np.random.choice(port_efficiency_levels, num_vessels),
            "plant_priority": np.random.choice(plant_priority_levels, num_vessels)
        })
        
        # Base unloading rates (tons/hour)
        base_unloading_rate = {
            "Cargo": 800,
            "Container": 1200,
            "Tanker": 1500,
            "Bulk Carrier": 1000
        }
        
        df["base_rate"] = df["vessel_type"].map(base_unloading_rate)
        
        # Efficiency multipliers
        port_efficiency_factor = {
            "High": 0.8,      # 20% faster
            "Medium": 1.0,    # baseline
            "Low": 1.2        # 20% slower
        }
        
        plant_priority_factor = {
            "High": 0.85,     # 15% faster
            "Medium": 1.0,    # baseline
            "Low": 1.15       # 15% slower
        }
        
        # Calculate unloading time in hours
        df["unloading_time_hours"] = (
            (df["cargo_quantity_tons"] / df["base_rate"]) *
            df["port_efficiency"].map(port_efficiency_factor) *
            df["plant_priority"].map(plant_priority_factor)
        ).round(2)
        
        # Remove temporary column
        df.drop(columns=["base_rate"], inplace=True)
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        
        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "rows": len(df),
            "columns": len(df.columns),
            "vessels": num_vessels
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = generate_unloading_time()
    if res["status"] == "success":
        print("✅ Unloading time data generated successfully")
        print("📁 File:", res["path"])
        print("📊 Rows:", res["rows"])
        print("📊 Columns:", res["columns"])
        print("🚢 Vessels:", res["vessels"])
    else:
        print("❌ Error:", res["error"])