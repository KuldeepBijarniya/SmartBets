from flask import Flask
from flask_cors import CORS, cross_origin
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import pickle
import requests
import time
import schedule

tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-large")

model = None
with open('D:\\ML\\model', 'rb') as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)

titles = []
descriptions = []
current_index = 0

def update_generated_text():
    global titles, descriptions, current_index
    url = "https://newsapi.org/v2/everything?q=cricket&sortBy=popularity&apiKey=88e2602494454b99a0b215579da9d925"

    response = requests.get(url)

    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()

        # Extract titles and descriptions
        titles = [article['title'] for article in data['articles']]
        descriptions = [article['description'] for article in data['articles']]
        current_index = 0  # Reset to the first element in the lists


@app.route('/')
def generate_and_print():
    template =  """
    You will be provided with a title and description of the topic, and based on the topic, generate a good question that is future-oriented and can be answered with a yes or no.

    For example:

    Title: Virat Kohli is trending on Twitter
    Description: A famous cricketer Virat Kohli is trending on Twitter due to an injury
    Generated Question: Will Virat Kohli play in the next game?

    Title: Rahul Dravid: The man behind India’s dream run in 2023 World Cup cricket
    Description: Ther term of Rahul Dravid as the head coach of indian cricket team comes to an end
    Generated Question: Will he be given an extension as a head coach of indian cricket team?

    Title: Microsoft CEO Nadella Says OpenAI Governance Needs To Change
    Description: In an interview with CNBC's Jon Fortt today, Microsoft CEO Satya Nadella said that the governance structure of OpenAI needs to change after the AI company's sudden firing of CEO Sam Altman. "At this point, I think it's very clear that something has to change …
    Generated Question: Will OpenAI undergo significant changes in its governance structure following the departure of CEO Sam Altman, as suggested by Microsoft CEO Satya Nadella?

    Title: Early Black Friday phone deals 2023 — Samsung, Motorola, OnePlus, Google, and more
    Description: If you missed Prime Day, fear not: plenty of early Black Friday phone deals are available at this very moment.
    Generated Question: Will there be even better discounts on Samsung, Motorola, OnePlus, Google, and other smartphones during the actual Black Friday sale in 2023?

    Title: India vs Australia: A billion heartbreaks as India lose the ICC 2023 World Cup final
    Description: Cricket fans have taken to social media to express grief after Australia lifted the Cup on Sunday.
    Generated Question: Will India bounce back and win the ICC 2027 World Cup after the heartbreak in the 2023 final against Australia?

    """
    global current_index, titles, descriptions
    if current_index < len(titles):
        input_prompt = template + "Title: " + titles[current_index] + "\nDescription: " + descriptions[current_index] + "\nGenerated Question: "

        inputs = tokenizer.encode(input_prompt, return_tensors="pt")
        outputs = model.generate(inputs, max_length=1024, do_sample=True, temperature=0.7)

        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Title: {titles[current_index]}\nDescription: {descriptions[current_index]}\nGenerated Question: {generated_text}\n")

        current_index += 1  # Move to the next element in the lists


@app.route('/get_generated_text', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_generated_text():
    global current_index, titles, descriptions
    if current_index < len(titles):
        input_prompt = "Title: " + titles[current_index] + "\nDescription: " + descriptions[current_index] + "\n"
        inputs = tokenizer.encode(input_prompt, return_tensors="pt")
        outputs = model.generate(inputs, max_length=1024, do_sample=True, temperature=0.7)
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated_text
    else:
        return 'No more data'

# Initially update the data
update_generated_text()

if __name__ == '__main__':
    CORS(app, support_credentials=True)
    app.run(host='0.0.0.0', port=8080)

    # Schedule the function to run every 24 hours
    schedule.every(24).hours.do(generate_and_print)
