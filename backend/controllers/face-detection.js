 
 const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
 require('dotenv').config();
 const stub = ClarifaiStub.grpc();
 const metadata = new grpc.Metadata();
 metadata.set("authorization", `Key ${process.env.CLARIFAI_API_KEY}`);
 
 const handleFaceDetection = (req, res) => {
    const { imageUrl } = req.body;
  
    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: process.env.CLARIFAI_USER_ID,
          app_id: process.env.CLARIFAI_APP_ID,
        },
        model_id: "face-detection",
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
              },
            },
          },
        ],
      },
      metadata,
      (err, response) => {
        if (err) {
          console.error("Eroare API Clarifai:", err);
          return res.status(500).json({ error: "Eroare la detecția feței" });
        }
  
        if (response.status.code !== 10000) {
          console.error("Eroare API Clarifai:", response.status.description);
          return res.status(500).json({ error: response.status.description });
        }
  
        res.json(response);
      }
    );
  };
  module.exports ={ handleFaceDetection};