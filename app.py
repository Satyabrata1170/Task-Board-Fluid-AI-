from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import uuid
from datetime import date

app = Flask(__name__, static_folder="static", static_url_path="/static")
CORS(app)

tasks = []
last_completed_date = None
streak = 0

@app.route("/")
def serve_index():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify({
        "tasks": tasks,
        "streak": streak
    })

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    task = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "completed": False
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route("/tasks/<task_id>", methods=["PUT"])
def toggle_task(task_id):
    global last_completed_date, streak
    today = date.today()

    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]

            if task["completed"]:
                if last_completed_date != today:
                    streak += 1
                    last_completed_date = today
            return jsonify(task)

    return {"error": "Task not found"}, 404

@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"message": "Deleted"}
    
if __name__ == "__main__":
    app.run(debug=True)
