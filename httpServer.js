const http = require("http");
const fs = require("fs");
// Patient Records
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
// Create HTTP Server
const server = http.createServer((req, res) => {
// Route 1: Welcome Page
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end("<h1>Welcome to Hospital Patient Management System</h1>");
    }
// Route 2: Get All Patients
    else if (req.url === "/patients" && req.method === "GET") {
     res.writeHead(200, {
            "Content-Type": "application/json"
        });
      res.end(JSON.stringify(patients));
    }
  // Route 3: Hospital Information
    else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, {
            "Content-Type": "text/html"
        });
     res.end("<h1>About Our Hospital</h1><p>We provide quality healthcare services.</p>");
    }
    // Route 4: Add New Patient
    else if (req.url === "/add-patient" && req.method === "POST") {
    let body = "";
    // Receive Request Data
        req.on("data", (chunk) => {
            body += chunk;
        });
    // Process Request Data
        req.on("end", () => {
           try {
                const newPatient = JSON.parse(body);
             if (
                    newPatient.id == null ||
                    !newPatient.name ||
                    newPatient.age == null ||
                    !newPatient.disease ||
                    !newPatient.doctorName
                ) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    return res.end(JSON.stringify({
                        message: "All patient details are required"
                    }));
                }

                patients.push(newPatient);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Patient added successfully",
                    patient: newPatient
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON data"
                }));
            }
        });
    }

    // Route 5: Serve Static HTML File using FS Module
    else if (req.url === "/home" && req.method === "GET") {

        fs.readFile("index.html", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                return res.end("Unable to read HTML file");
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // Handle Invalid Routes
    else {

        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end("<h1>404 - Page Not Found</h1>");
    }

});
// Start HTTP Server
server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
