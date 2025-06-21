import asyncio
import aiohttp
from google.cloud import translate_v2 as translate
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\ellaa\\Downloads\\triple-zenith-451009-f5-b0018fcfe89d.json"
# Try different import patterns for vapi_python
try:
    from vapi_python import Client as Vapi
    print("Using vapi_python.Client")
except ImportError:
    try:
        from vapi_python.client import Client as Vapi
        print("Using vapi_python.client.Client")
    except ImportError:
        try:
            import vapi_python
            Vapi = vapi_python.Client
            print("Using vapi_python.Client via module")
        except (ImportError, AttributeError):
            try:
                # Alternative: use requests for direct API calls
                import requests
                print("Falling back to direct API calls")
                Vapi = None
            except ImportError:
                raise ImportError("Cannot import vapi_python or requests. Please install with: pip install vapi-python requests")

# Initialize clients
if Vapi:
    vapi = Vapi(api_key="785f6075-e502-4d78-95ba-dbc4ed170d7b")
else:
    vapi = None
translator = translate.Client()

def translate_text(text: str, target_lang: str = "en", source_lang: str = None) -> dict:
    """Translate text using Google Cloud Translate with language detection"""
    try:
        # Detect language if not provided
        if not source_lang:
            detection = translator.detect_language(text)
            source_lang = detection['language']
            confidence = detection['confidence']
        else:
            confidence = 1.0
        
        # Don't translate if already in target language
        if source_lang == target_lang:
            return {
                "translatedText": text,
                "detectedSourceLanguage": source_lang,
                "confidence": confidence,
                "original": text
            }
        
        # Perform translation
        result = translator.translate(text, target_language=target_lang, source_language=source_lang)
        
        return {
            "translatedText": result["translatedText"],
            "detectedSourceLanguage": result.get("detectedSourceLanguage", source_lang),
            "confidence": confidence,
            "original": text
        }
        
    except Exception as e:
        print(f"Translation error: {e}")
        return {
            "translatedText": text,  # Return original text if translation fails
            "detectedSourceLanguage": "unknown",
            "confidence": 0.0,
            "original": text,
            "error": str(e)
        }

async def handle_call_with_vapi():
    """Handle incoming call with real-time translation using Vapi SDK"""
    
    if not vapi:
        print("Vapi client not available. Using fallback method.")
        await handle_call_direct_api()
        return
    
    # Assistant configuration
    assistant = {
        "firstMessage": "Hola, dime algo en español y te traduzco al inglés.",
        "model": {
            "provider": "google",
            "model": "gemini-2.0-flash-exp",  # Latest available Gemini model
            "temperature": 0.3,
            "maxTokens": 1000,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a professional multilingual translation assistant. When users speak in any language, translate their message to English and provide both the original text and the English translation. Be accurate and maintain the tone and context of the original message."
                }
            ],
            "functions": [
                {
                    "name": "translate_text",
                    "description": "Translate text from any language to English using Google Translate API",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "text": {
                                "type": "string",
                                "description": "The text to translate"
                            },
                            "source_language": {
                                "type": "string",
                                "description": "Detected source language code"
                            },
                            "target_language": {
                                "type": "string",
                                "description": "Target language code (default: en)",
                                "default": "en"
                            }
                        },
                        "required": ["text"]
                    }
                }
            ]
        },
        "voice": {
            "provider": "11labs",
            "voiceId": "21m00Tcm4TlvDq8ikWAM"  # Default voice
        },
        "transcriber": {
            "provider": "deepgram",
            "model": "nova-3-multi",
            "language": "multi",  # Multi-language support
            "smartFormat": True,
          
          
            "numerals": True,
            "keywords": [],
           
        },
        "recordingEnabled": True
    }

    try:
        # Different approaches based on available methods
        if hasattr(vapi, 'calls') and hasattr(vapi.calls, 'create'):
            # Server SDK approach
            call_response = vapi.calls.create(
                assistant=assistant,
                phone_number_id=None,
                customer={"number": "+1234567890"}
            )
            call_id = call_response.id
        elif hasattr(vapi, 'start'):
            # Client SDK approach (original code pattern)
            call = vapi.start(assistant=assistant)
            print("Call started with client SDK")
            
            # Handle messages if available
            if hasattr(call, 'messages'):
                async for msg in call.messages():
                    await process_message(msg)
            return
        else:
            print("Unknown Vapi SDK version. Check documentation.")
            return
        
        print(f"Call started with ID: {call_id}")
        
        # Polling approach for call status
        while True:
            try:
                call_status = vapi.calls.get(call_id)
                if call_status.status == "ended":
                    print("Call ended")
                    break
                await asyncio.sleep(1)
            except Exception as e:
                print(f"Error checking call status: {e}")
                break
                
    except Exception as e:
        print(f"Error creating call: {e}")

