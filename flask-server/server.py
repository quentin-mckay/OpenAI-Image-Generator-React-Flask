from flask import Flask
import openai

app = Flask(__name__)

OPENAI_API_KEY = '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'

openai.api_key = OPENAI_API_KEY

@app.route('/')
def index(): 
    return 'hello'


@app.route('/generateimage')
def generate_image():
    try:
        response = openai.Image.create(
            prompt='snowflake hat, realistic',
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

