import axios from 'axios';

const API_URL = 'https://api.telerivet.com/v1/projects/PJceb2fffe695c67ae/messages/send';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

export const sendMessage = async (phoneNumber, message) => {
    try {
        const response = await axios.post(`${API_URL}/projects/YOUR_PROJECT_ID/messages`, {
            to_number: phoneNumber,
            content: message,
        }, {
            headers: {
                'X-Telerivet-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
