const express = require("express");
const app = express();
// Middleware to parse JSON data
app.use(express.json());
// Sample Patient Records
let patients = [
    {
        id: 1,
        name: "Amit Kumar",
        age: 35,
        disease: "Fever",
        doctorName: "Dr. Sharma"
    },
    {
        id: 2,
        name: "Rahul Kumar",
        age: 25,
        disease: "Cold",
        doctorName: "Dr. Verma"
    },
    {
        id: 3,
        name: "Priya Singh",
        age: 30,
        disease: "Cough",
        doctorName: "Dr. Gupta"
    }
];
// 1. GET - Retrieve All Patients
app.get("/patients", (req, res) => {
 res.status(200).json({
        message: "All patient records",
        patients: patients
    });

});
// 2. GET - Retrieve Patient by ID
app.get("/patients/:id", (req, res) => {

    const id = Number(req.params.id);

    const patient = patients.find((p) => p.id === id);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }
   res.status(200).json(patient);

});
// 3. POST - Add New Patient
app.post("/patients", (req, res) => {

    const newPatient = req.body;

    if (
        newPatient.id == null ||
        !newPatient.name ||
        newPatient.age == null ||
        !newPatient.disease ||
        !newPatient.doctorName
    ) {
        return res.status(400).json({
            message: "All patient details are required"
        });
    }

    const existingPatient = patients.find(
        (p) => p.id === Number(newPatient.id)
    );

    if (existingPatient) {
        return res.status(400).json({
            message: "Patient ID already exists"
        });
    }

    patients.push(newPatient);

    res.status(201).json({
        message: "Patient added successfully",
        patient: newPatient
    });

});
// 4. PUT - Update Patient Details
app.put("/patients/:id", (req, res) => {
const id = Number(req.params.id);

    const patient = patients.find((p) => p.id === id);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }
const { name, age, disease, doctorName } = req.body;
    if (name !== undefined) patient.name = name;
    if (age !== undefined) patient.age = age;
    if (disease !== undefined) patient.disease = disease;
    if (doctorName !== undefined) patient.doctorName = doctorName;
   res.status(200).json({
        message: "Patient updated successfully",
        patient: patient
    });
});
// 5. DELETE - Delete Patient
app.delete("/patients/:id", (req, res) => {
const id = Number(req.params.id);
const index = patients.findIndex((p) => p.id === id);
if (index === -1) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }
const deletedPatient = patients.splice(index, 1);
res.status(200).json({
        message: "Patient deleted successfully",
        patient: deletedPatient[0]
    });
});
// Handle Invalid Routes
app.use((req, res) => {
res.status(404).json({
        message: "Route not found"
    });
});
// Start Express Server
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});