async def handle_call_direct_api():
    """Fallback method using direct API calls"""
    import requests
    
    api_key = "785f6075-e502-4d78-95ba-dbc4ed170d7b"
    base_url = "https://api.vapi.ai"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    print("Choose an option:")
    print("1. Create assistant only (recommended for testing)")
    print("2. Make outbound call (requires phone numbers)")
    print("3. Test webhook handler")
    
    choice = input("Enter choice (1-3): ").strip()
    
    if choice == "1":
        await create_assistant_direct_api(headers, base_url)
    elif choice == "2":
        await make_outbound_call_direct_api(headers, base_url)
    elif choice == "3":
        await test_webhook_handler()
    else:
        print("Invalid choice. Creating assistant by default...")
        await create_assistant_direct_api(headers, base_url)

async def create_assistant_direct_api(headers, base_url):
    """Create an assistant using direct API calls"""
    import requests
    
    assistant_config = {
        "name": "Multilingual Translator Pro",
        "firstMessage": "Hello! I'm your multilingual translator. Speak in any language and I'll translate it to English for you.",
        "model": {
            "provider": "google",
            "model": "gemini-2.0-flash-exp",
            "temperature": 0.2,
            "maxTokens": 2000,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a professional multilingual translation assistant. When users speak in any language, detect the language and translate it to English. Always provide both the original text and the English translation."
                }
            ],
            "functions": [
                {
                    "name": "translate_text",
                    "description": "Translate text from any language to English",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "text": {"type": "string", "description": "Text to translate"},
                            "source_language": {"type": "string", "description": "Source language code"},
                            "target_language": {"type": "string", "description": "Target language", "default": "en"}
                        },
                        "required": ["text"]
                    }
                }
            ]
        },
        "voice": {
            "provider": "playht",
            "voiceId": "jennifer",
            "speed": 1.0
        },
        "transcriber": {
            "provider": "deepgram",
            "model": "nova-3-multi",
            "language": "multi",
            "smartFormat": True,
          
         
          
        },
        "recordingEnabled": True,
        "maxDurationSeconds": 1800,
        "silenceTimeoutSeconds": 30
    }
    
    try:
        response = requests.post(
            f"{base_url}/assistant",
            json=assistant_config,
            headers=headers
        )
        
        if response.status_code == 201:
            assistant_data = response.json()
            assistant_id = assistant_data.get("id", "unknown")
            print(f"✅ Assistant created successfully!")
            print(f"   Assistant ID: {assistant_id}")
            print(f"   Name: {assistant_data.get('name', 'N/A')}")
            print(f"   Model: {assistant_data.get('model', {}).get('model', 'N/A')}")
            print(f"   Transcriber: {assistant_data.get('transcriber', {}).get('model', 'N/A')}")
            print("\n📋 Next steps:")
            print("1. Copy the Assistant ID above")
            print("2. Use it in your Vapi dashboard to make calls")
            print("3. Set up webhooks to handle real-time translation")
            return assistant_id
        else:
            print(f"❌ Failed to create assistant: {response.status_code}")
            print(f"   Error: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error creating assistant: {e}")
        return None

async def make_outbound_call_direct_api(headers, base_url):
    """Make an outbound call using direct API (requires phone numbers)"""
    import requests
    
    # Get phone numbers from user
    print("\n📞 For outbound calls, you need:")
    print("1. A Vapi phone number (from your dashboard)")
    print("2. Customer phone number to call")
    
    phone_number_id = input("Enter your Vapi phone number ID (or press Enter to skip): ").strip()
    customer_number = input("Enter customer phone number (+1234567890 format, or press Enter to skip): ").strip()
    
    if not phone_number_id or not customer_number:
        print("⚠️  Skipping outbound call - missing phone number information")
        print("   To make calls, you need to:")
        print("   1. Purchase a phone number in your Vapi dashboard")
        print("   2. Get the phone number ID from the dashboard")
        return
    
    # First create or use existing assistant
    print("Creating assistant for the call...")
    assistant_id = await create_assistant_direct_api(headers, base_url)
    
    if not assistant_id:
        print("❌ Cannot make call without assistant")
        return
    
    call_config = {
        "assistantId": assistant_id,
        "phoneNumberId": phone_number_id,
        "customer": {
            "number": customer_number
        }
    }
    
    try:
        response = requests.post(
            f"{base_url}/call",
            json=call_config,
            headers=headers
        )
        
        if response.status_code in [200, 201]:
            call_data = response.json()
            call_id = call_data.get("id", "unknown")
            print(f"✅ Call initiated successfully!")
            print(f"   Call ID: {call_id}")
            print(f"   Status: {call_data.get('status', 'unknown')}")
            print(f"   Customer: {customer_number}")
            
            # Monitor call status
            await monitor_call_status(call_id, headers, base_url)
            
        else:
            print(f"❌ Failed to initiate call: {response.status_code}")
            print(f"   Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Error making call: {e}")

