import pandas as pd
import numpy as np
import os

def generate_port_data(num_ports=20, seed=42, output_path="port_data.csv"):
    
    np.random.seed(seed)
    
    try:
        port_df = pd.DataFrame({
            "port_id": [f"P{str(i).zfill(3)}" for i in range(1, num_ports + 1)],
            "port_name": [
                "Mumbai", "Chennai", "Kochi", "Visakhapatnam", "Kandla",
                "Tuticorin", "Ennore", "Paradip", "Haldia", "JNPT",
                "Mangalore", "Goa", "Karwar", "Porbandar", "Hazira",
                "Dahej", "Dhamra", "Kakinada", "Gangavaram", "Sundarbans"
            ],
            "berth_capacity": np.random.randint(5, 20, num_ports),
            "current_queue": np.random.randint(0, 15, num_ports),
            "port_efficiency": np.random.choice(["High", "Medium", "Low"], num_ports)
        })
        
        # Save to CSV
        port_df.to_csv(output_path, index=False)
        
        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "rows": len(port_df),
            "columns": len(port_df.columns),
            "ports": num_ports
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = generate_port_data()
    if res["status"] == "success":
        print("✅ Port data generated successfully")
        print("📁 File:", res["path"])
        print("📊 Rows:", res["rows"])
        print("📊 Columns:", res["columns"])
        print("🏗️ Ports:", res["ports"])
    else:
        print("❌ Error:", res["error"])