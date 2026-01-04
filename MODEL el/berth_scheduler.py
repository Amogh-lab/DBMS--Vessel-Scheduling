import pandas as pd
import numpy as np

# -------------------------------------------------
# CONFIGURATION
# -------------------------------------------------
BERTHS_PER_PORT = 5   # change if needed

# -------------------------------------------------
# LOAD DATA
# -------------------------------------------------
eta_df = pd.read_csv("eta_dataset_final.csv")
unload_df = pd.read_csv("unloading_time_data.csv")

# -------------------------------------------------
# MERGE UNLOADING TIME WITH ETA DATA
# -------------------------------------------------
unload_df = unload_df[["vessel_id", "unloading_time_hours"]]

df = eta_df.merge(unload_df, on="vessel_id", how="inner")

# -------------------------------------------------
# PREPARE DATA
# -------------------------------------------------
df["eta_hours"] = df["actual_eta_minutes"] / 60.0

# Sort by port and ETA
df["priority_score"] = df["eta_hours"] + df["unloading_time_hours"]
df = df.sort_values(["port_id", "priority_score"])


# -------------------------------------------------
# SCHEDULING LOGIC (PER PORT)
# -------------------------------------------------
final_schedule = []

for port_id, port_group in df.groupby("port_id"):

    # Initialize berth availability times
    berths = [0.0] * BERTHS_PER_PORT

    for _, row in port_group.iterrows():

        vessel_id = row["vessel_id"]
        arrival = row["eta_hours"]
        unload_time = row["unloading_time_hours"]

        # Choose earliest free berth
        berth_index = np.argmin(berths)
        berth_free_time = berths[berth_index]

        # Start unloading when both ship & berth are ready
        start_time = max(arrival, berth_free_time)
        end_time = start_time + unload_time

        # Update berth availability
        berths[berth_index] = end_time

        final_schedule.append({
            "vessel_id": vessel_id,
            "port_id": port_id,
            "berth_id": berth_index + 1,
            "arrival_time_hr": round(arrival, 2),
            "unload_start_hr": round(start_time, 2),
            "unload_end_hr": round(end_time, 2),
            "unloading_time_hr": round(unload_time, 2),
            "waiting_time_hr": round(start_time - arrival, 2)
        })

# -------------------------------------------------
# SAVE FINAL SCHEDULE
# -------------------------------------------------
schedule_df = pd.DataFrame(final_schedule)
schedule_df.to_csv("final_berth_schedule.csv", index=False)

print("✅ Berth scheduling completed successfully")
print("📁 Output file: final_berth_schedule.csv")
print("📊 Total scheduled vessels:", len(schedule_df))
