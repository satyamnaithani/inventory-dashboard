import axios from 'axios';
import { saveAs } from "file-saver";
const url = `${process.env.SERVER_URL}invoice`;

const handler = async(req, res) => {
    switch(req.method) {
        case 'GET' :
            try {
                const response = await axios.get(url);
                res.status(200).json(response.data);
            } catch(error) {
                res.status(error.response.status).json(error);
            }
            break;
        case 'POST' :
            try {
                console.log(req.body);
                const response = await axios.post(`${url}/create-pdf`, JSON.parse(req.body));
                const result = await axios.get(`${url}/fetch-pdf`, { responseType: "blob" });
                res.sendFile(result);
            } catch(error) {
                console.log(error)
                res.status(error.response.status).json(error);
            }
            break;
        default:
            res.status(404).json({message: 'Invalid request method.'})
    }
}

export default handler;