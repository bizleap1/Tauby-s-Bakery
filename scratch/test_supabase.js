 
// Using built-in fetch


async function testSupabase() {
    const url = 'https://pxyjufbucjmzqpykqref.supabase.co/rest/v1/products?select=*&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eWp1ZmJ1Y2ptenFweWtxcmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTQ2NDEsImV4cCI6MjA5Mzc5MDY0MX0.N4GybLffHD61RiyqRuCX4x9zNjKxmlgBRnPpFmgadTI';


    try {
        const response = await fetch(url);
        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error fetching from Supabase:', error.message);
    }
}

testSupabase();
