import pandas as pd
import numpy as np
import os

def generate_vessel_movement_data(num_vessels=50, records_per_vessel=200, seed=42, output_path="vessel_movement_data.csv"):
    
    np.random.seed(seed)
    
    try:
        rows = []
        
        for v in range(1, num_vessels + 1):
            vessel_id = f"V{str(v).zfill(3)}"  # V001, V002, V003...
            
            # Initial distance from port
            distance = np.random.uniform(500, 2000)
            
            for t in range(records_per_vessel):
                speed = np.random.uniform(8, 25)
                
                # Vessel moves closer to port each timestep
                distance = max(distance - speed * 1.852, 0)  # 1.852 km/h per knot
                
                rows.append({
                    "vessel_id": vessel_id,
                    "timestamp": t,
                    "distance_to_port_km": round(distance, 2),
                    "speed_knots": round(speed, 2),
                    "avg_speed_last_1hr": round(speed + np.random.uniform(-1, 1), 2),
                    "acceleration": round(np.random.uniform(-1.5, 1.5), 2),
                    "heading_change": round(np.random.uniform(0, 30), 2),
                    "engine_health": round(np.random.uniform(0.7, 1.0), 2)
                })
        
        df = pd.DataFrame(rows)
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        
        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "rows": len(df),
            "columns": len(df.columns),
            "vessels": num_vessels,
            "records_per_vessel": records_per_vessel
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = generate_vessel_movement_data()
    if res["status"] == "success":
        print("✅ Vessel movement data generated successfully")
        print("📁 File:", res["path"])
        print("🚢 Vessels:", res["vessels"])
        print("📊 Total rows:", res["rows"])
        print("⏱️ Records per vessel:", res["records_per_vessel"])
    else:
        print("❌ Error:", res["error"])