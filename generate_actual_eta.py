import pandas as pd
import numpy as np
import os

def generate_actual_eta(num_vessels=50, seed=42, output_path="eta_dataset_final.csv"):
    """
    Generate final ETA dataset with 50 vessels (V001-V050)
    Combines vessel, weather, and port data to calculate actual ETA
    """
    np.random.seed(seed)
    
    try:
        # Generate vessel data for 50 vessels
        vessel_df = pd.DataFrame({
            "vessel_id": [f"V{str(i).zfill(3)}" for i in range(1, num_vessels + 1)],
            "distance_to_port_km": np.random.uniform(50, 2000, num_vessels),
            "speed_knots": np.random.uniform(8, 25, num_vessels),
            "avg_speed_last_1hr": np.random.uniform(8, 25, num_vessels),
            "acceleration": np.random.uniform(-1.5, 1.5, num_vessels),
            "heading_change": np.random.uniform(0, 30, num_vessels),
            "engine_health": np.random.uniform(0.7, 1.0, num_vessels)
        })
        
        # Generate weather data for each vessel
        weather_df = pd.DataFrame({
            "wind_speed_kmph": np.random.uniform(0, 40, num_vessels),
            "wave_height_m": np.random.uniform(0, 6, num_vessels),
            "visibility_km": np.random.uniform(2, 10, num_vessels)
        })
        
        # Calculate weather severity
        weather_df["weather_severity"] = (
            0.4 * (weather_df["wind_speed_kmph"] / 40) +
            0.4 * (weather_df["wave_height_m"] / 6) +
            0.2 * (1 - weather_df["visibility_km"] / 10)
        )
        
        # Port master data (20 ports)
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
        
        # Assign random ports to vessels
        vessel_df["port_id"] = np.random.choice(port_master["port_id"], num_vessels)
        
        # Generate port state (current queue for each vessel)
        port_state = pd.DataFrame({
            "port_id": vessel_df["port_id"],
            "current_queue": np.random.randint(0, 15, num_vessels)
        })
        
        # Merge port data
        port_df = port_state.merge(port_master, on="port_id", how="left")
        
        # Calculate actual ETA in minutes
        # Base time: distance / speed (converted to hours, then minutes)
        base_time = (
            vessel_df["distance_to_port_km"] /
            (vessel_df["speed_knots"] * 1.852)  # Convert knots to km/h
        ) * 60
        
        # Add delays
        weather_delay = weather_df["weather_severity"] * 30  # 0-30 minutes
        congestion_delay = (port_df["current_queue"] / port_df["berth_capacity"]) * 60  # 0-60 minutes
        engine_delay = (1 - vessel_df["engine_health"]) * 40  # 0-12 minutes
        
        actual_eta = base_time + weather_delay + congestion_delay + engine_delay
        
        # Combine all data
        eta_df = pd.concat(
            [
                vessel_df,
                weather_df,
                port_df[["port_id", "port_name", "current_queue", "berth_capacity"]]
            ],
            axis=1
        )
        
        eta_df["actual_eta_minutes"] = actual_eta.round(2)
        
        # Save to CSV
        eta_df.to_csv(output_path, index=False)
        
        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "rows": len(eta_df),
            "columns": len(eta_df.columns),
            "vessels": num_vessels
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    res = generate_actual_eta()
    if res["status"] == "success":
        print("✅ Final ETA dataset generated")
        print("📁 File:", res["path"])
        print("📊 Rows:", res["rows"])
        print("📊 Columns:", res["columns"])
        print("🚢 Vessels:", res["vessels"])
    else:
        print("❌ Error:", res["error"])