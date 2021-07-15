import axios from 'axios';
const url = `${process.env.SERVER_URL}items`;

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
                const response = await axios.post(url, req.body);
                res.status(201).json(response.data);
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