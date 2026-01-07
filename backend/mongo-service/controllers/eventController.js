import Event from "../models/EventLog.js";

export const addEvent = async (req, res) => {
  try {
    const doc = await Event.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { vessel_id } = req.params;

    if (!vessel_id) {
      return res.status(400).json({ message: "vessel_id required" });
    }

    const data = await Event.find({ vessel_id })
      .sort({ timestamp: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { resolved, severity, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      event_id,
      {
        ...(resolved !== undefined && { resolved }),
        ...(severity && { severity }),
        ...(description && { description })
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
