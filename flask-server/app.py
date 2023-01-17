from flask import Flask, request
from config import OPENAI_API_KEY
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = OPENAI_API_KEY


# =============================================
@app.route('/')
def index(): 
    return 'hello world'


@app.route('/generateimage', methods=['POST'])
def generate_image():

    prompt = request.json['prompt']
    size = request.json['size']

    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size=size
        )

        image_url = response['data'][0]['url']

        return {
            "success": True,
            "image_url": image_url
        }

    except openai.error.OpenAIError as e:
        print(e.http_status)
        print(e.error)

        return {
            "success": False,
            "error_message": "The image could not be generated."
        }


# =============================================
# if __name__ == '__main__':
#     app.run()


