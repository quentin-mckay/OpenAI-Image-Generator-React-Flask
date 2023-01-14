from flask import Flask, request
import openai
import random

app = Flask(__name__)

OPENAI_API_KEY = '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'

openai.api_key = OPENAI_API_KEY


@app.route('/')
def index(): 
    return 'hello'



# return static json
@app.route('/test')
def test():
    return {'apples': 1, 'bananas': 2, 'cherries': 3}



# return different json each time
@app.route('/randomword')
def randomword():
    word = random.choice(['apples', 'bananas', 'cherries'])
    return {'word': word}



@app.route('/posttest', methods=['POST'])
def posttest():
    prompt = request.json['prompt']
    size = request.json['size']
    print(prompt, size)
    return 'got posttest'





@app.route('/generateimage', methods=['POST'])
def generate_image():

    print(request.json)

    try:
        response = openai.Image.create(
            prompt='snowflake wearing a hat',
            n=1,
            size='512x512'
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

    


if __name__ == '__main__':
    app.run(debug=True)