async def monitor_call_status(call_id, headers, base_url):
    """Monitor call status and provide updates"""
    import requests
    import time
    
    print(f"\n📊 Monitoring call {call_id}...")
    print("   Press Ctrl+C to stop monitoring")
    
    try:
        while True:
            response = requests.get(f"{base_url}/call/{call_id}", headers=headers)
            
            if response.status_code == 200:
                call_data = response.json()
                status = call_data.get("status", "unknown")
                duration = call_data.get("duration", 0)
                
                print(f"   Status: {status} | Duration: {duration}s", end="\r")
                
                if status in ["ended", "failed", "canceled"]:
                    print(f"\n📞 Call ended with status: {status}")
                    
                    # Show call summary if available
                    if "summary" in call_data:
                        print(f"   Summary: {call_data['summary']}")
                    break
                    
            await asyncio.sleep(2)
            
    except KeyboardInterrupt:
        print(f"\n⏹️  Stopped monitoring call {call_id}")
    except Exception as e:
        print(f"\n❌ Error monitoring call: {e}")

async def test_webhook_handler():
    """Test the webhook handler with sample data"""
    print("\n🧪 Testing webhook handler...")
    
    # Sample transcript event
    sample_transcript = {
        "type": "transcript",
        "transcript": {
            "text": "Hola, ¿cómo estás?",
            "language": "es",
            "confidence": 0.95
        }
    }
    
    print("Testing Spanish transcript...")
    result = await webhook_handler(sample_transcript)
    print(f"Result: {result}")
    
    # Sample function call event
    sample_function_call = {
        "type": "function-call",
        "functionCall": {
            "name": "translate_text",
            "parameters": {
                "text": "Bonjour le monde",
                "source_language": "fr"
            }
        }
    }
    
    print("\nTesting French function call...")
    result = await webhook_handler(sample_function_call)
    print(f"Result: {result}")
    
    print("\n✅ Webhook handler test completed!")

async def process_message(msg):
    """Process incoming messages from Vapi with multi-language support"""
    if msg.get("type") == "transcript":
        # Get transcript data
        transcript_data = msg.get("transcript", {})
        original = transcript_data.get("text", "")
        detected_lang = transcript_data.get("language", "unknown")
        confidence = transcript_data.get("confidence", 0.0)
        
        if original.strip():
            print(f"🔊 Detected Language: {detected_lang.upper()} (confidence: {confidence:.2f})")
            print(f"📝 Original: {original}")
            
            # Translate if not already in English
            if detected_lang != "en":
                translation_result = translate_text(original, "en", detected_lang)
                translated = translation_result["translatedText"]
                
                print(f"🌐 EN Translation: {translated}")
                
                # Return function call result for Vapi
                return {
                    "type": "function-call-result",
                    "result": {
                        "original": original,
                        "translation": translated,
                        "source_language": detected_lang,
                        "confidence": confidence
                    }
                }
            else:
                print("✅ Already in English, no translation needed")
                
    elif msg.get("type") == "function-call":
        # Handle function calls from Gemini
        function_call = msg.get("functionCall", {})
        function_name = function_call.get("name")
        
        if function_name == "translate_text":
            parameters = function_call.get("parameters", {})
            text_to_translate = parameters.get("text", "")
            source_lang = parameters.get("source_language")
            target_lang = parameters.get("target_language", "en")
            
            translation_result = translate_text(text_to_translate, target_lang, source_lang)
            
            return {
                "type": "function-call-result",
                "result": translation_result
            }
            
    elif msg.get("type") == "end":
        print("📞 Call ended")
        return False
        
    return True

