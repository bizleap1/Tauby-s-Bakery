
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eWp1ZmJ1Y2ptenFweWtxcmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTQ2NDEsImV4cCI6MjA5Mzc5MDY0MX0.N4GybLffHD61RiyqRuCX4x9zNjKxmlgBRnPpFmgadTI';
const payload = jwt.split('.')[1];    
const decoded = Buffer.from(payload, 'base64').toString();
console.log(decoded);
