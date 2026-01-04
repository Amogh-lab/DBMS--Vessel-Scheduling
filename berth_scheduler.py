import pandas as pd
import numpy as np
import os


def run_berth_scheduler(
    berths_per_port=5,
    eta_path="eta_dataset_final.csv",
    unload_path="unloading_time_data.csv",
    output_path="final_berth_schedule.csv"
):
    """
    Intelligent berth scheduling algorithm
    Assigns vessels to berths based on ETA and unloading time
    Priority: Earlier arrival + shorter unloading time
    """
    try:
        # Load datasets
        if not os.path.exists(eta_path):
            return {
                "status": "error",
                "error": f"ETA dataset not found: {eta_path}. Please generate it first."
            }

        if not os.path.exists(unload_path):
            return {
                "status": "error",
                "error": f"Unloading data not found: {unload_path}. Please generate it first."
            }

        eta_df = pd.read_csv(eta_path)
        unload_df = pd.read_csv(unload_path)

        # Merge datasets
        unload_df = unload_df[["vessel_id", "unloading_time_hours"]]
        df = eta_df.merge(unload_df, on="vessel_id", how="inner")

        if df.empty:
            return {
                "status": "error",
                "error": "No matching vessels found after merge. Check vessel_id consistency."
            }

        # Convert ETA to hours
        df["eta_hours"] = df["actual_eta_minutes"] / 60.0

        # Sort by port → ETA → unloading time
        df = df.sort_values(["port_id", "eta_hours", "unloading_time_hours"])

        final_schedule = []

        # Schedule vessels per port
        for port_id, port_group in df.groupby("port_id"):
            berths = [0.0] * berths_per_port

            for _, row in port_group.iterrows():
                vessel_id = row["vessel_id"]
                arrival = row["eta_hours"]
                unload_time = row["unloading_time_hours"]

                berth_index = int(np.argmin(berths))
                berth_free_time = berths[berth_index]

                start_time = max(arrival, berth_free_time)
                end_time = start_time + unload_time

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

        schedule_df = pd.DataFrame(final_schedule)

        # Statistics
        total_wait = schedule_df["waiting_time_hr"].sum()
        avg_wait = schedule_df["waiting_time_hr"].mean()
        max_wait = schedule_df["waiting_time_hr"].max()
        vessels_with_wait = (schedule_df["waiting_time_hr"] > 0).sum()

        # Save output
        schedule_df.to_csv(output_path, index=False)

        return {
            "status": "success",
            "path": os.path.abspath(output_path),
            "scheduled_vessels": len(schedule_df),
            "berths_per_port": berths_per_port,
            "statistics": {
                "total_waiting_time_hr": round(total_wait, 2),
                "avg_waiting_time_hr": round(avg_wait, 2),
                "max_waiting_time_hr": round(max_wait, 2),
                "vessels_with_wait": int(vessels_with_wait),
                "vessels_no_wait": int(len(schedule_df) - vessels_with_wait)
            }
        }

    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }


if __name__ == "__main__":
    res = run_berth_scheduler()

    if res["status"] == "success":
        print("✅ Berth scheduling completed successfully")
        print("📁 Output file:", res["path"])
        print("🚢 Total scheduled vessels:", res["scheduled_vessels"])
        print("⚓ Berths per port:", res["berths_per_port"])

        print("\n📊 WAITING TIME STATISTICS:")
        stats = res["statistics"]
        print(f"  Total waiting time: {stats['total_waiting_time_hr']} hours")
        print(f"  Average waiting time: {stats['avg_waiting_time_hr']} hours")
        print(f"  Maximum waiting time: {stats['max_waiting_time_hr']} hours")
        print(f"  Vessels with waiting: {stats['vessels_with_wait']}")
        print(f"  Vessels without waiting: {stats['vessels_no_wait']}")
    else:
        print("❌ Error:", res["error"])