async def webhook_handler(request_data: dict):
    """Handle webhook events from Vapi"""
    
    message_type = request_data.get("type")
    
    if message_type == "transcript":
        # Extract transcript data
        transcript = request_data.get("transcript", {})
        text = transcript.get("text", "")
        language = transcript.get("language", "es")
        
        if text.strip():
            print(f"🔊 {language.upper()}: {text}")
            
            # Translate if not already in English
            if language != "en":
                translated = translate_text(text, "en")
                print(f"🌐 EN: {translated}")
                
                # In a webhook scenario, you would send the translation
                # back to Vapi to be spoken by the assistant
                return {
                    "type": "function-call",
                    "functionCall": {
                        "name": "respond_with_translation",
                        "parameters": {
                            "translation": translated,
                            "original": text
                        }
                    }
                }
    
    elif message_type == "function-call":
        # Handle function calls if needed
        function_name = request_data.get("functionCall", {}).get("name")
        
        if function_name == "translate_text":
            parameters = request_data.get("functionCall", {}).get("parameters", {})
            text_to_translate = parameters.get("text", "")
            source_lang = parameters.get("source_language")
            target_lang = parameters.get("target_language", "en")
            
            translation_result = translate_text(text_to_translate, target_lang, source_lang)
            
            return {
                "result": translation_result
            }
    
    elif message_type == "end-of-call-report":
        print("Call ended - processing final report")
        # Handle end of call cleanup
        pass
    
    return {"status": "ok"}

# Alternative approach using function calling
async def create_translation_assistant():
    """Create an assistant with multi-language translation capabilities using Gemini 2.0"""
    
    assistant_config = {
        "name": "Multilingual Translator Pro",
        "firstMessage": "Hello! I'm your multilingual translator powered by Gemini 2.0. Speak in any language and I'll translate it to English for you. I can detect over 100 languages automatically!",
        "model": {
            "provider": "google",
            "model": "gemini-2.0-flash-exp",  # Latest Gemini model
            "temperature": 0.2,  # Lower temperature for more consistent translations
            "maxTokens": 2000,
            "messages": [
                {
                    "role": "system", 
                    "content": """You are a professional multilingual translation assistant powered by Google Gemini 2.0. 

Your capabilities:
- Detect language automatically from speech
- Translate from any language to English
- Maintain context, tone, and cultural nuances
- Handle multiple speakers and conversations
- Provide accurate, professional translations

When you receive text, always:
1. Acknowledge the detected language
2. Provide the English translation
3. Explain any cultural context if relevant
4. Ask if they need translation to any other language

Be friendly, professional, and accurate."""
                }
            ],
            "functions": [
                {
                    "name": "translate_text",
                    "description": "Translate text from any detected language to English using advanced Google Translate API",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "text": {
                                "type": "string",
                                "description": "The text to translate"
                            },
                            "source_language": {
                                "type": "string",
                                "description": "Auto-detected source language code (e.g., 'es', 'fr', 'de')"
                            },
                            "target_language": {
                                "type": "string",
                                "description": "Target language code",
                                "default": "en"
                            },
                            "preserve_formatting": {
                                "type": "boolean",
                                "description": "Whether to preserve original formatting",
                                "default": true
                            }
                        },
                        "required": ["text"]
                    }
                },
                {
                    "name": "detect_language",
                    "description": "Detect the language of the input text",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "text": {
                                "type": "string",
                                "description": "Text to analyze for language detection"
                            }
                        },
                        "required": ["text"]
                    }
                }
            ]
        },
        "voice": {
            "provider": "playht",
            "voiceId": "jennifer",  # Clear, professional voice
            "speed": 1.0,
            "stability": 0.8,
            "similarityBoost": 0.8
        },
        "transcriber": {
            "provider": "deepgram",
            "model": "nova-3-multi",  # Latest multi-language model
            "language": "multi",     # Auto-detect multiple languages
            "smartFormat": true,     # Better formatting
          
          
            "numerals": true,        # Convert numbers to text
            "profanityFilter": false,
            "redact": [],
          
            "keywords": ["translate", "translation", "language", "convert"],
            "tier": "enhanced"       # Higher accuracy tier
        },
        "recordingEnabled": true,
        "endCallOnDisconnect": true,
        "maxDurationSeconds": 1800,  # 30 minutes max
        "silenceTimeoutSeconds": 30,
        "responseDelaySeconds": 0.5,
        "llmRequestDelaySeconds": 0.2
    }
    
    try:
        assistant = vapi.assistants.create(**assistant_config)
        print(f"Assistant created with ID: {assistant.id}")
        return assistant
    except Exception as e:
        print(f"Error creating assistant: {e}")
        return None

if __name__ == "__main__":
    print("🌟 MULTILINGUAL TRANSLATION SERVICE")
    print("=" * 50)
    print(f"Vapi SDK available: {vapi is not None}")
    
    if vapi is not None:
        print("✅ Using Vapi SDK")
        # Choose your approach with SDK
        print("\nChoose operation:")
        print("1. Create assistant")
        print("2. Handle calls")
        
        choice = input("Enter choice (1-2): ").strip()
        if choice == "1":
            asyncio.run(create_translation_assistant())
        else:
            asyncio.run(handle_call_with_vapi())
    else:
        print("⚠️  Using direct API calls (SDK not available)")
        asyncio.run(handle_call_direct_api())
    
    print("\n🎉 Translation service ready!")