import os
import time
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")


def ask_aran(question: str) -> str:

    if not GEMINI_API_KEY:
        return (
            "ARAN AI Demo Mode: Gemini API key is not configured. "
            "Please add GEMINI_API_KEY to the .env file."
        )

    try:
        from google import genai

        client = genai.Client(api_key=GEMINI_API_KEY)

        system_instruction = """
You are ARAN AI, a coastal disaster intelligence assistant.

Your focus:
- Cyclones
- Heavy rainfall
- Floods
- Storm surge
- Coastal weather
- Evacuation information
- Infrastructure exposure
- Emergency preparedness

Rules:
1. Give clear and simple explanations.
2. Do not invent official warnings.
3. Do not invent evacuation orders.
4. Do not invent government instructions.
5. If the user asks about an official warning, tell them to verify with
   IMD, NDMA, state disaster management authorities or district authorities.
6. Explain technical disaster terms in simple language.
7. Keep answers concise and useful.
"""

        models_to_try = [
            GEMINI_MODEL,
            "gemini-3.6-flash",
            "gemini-3.5-flash"
        ]

        last_error = None

        for model in models_to_try:

            try:
                print(f"\nARAN AI using model: {model}")

                response = client.models.generate_content(
                    model=model,
                    contents=question,
                    config={
                        "system_instruction": system_instruction
                    }
                )

                if response and response.text:
                    print(f"SUCCESS: {model}")
                    return response.text

            except Exception as e:
                last_error = e
                print(f"MODEL FAILED: {model}")
                print(str(e))
                time.sleep(1)

        print("\n========== GEMINI ERROR ==========")
        print(str(last_error))
        print("==================================\n")

        return (
            "ARAN AI is temporarily unable to reach the Gemini service. "
            "Please try again in a moment."
        )

    except Exception as e:

        print("\n========== GEMINI ERROR ==========")
        print(str(e))
        print("==================================\n")

        return (
            "ARAN AI could not connect to Gemini. "
            "Please try again."
        )