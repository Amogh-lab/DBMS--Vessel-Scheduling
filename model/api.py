from flask import Flask, jsonify, send_file, request
import os
import generate_actual_eta as gae
import generate_unloading_timedata as gut
import weather_data as wdata
import port_data as pdata
import vessel_movement as vmove
import train_eta_model as teta
import berth_scheduler as bs

app = Flask(__name__)

def exists(path):
    return os.path.exists(path)

@app.get("/")
def home():
    return jsonify({
        "message": "Intelligent Vessel Scheduling API",
        "endpoints": {
            "generation": [
                "/generate/eta",
                "/generate/unloading",
                "/generate/weather",
                "/generate/ports",
                "/generate/vessels"
            ],
            "training": ["/train/eta"],
            "scheduling": ["/schedule/berths"],
            "data_download": [
                "/data/eta",
                "/data/unloading",
                "/data/weather",
                "/data/ports",
                "/data/vessels",
                "/data/final_schedule"
            ]
        }
    })

@app.get("/generate/eta")
def route_generate_eta():
    try:
        res = gae.generate_actual_eta()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/unloading")
def route_generate_unloading():
    try:
        res = gut.generate_unloading_time()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/weather")
def route_generate_weather():
    try:
        res = wdata.generate_weather_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/ports")
def route_generate_ports():
    try:
        res = pdata.generate_port_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/generate/vessels")
def route_generate_vessels():
    try:
        res = vmove.generate_vessel_movement_data()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/train/eta")
def route_train_eta():
    try:
        res = teta.train_eta_model()
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/schedule/berths")
def route_schedule_berths():
    per_port = request.args.get("per_port", default=5, type=int)
    try:
        res = bs.run_berth_scheduler(berths_per_port=per_port)
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/data/eta")
def route_data_eta():
    path = "eta_dataset_final.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/unloading")
def route_data_unloading():
    path = "unloading_time_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/weather")
def route_data_weather():
    path = "weather_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/ports")
def route_data_ports():
    path = "port_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/vessels")
def route_data_vessels():
    path = "vessel_movement_data.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

@app.get("/data/final_schedule")
def route_data_final_schedule():
    path = "final_berth_schedule.csv"
    if not exists(path):
        return jsonify({"error": "file not found"}), 404
    return send_file(path, mimetype="text/csv")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)